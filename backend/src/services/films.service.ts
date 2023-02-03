import wishlistsRepository from "../repositories/wishlists.repository";
import axios from "axios";

async function getUserFilmsWishlist(user_id: number) {
  try {
    const userFilmsWishList = await wishlistsRepository.listUserFilmsWishList(
      user_id
    );
    if (!userFilmsWishList) {
      throw Error();
    }
    return userFilmsWishList;
  } catch (error) {
    console.log(error);
    return;
  }
}

async function postFilmsWishList(data: FilmWishListIncomplete) {
  const apiURI = `https://api.themoviedb.org/3/movie/${data.api_id}?api_key=${process.env.MOVIEDB_API_KEY}&language=pt-BR`;
  const filmDetails = await axios.get(apiURI);
  const fullFilm: FilmWishList = {
    ...data,
    tagline: filmDetails.data.tagline,
    runtime: filmDetails.data.runtime,
  };
  try {
    return await wishlistsRepository.createFilmWishlist(fullFilm);
  } catch (error) {
    console.log(error);
    return;
  }
}

async function deleteFilmWishList(api_id: string, user_id: number) {
  try {
    const userFilmWishList = await wishlistsRepository.findByFilmAndUserId(
      api_id,
      user_id
    );
    if (!userFilmWishList) {
      throw Error();
    }
    return await wishlistsRepository.deleteFilmWishList(userFilmWishList.id);
  } catch (error) {
    console.log(error);
    return;
  }
}

const filmsService = {
  getUserFilmsWishlist,
  postFilmsWishList,
  deleteFilmWishList,
};

export default filmsService;

export type FilmWishList = {
  medias_id: number;
  user_id: number;
  api_id: string;
  title: string;
  tagline: string;
  runtime: number;
  img: string;
  vote_average: number;
  overview: string;
};

export type FilmWishListIncomplete = Omit<FilmWishList, "tagline" | "runtime">;
