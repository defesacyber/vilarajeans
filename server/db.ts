import { and, desc, eq, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, users, 
  categories, InsertCategory, Category,
  products, InsertProduct, Product,
  cartItems, InsertCartItem, CartItem,
  orders, InsertOrder, Order,
  orderItems, InsertOrderItem, OrderItem,
  contactSubmissions, InsertContactSubmission, ContactSubmission
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ============ USER HELPERS ============

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ============ CATEGORY HELPERS ============

export async function getAllCategories(): Promise<Category[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(categories).orderBy(categories.name);
}

export async function getCategoryById(id: number): Promise<Category | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(categories).where(eq(categories.id, id)).limit(1);
  return result[0];
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(categories).where(eq(categories.slug, slug)).limit(1);
  return result[0];
}

export async function createCategory(category: InsertCategory): Promise<Category> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(categories).values(category);
  const inserted = await getCategoryById(Number(result[0].insertId));
  if (!inserted) throw new Error("Failed to retrieve inserted category");
  return inserted;
}

// ============ PRODUCT HELPERS ============

export async function getAllProducts(filters?: { categoryId?: number; featured?: boolean; active?: boolean }): Promise<Product[]> {
  const db = await getDb();
  if (!db) return [];
  
  const conditions = [];
  if (filters?.categoryId) conditions.push(eq(products.categoryId, filters.categoryId));
  if (filters?.featured !== undefined) conditions.push(eq(products.featured, filters.featured));
  if (filters?.active !== undefined) conditions.push(eq(products.active, filters.active));
  
  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;
  
  return db.select().from(products).where(whereClause).orderBy(desc(products.createdAt));
}

export async function getProductById(id: number): Promise<Product | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(products).where(eq(products.id, id)).limit(1);
  return result[0];
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
  return result[0];
}

export async function createProduct(product: InsertProduct): Promise<Product> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(products).values(product);
  const inserted = await getProductById(Number(result[0].insertId));
  if (!inserted) throw new Error("Failed to retrieve inserted product");
  return inserted;
}

export async function updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(products).set(product).where(eq(products.id, id));
  return getProductById(id);
}

export async function deleteProduct(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(products).where(eq(products.id, id));
}

// ============ CART HELPERS ============

export async function getCartItems(userId?: number, sessionId?: string): Promise<(CartItem & { product: Product })[]> {
  const db = await getDb();
  if (!db) return [];
  
  const condition = userId 
    ? eq(cartItems.userId, userId)
    : sessionId 
      ? eq(cartItems.sessionId, sessionId)
      : sql`1=0`; // No results if neither provided
  
  const items = await db
    .select()
    .from(cartItems)
    .where(condition)
    .orderBy(desc(cartItems.createdAt));
  
  const itemsWithProducts = await Promise.all(
    items.map(async (item) => {
      const product = await getProductById(item.productId);
      return { ...item, product: product! };
    })
  );
  
  return itemsWithProducts.filter(item => item.product);
}

export async function addToCart(item: InsertCartItem): Promise<CartItem> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  // Check if item already exists
  const conditions = [eq(cartItems.productId, item.productId)];
  if (item.userId) conditions.push(eq(cartItems.userId, item.userId));
  if (item.sessionId) conditions.push(eq(cartItems.sessionId, item.sessionId));
  if (item.size) conditions.push(eq(cartItems.size, item.size));
  if (item.color) conditions.push(eq(cartItems.color, item.color));
  
  const existing = await db.select().from(cartItems).where(and(...conditions)).limit(1);
  
  if (existing.length > 0) {
    // Update quantity
    const newQuantity = existing[0].quantity + (item.quantity || 1);
    await db.update(cartItems).set({ quantity: newQuantity }).where(eq(cartItems.id, existing[0].id));
    const updated = await db.select().from(cartItems).where(eq(cartItems.id, existing[0].id)).limit(1);
    return updated[0];
  } else {
    // Insert new
    const result = await db.insert(cartItems).values(item);
    const inserted = await db.select().from(cartItems).where(eq(cartItems.id, Number(result[0].insertId))).limit(1);
    return inserted[0];
  }
}

export async function updateCartItemQuantity(id: number, quantity: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(cartItems).set({ quantity }).where(eq(cartItems.id, id));
}

export async function removeFromCart(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(cartItems).where(eq(cartItems.id, id));
}

export async function clearCart(userId?: number, sessionId?: string): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const condition = userId 
    ? eq(cartItems.userId, userId)
    : sessionId 
      ? eq(cartItems.sessionId, sessionId)
      : sql`1=0`;
  
  await db.delete(cartItems).where(condition);
}

// ============ ORDER HELPERS ============

export async function createOrder(order: InsertOrder): Promise<Order> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(orders).values(order);
  const inserted = await db.select().from(orders).where(eq(orders.id, Number(result[0].insertId))).limit(1);
  return inserted[0];
}

export async function createOrderItem(item: InsertOrderItem): Promise<OrderItem> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(orderItems).values(item);
  const inserted = await db.select().from(orderItems).where(eq(orderItems.id, Number(result[0].insertId))).limit(1);
  return inserted[0];
}

export async function getOrderById(id: number): Promise<Order | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(orders).where(eq(orders.id, id)).limit(1);
  return result[0];
}

export async function getOrderItems(orderId: number): Promise<OrderItem[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(orderItems).where(eq(orderItems.orderId, orderId));
}

export async function getAllOrders(): Promise<Order[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(orders).orderBy(desc(orders.createdAt));
}

export async function getUserOrders(userId: number): Promise<Order[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(orders).where(eq(orders.userId, userId)).orderBy(desc(orders.createdAt));
}

export async function updateOrderStatus(id: number, status: Order['status']): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(orders).set({ status }).where(eq(orders.id, id));
}

export async function updateOrderPaymentStatus(id: number, paymentStatus: Order['paymentStatus'], stripePaymentIntentId?: string): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const updateData: Partial<InsertOrder> = { paymentStatus };
  if (stripePaymentIntentId) updateData.stripePaymentIntentId = stripePaymentIntentId;
  await db.update(orders).set(updateData).where(eq(orders.id, id));
}

// ============ CONTACT HELPERS ============

export async function createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(contactSubmissions).values(submission);
  const inserted = await db.select().from(contactSubmissions).where(eq(contactSubmissions.id, Number(result[0].insertId))).limit(1);
  return inserted[0];
}

export async function getAllContactSubmissions(): Promise<ContactSubmission[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
}

export async function updateContactSubmissionStatus(id: number, status: ContactSubmission['status']): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(contactSubmissions).set({ status }).where(eq(contactSubmissions.id, id));
}
