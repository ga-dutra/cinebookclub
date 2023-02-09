import wishlistsRepository from "../repositories/wishlists.repository";
import axios from "axios";

async function getUserTvShowsWishlist(user_id: number) {
  try {
    const userTvShowsWishList =
      await wishlistsRepository.listUserTvShowsWishList(user_id);
    if (!userTvShowsWishList) {
      throw Error();
    }
    return userTvShowsWishList;
  } catch (error) {
    console.log(error);
    return;
  }
}

async function postTvShowWishList(data: TvShowWishListIncomplete) {
  const apiURI = `https://api.themoviedb.org/3/tv/${data.api_id}?api_key=${process.env.MOVIEDB_API_KEY}&language=pt-BR`;
  const tvShowDetails = await axios.get(apiURI);
  const fullTvShow: TvShowWishList = {
    ...data,
    tagline: tvShowDetails.data.tagline,
    creator: tvShowDetails.data.created_by[0]
      ? tvShowDetails.data.created_by[0].name
      : "",
    seasons_number: tvShowDetails.data.number_of_seasons,
  };
  try {
    return await wishlistsRepository.createTvShowWishlist(fullTvShow);
  } catch (error) {
    console.log(error);
    return;
  }
}

async function deleteTvShowWishlist(api_id: string, user_id: number) {
  try {
    const userTvShowWishList = await wishlistsRepository.findByTvAndUserId(
      api_id,
      user_id
    );
    if (!userTvShowWishList) {
      throw Error();
    }
    return await wishlistsRepository.deleteTvShowWishList(
      userTvShowWishList.id
    );
  } catch (error) {
    console.log(error);
    return;
  }
}

const tvShowService = {
  getUserTvShowsWishlist,
  postTvShowWishList,
  deleteTvShowWishlist,
};

export default tvShowService;

export type TvShowWishList = {
  medias_id: number;
  user_id: number;
  api_id: string;
  title: string;
  tagline: string;
  creator: string;
  seasons_number: number;
  img: string;
  vote_average: number;
  overview: string;
};

export type TvShowWishListIncomplete = Omit<
  TvShowWishList,
  "creator" | "seasons_number"
>;
