import { FilmWishList } from "../services/films.service";
import { TvShowWishList } from "../services/tv_shows.service";
import prisma from "../config/database";
import { Reading } from "./readings.repository";

async function listUserBooksWishList(user_id: number) {
  return await prisma.books_wishlist.findMany({
    where: {
      user_id,
    },
    orderBy: {
      created_at: "desc",
    },
  });
}

async function findByBookAndUserId(book_api_id: string, user_id: number) {
  return await prisma.books_wishlist.findFirst({
    where: {
      AND: { user_id, book_api_id },
    },
  });
}

async function findByFilmAndUserId(api_id: string, user_id: number) {
  return await prisma.films_wishlist.findFirst({
    where: {
      AND: { user_id, api_id },
    },
  });
}

async function findByTvAndUserId(api_id: string, user_id: number) {
  return await prisma.tv_shows_wishlist.findFirst({
    where: {
      AND: { user_id, api_id },
    },
  });
}

async function createBookWishlist(data: Reading) {
  return await prisma.books_wishlist.create({
    data,
  });
}

async function createFilmWishlist(data: FilmWishList) {
  return await prisma.films_wishlist.create({
    data,
  });
}

async function createTvShowWishlist(data: TvShowWishList) {
  return await prisma.tv_shows_wishlist.create({
    data,
  });
}

async function listUserFilmsWishList(user_id: number) {
  return await prisma.films_wishlist.findMany({
    where: {
      user_id,
    },
    orderBy: {
      created_at: "desc",
    },
  });
}

async function listUserTvShowsWishList(user_id: number) {
  return await prisma.tv_shows_wishlist.findMany({
    where: {
      user_id,
    },
    orderBy: {
      created_at: "desc",
    },
  });
}

async function deleteBookWishList(wishlist_id: number) {
  return await prisma.books_wishlist.delete({
    where: {
      id: wishlist_id,
    },
  });
}

async function deleteFilmWishList(wishlist_id: number) {
  return await prisma.films_wishlist.delete({
    where: {
      id: wishlist_id,
    },
  });
}

async function deleteTvShowWishList(wishlist_id: number) {
  return await prisma.tv_shows_wishlist.delete({
    where: {
      id: wishlist_id,
    },
  });
}

const wishlistsRepository = {
  listUserBooksWishList,
  findByBookAndUserId,
  findByFilmAndUserId,
  findByTvAndUserId,
  createBookWishlist,
  listUserFilmsWishList,
  listUserTvShowsWishList,
  createFilmWishlist,
  createTvShowWishlist,
  deleteBookWishList,
  deleteFilmWishList,
  deleteTvShowWishList,
};

export default wishlistsRepository;
