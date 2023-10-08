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
});
