import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  let medias = await prisma.medias.findMany();

  if (medias.length !== 3) {
    await prisma.medias.create({
      data: {
        name: "books",
      },
    });
    await prisma.medias.create({
      data: {
        name: "films",
      },
    });
    await prisma.medias.create({
      data: {
        name: "tv_shows",
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
