import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const newsRouter = createTRPCRouter({
  getLatestNews: publicProcedure.query(async ({ ctx }) => {
    const news = await ctx.db.article.findMany({
      select: {
        id: true,
        title: true,
        createdAt: true,
        slug: true,
      },
    });
    return { message: "success", data: news };
  }),
  getNewsForHome: publicProcedure.query(async ({ ctx }) => {
    const categoryWithNews = await ctx.db.category.findMany({
      where: { onHome: true },
      include: {
        articles: {
          take: 4,
          select: { content: false, id: true, image: true, title: true },
        },
      },
    });
    return { message: "success", data: categoryWithNews };
  }),

  getNewsBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const news = await ctx.db.article.findUnique({
        where: { slug: input.slug },
      });
      return { message: "success", data: news };
    }),
  createNews: publicProcedure
    .input(z.object({ content: z.string(), title: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const articleCreated = await ctx.db.article.create({
        data: {
          content: input.content,
          title: input.title,
          slug: input.title.trim().replaceAll(" ", "-"),
        },
      });
      return { message: "success", data: articleCreated };
    }),
  editNews: publicProcedure
    .input(z.object({ id: z.string(), content: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const articleUpdated = await ctx.db.article.update({
        where: { id: input.id },
        data: { content: input.content },
      });
      return { message: "success", data: articleUpdated };
    }),
});
