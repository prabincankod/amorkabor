import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { faker } from "@faker-js/faker";

(async () => {
  await prisma.article.deleteMany({});
  for (let i = 0; i < 500; i++) {
    await prisma.article.create({
      data: {
        title: faker.commerce.productName(),
        details: faker.lorem.words(20),
        slug: faker.internet.domainWord(),
        content: faker.commerce.productDescription(),
        image: faker.image.url(),
      },
    });
  }
})();
