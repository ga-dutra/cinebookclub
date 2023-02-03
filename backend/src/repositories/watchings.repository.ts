import prisma from "../config/database";

async function createWatching(data: Watching) {
  return await prisma.watchings.create({
    data,
  });
}

async function listUserWatchings(user_id: number, medias_id: number) {
  return await prisma.watchings.findMany({
    where: {
      AND: { user_id, medias_id },
    },
    orderBy: {
      watched_at: "desc",
    },
  });
}

async function findByMediaAndUserId(
  api_id: string,
  user_id: number,
  medias_id: number
) {
  return await prisma.watchings.findFirst({
    where: {
      AND: { user_id, medias_id, api_id },
    },
  });
}

async function updateGrade(watchingId: number, newGrade: number) {
  return await prisma.watchings.update({
    where: {
      id: watchingId,
    },
    data: {
      grade: newGrade,
    },
  });
}

async function updateReview(watchingId: number, newReview: string) {
  return await prisma.watchings.update({
    where: {
      id: watchingId,
    },
    data: {
      review: newReview,
    },
  });
}

async function updateWatchingDate(watchingId: number, newDate: Date) {
  return await prisma.watchings.update({
    where: {
      id: watchingId,
    },
    data: {
      watched_at: newDate,
    },
  });
}

async function deleteWatching(watchingId: number) {
  return await prisma.watchings.delete({ where: { id: watchingId } });
}

const watchingsRepository = {
  createWatching,
  listUserWatchings,
  findByMediaAndUserId,
  updateGrade,
  updateReview,
  updateWatchingDate,
  deleteWatching,
};

export default watchingsRepository;

export type Watching = {
  id?: number;
  medias_id: number;
  user_id: number;
  grade?: number;
  review?: string;
  api_id: string;
  overview: string;
  title: string;
  release_date: string;
  img: string;
  vote_average: number;
  watched_at?: Date;
};
