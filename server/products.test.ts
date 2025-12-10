import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createTestContext(): TrpcContext {
  const ctx: TrpcContext = {
    user: undefined,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
  return ctx;
}

describe("products procedures", () => {
  it("should list all active products", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.products.list({ active: true });

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    if (result.length > 0) {
      expect(result[0]).toHaveProperty("id");
      expect(result[0]).toHaveProperty("name");
      expect(result[0]).toHaveProperty("price");
      expect(result[0].active).toBe(true);
    }
  });

  it("should get product by slug", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.products.getBySlug({ slug: "jeans-slim-indigo-escuro" });

    expect(result).toBeDefined();
    if (result) {
      expect(result).toHaveProperty("id");
      expect(result).toHaveProperty("name");
      expect(result).toHaveProperty("slug");
      expect(result.slug).toBe("jeans-slim-indigo-escuro");
    }
  });

  it("should list featured products", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.products.list({ featured: true, active: true });

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    result.forEach(product => {
      expect(product.featured).toBe(true);
      expect(product.active).toBe(true);
    });
  });
});

describe("categories procedures", () => {
  it("should list all categories", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.categories.list();

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    
    const categoryNames = result.map(c => c.name);
    expect(categoryNames).toContain("Core Denim");
    expect(categoryNames).toContain("Camisaria Premium");
    expect(categoryNames).toContain("Outlet");
  });
});
