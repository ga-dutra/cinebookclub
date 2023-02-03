import wishlistsRepository from "../repositories/wishlists.repository";
import { Reading } from "../repositories/readings.repository";

async function getUserBooksWishlist(user_id: number) {
  try {
    const userBooksWishList = await wishlistsRepository.listUserBooksWishList(
      user_id
    );
    if (!userBooksWishList) {
      throw Error();
    }
    return userBooksWishList;
  } catch (error) {
    console.log(error);
    return;
  }
}

async function postBookWishList(data: Reading) {
  try {
    return await wishlistsRepository.createBookWishlist(data);
  } catch (error) {
    console.log(error);
    return;
  }
}

async function deleteBookWishList(user_id: number, book_api_id: string) {
  try {
    const userBookWishList = await wishlistsRepository.findByBookAndUserId(
      book_api_id,
      user_id
    );
    if (!userBookWishList) {
      throw Error();
    }
    return await wishlistsRepository.deleteBookWishList(userBookWishList.id);
  } catch (error) {
    console.log(error);
    return;
  }
}

const booksService = {
  getUserBooksWishlist,
  postBookWishList,
  deleteBookWishList,
};

export default booksService;
