import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import * as db from "./db";
import { notifyOwner } from "./_core/notification";
import { checkoutRouter } from "./stripe/checkout";

// Admin-only procedure
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== 'admin') {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
  }
  return next({ ctx });
});

export const appRouter = router({
  system: systemRouter,
  checkout: checkoutRouter,
  
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // ============ CATEGORIES ============
  categories: router({
    list: publicProcedure.query(async () => {
      return db.getAllCategories();
    }),
    
    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return db.getCategoryBySlug(input.slug);
      }),
    
    create: adminProcedure
      .input(z.object({
        name: z.string(),
        slug: z.string(),
        description: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        return db.createCategory(input);
      }),
  }),

  // ============ PRODUCTS ============
  products: router({
    list: publicProcedure
      .input(z.object({
        categoryId: z.number().optional(),
        featured: z.boolean().optional(),
        active: z.boolean().optional(),
      }).optional())
      .query(async ({ input }) => {
        return db.getAllProducts(input);
      }),
    
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const product = await db.getProductById(input.id);
        if (!product) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Product not found' });
        }
        return product;
      }),
    
    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        const product = await db.getProductBySlug(input.slug);
        if (!product) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Product not found' });
        }
        return product;
      }),
    
    create: adminProcedure
      .input(z.object({
        categoryId: z.number(),
        name: z.string(),
        slug: z.string(),
        description: z.string().optional(),
        price: z.number(),
        compareAtPrice: z.number().optional(),
        imageUrl: z.string().optional(),
        imageKey: z.string().optional(),
        sizes: z.string().optional(),
        colors: z.string().optional(),
        stock: z.number().default(0),
        featured: z.boolean().default(false),
        active: z.boolean().default(true),
      }))
      .mutation(async ({ input }) => {
        return db.createProduct(input);
      }),
    
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        categoryId: z.number().optional(),
        name: z.string().optional(),
        slug: z.string().optional(),
        description: z.string().optional(),
        price: z.number().optional(),
        compareAtPrice: z.number().optional(),
        imageUrl: z.string().optional(),
        imageKey: z.string().optional(),
        sizes: z.string().optional(),
        colors: z.string().optional(),
        stock: z.number().optional(),
        featured: z.boolean().optional(),
        active: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        return db.updateProduct(id, data);
      }),
    
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteProduct(input.id);
        return { success: true };
      }),
  }),

  // ============ CART ============
  cart: router({
    list: publicProcedure
      .input(z.object({ sessionId: z.string().optional() }))
      .query(async ({ ctx, input }) => {
        return db.getCartItems(ctx.user?.id, input.sessionId);
      }),
    
    add: publicProcedure
      .input(z.object({
        productId: z.number(),
        quantity: z.number().default(1),
        size: z.string().optional(),
        color: z.string().optional(),
        sessionId: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const { sessionId, ...itemData } = input;
        return db.addToCart({
          ...itemData,
          userId: ctx.user?.id,
          sessionId: ctx.user ? undefined : sessionId,
        });
      }),
    
    updateQuantity: publicProcedure
      .input(z.object({
        id: z.number(),
        quantity: z.number(),
      }))
      .mutation(async ({ input }) => {
        await db.updateCartItemQuantity(input.id, input.quantity);
        return { success: true };
      }),
    
    remove: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.removeFromCart(input.id);
        return { success: true };
      }),
    
    clear: publicProcedure
      .input(z.object({ sessionId: z.string().optional() }))
      .mutation(async ({ ctx, input }) => {
        await db.clearCart(ctx.user?.id, input.sessionId);
        return { success: true };
      }),
  }),

  // ============ ORDERS ============
  orders: router({
    create: publicProcedure
      .input(z.object({
        customerName: z.string(),
        customerEmail: z.string().email(),
        customerPhone: z.string().optional(),
        shippingAddress: z.string(),
        shippingCity: z.string(),
        shippingState: z.string(),
        shippingZipCode: z.string(),
        items: z.array(z.object({
          productId: z.number(),
          quantity: z.number(),
          size: z.string().optional(),
          color: z.string().optional(),
        })),
        sessionId: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const { items, sessionId, ...orderData } = input;
        
        // Calculate total
        let totalAmount = 0;
        const orderItemsData = [];
        
        for (const item of items) {
          const product = await db.getProductById(item.productId);
          if (!product) {
            throw new TRPCError({ code: 'NOT_FOUND', message: `Product ${item.productId} not found` });
          }
          
          const subtotal = product.price * item.quantity;
          totalAmount += subtotal;
          
          orderItemsData.push({
            productId: product.id,
            productName: product.name,
            productPrice: product.price,
            quantity: item.quantity,
            size: item.size,
            color: item.color,
            subtotal,
          });
        }
        
        // Create order
        const order = await db.createOrder({
          ...orderData,
          userId: ctx.user?.id,
          totalAmount,
        });
        
        // Create order items
        for (const itemData of orderItemsData) {
          await db.createOrderItem({
            orderId: order.id,
            ...itemData,
          });
        }
        
        // Clear cart
        await db.clearCart(ctx.user?.id, sessionId);
        
        // Notify owner
        await notifyOwner({
          title: `Novo Pedido #${order.id}`,
          content: `Cliente: ${order.customerName}\nEmail: ${order.customerEmail}\nTotal: R$ ${(order.totalAmount / 100).toFixed(2)}\n\nAcesse o painel administrativo para mais detalhes.`,
        });
        
        return order;
      }),
    
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const order = await db.getOrderById(input.id);
        if (!order) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Order not found' });
        }
        const items = await db.getOrderItems(input.id);
        return { ...order, items };
      }),
    
    list: adminProcedure.query(async () => {
      return db.getAllOrders();
    }),
    
    listMine: protectedProcedure.query(async ({ ctx }) => {
      return db.getUserOrders(ctx.user.id);
    }),
    
    updateStatus: adminProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["pending", "processing", "shipped", "delivered", "cancelled"]),
      }))
      .mutation(async ({ input }) => {
        await db.updateOrderStatus(input.id, input.status);
        return { success: true };
      }),
    
    updatePaymentStatus: adminProcedure
      .input(z.object({
        id: z.number(),
        paymentStatus: z.enum(["pending", "paid", "failed", "refunded"]),
        stripePaymentIntentId: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await db.updateOrderPaymentStatus(input.id, input.paymentStatus, input.stripePaymentIntentId);
        return { success: true };
      }),
  }),

  // ============ CONTACT ============
  contact: router({
    submit: publicProcedure
      .input(z.object({
        name: z.string(),
        email: z.string().email(),
        phone: z.string().optional(),
        subject: z.string().optional(),
        message: z.string(),
      }))
      .mutation(async ({ input }) => {
        const submission = await db.createContactSubmission(input);
        
        // Notify owner
        await notifyOwner({
          title: `Nova Mensagem de Contato`,
          content: `Nome: ${input.name}\nEmail: ${input.email}\nAssunto: ${input.subject || 'N/A'}\n\nMensagem:\n${input.message}`,
        });
        
        return submission;
      }),
    
    list: adminProcedure.query(async () => {
      return db.getAllContactSubmissions();
    }),
    
    updateStatus: adminProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["new", "read", "replied"]),
      }))
      .mutation(async ({ input }) => {
        await db.updateContactSubmissionStatus(input.id, input.status);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
