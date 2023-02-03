import prisma from "../config/database";

async function createReading(data: Reading) {
  return await prisma.readings.create({
    data,
  });
}

async function listUserReadings(user_id: number) {
  return await prisma.readings.findMany({
    where: {
      user_id,
    },
    orderBy: {
      read_at: "desc",
    },
  });
}

async function findByBookAndUserId(book_api_id: string, user_id: number) {
  return await prisma.readings.findFirst({
    where: {
      AND: { user_id, book_api_id },
    },
  });
}

async function updateGrade(readingId: number, newGrade: number) {
  return await prisma.readings.update({
    where: {
      id: readingId,
    },
    data: {
      grade: newGrade,
    },
  });
}

async function updateReview(readingId: number, newReview: string) {
  return await prisma.readings.update({
    where: {
      id: readingId,
    },
    data: {
      review: newReview,
    },
  });
}

async function updateReadingDate(readingId: number, newDate: Date) {
  return await prisma.readings.update({
    where: {
      id: readingId,
    },
    data: {
      read_at: newDate,
    },
  });
}

async function deleteReading(readingId: number) {
  return await prisma.readings.delete({
    where: {
      id: readingId,
    },
  });
}

const readingRepository = {
  createReading,
  listUserReadings,
  findByBookAndUserId,
  updateGrade,
  updateReview,
  updateReadingDate,
  deleteReading,
};

export default readingRepository;

export type Reading = {
  id?: number;
  medias_id: number;
  user_id: number;
  grade?: number;
  review?: string;
  book_api_id: string;
  title: string;
  author: string;
  description: string;
  img: string;
  page_count: number;
  read_at?: Date;
};
