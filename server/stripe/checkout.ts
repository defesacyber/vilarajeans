import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { getStripe } from "../_core/stripe";
import { SHIPPING_FEE, STRIPE_CURRENCY } from "./products";
import * as db from "../db";
import { TRPCError } from "@trpc/server";

export const checkoutRouter = router({
  createSession: publicProcedure
    .input(z.object({
      items: z.array(z.object({
        productId: z.number(),
        quantity: z.number(),
        size: z.string().optional(),
        color: z.string().optional(),
      })),
      customerName: z.string(),
      customerEmail: z.string().email(),
      customerPhone: z.string().optional(),
      shippingAddress: z.string(),
      shippingCity: z.string(),
      shippingState: z.string(),
      shippingZipCode: z.string(),
      sessionId: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const stripe = getStripe();
      const { items, sessionId, ...customerData } = input;
      
      // Validate products and calculate total
      const lineItems = [];
      let totalAmount = 0;
      
      for (const item of items) {
        const product = await db.getProductById(item.productId);
        if (!product) {
          throw new TRPCError({ 
            code: 'NOT_FOUND', 
            message: `Produto ${item.productId} não encontrado` 
          });
        }
        
        if (!product.active) {
          throw new TRPCError({ 
            code: 'BAD_REQUEST', 
            message: `Produto ${product.name} não está disponível` 
          });
        }
        
        if (product.stock < item.quantity) {
          throw new TRPCError({ 
            code: 'BAD_REQUEST', 
            message: `Estoque insuficiente para ${product.name}` 
          });
        }
        
        const itemTotal = product.price * item.quantity;
        totalAmount += itemTotal;
        
        lineItems.push({
          price_data: {
            currency: STRIPE_CURRENCY,
            product_data: {
              name: product.name,
              description: `Tamanho: ${item.size || 'N/A'}, Cor: ${item.color || 'N/A'}`,
              images: product.imageUrl ? [product.imageUrl] : undefined,
            },
            unit_amount: product.price,
          },
          quantity: item.quantity,
        });
      }
      
      // Add shipping fee
      lineItems.push({
        price_data: {
          currency: STRIPE_CURRENCY,
          product_data: {
            name: 'Frete',
            description: 'Entrega para todo o Brasil',
          },
          unit_amount: SHIPPING_FEE,
        },
        quantity: 1,
      });
      
      totalAmount += SHIPPING_FEE;
      
      // Create order first
      const order = await db.createOrder({
        userId: ctx.user?.id,
        customerName: customerData.customerName,
        customerEmail: customerData.customerEmail,
        customerPhone: customerData.customerPhone,
        shippingAddress: customerData.shippingAddress,
        shippingCity: customerData.shippingCity,
        shippingState: customerData.shippingState,
        shippingZipCode: customerData.shippingZipCode,
        totalAmount,
        status: 'pending',
        paymentStatus: 'pending',
      });
      
      // Create order items
      for (const item of items) {
        const product = await db.getProductById(item.productId);
        if (product) {
          await db.createOrderItem({
            orderId: order.id,
            productId: product.id,
            productName: product.name,
            productPrice: product.price,
            quantity: item.quantity,
            size: item.size,
            color: item.color,
            subtotal: product.price * item.quantity,
          });
        }
      }
      
      // Create Stripe checkout session
      const origin = ctx.req.headers.origin || 'http://localhost:3000';
      
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/checkout/cancel`,
        customer_email: customerData.customerEmail,
        client_reference_id: order.id.toString(),
        metadata: {
          order_id: order.id.toString(),
          user_id: ctx.user?.id?.toString() || 'guest',
          customer_email: customerData.customerEmail,
          customer_name: customerData.customerName,
        },
        allow_promotion_codes: true,
      });
      
      return {
        sessionId: session.id,
        url: session.url,
        orderId: order.id,
      };
    }),
  
  verifySession: publicProcedure
    .input(z.object({ sessionId: z.string() }))
    .query(async ({ input }) => {
      const stripe = getStripe();
      const session = await stripe.checkout.sessions.retrieve(input.sessionId);
      
      return {
        status: session.payment_status,
        orderId: session.client_reference_id ? parseInt(session.client_reference_id) : null,
        customerEmail: session.customer_email,
      };
    }),
});
