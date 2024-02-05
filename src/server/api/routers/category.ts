import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const categoryRouter = createTRPCRouter({
  getCategoryForNav: publicProcedure.query(async ({ ctx }) => {
    const categories = await ctx.db.category.findMany({
      where: {
        onNav: true,
      },
      take: 10,
    });
    return { success: true, data: categories };
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "brrrhh skibbdi doop doop";
  }),

  getAllCategories: publicProcedure.query(async ({ ctx }) => {
    const categories = await ctx.db.category.findMany();

    return { success: true, data: categories };
  }),

  getCategoryBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const categories = await ctx.db.category.findUnique({
        where: { slug: input.slug },
        include: { articles: true },
      });

      return { success: true, data: categories };
    }),
});
