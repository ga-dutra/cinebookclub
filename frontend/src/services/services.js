import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

async function postSignUp(body) {
  const response = await axios.post(`${baseUrl}/users/signup`, body);
  return response.data;
}

async function postSignIn(body) {
  const response = await axios.post(`${baseUrl}/users/signin`, body);
  return response.data;
}

async function getUserReadings(token) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get(`${baseUrl}/readings`, config);

  return response.data;
}

async function getUserWatchings(token, medias_id) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get(`${baseUrl}/watchings/${medias_id}`, config);

  return response.data;
}

async function postNewReading(token, newReading) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.post(`${baseUrl}/readings`, newReading, config);
  return response.data;
}

async function postNewWatching(token, newWatching) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.post(
    `${baseUrl}/watchings`,
    newWatching,
    config
  );
  return response.data;
}

async function updateBookGradeOrReviewOrDate(token, book_api_id, data) {
  const body = { ...data, book_api_id };
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.put(`${baseUrl}/readings`, body, config);
  return response.data;
}

async function updateWatchingGradeOrReviewOrDate(token, api_id, data) {
  const body = { ...data, api_id };
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.put(`${baseUrl}/watchings`, body, config);
  return response.data;
}

async function getUserBooksWishlist(token) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get(`${baseUrl}/books`, config);
  return response.data;
}

async function getUserFilmsWishlist(token) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get(`${baseUrl}/films`, config);
  return response.data;
}

async function getUserTvShowsWishlist(token) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get(`${baseUrl}/tvshows`, config);
  return response.data;
}

async function postNewBookWishList(token, newBookWishList) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.post(
    `${baseUrl}/books`,
    newBookWishList,
    config
  );
  return response.data;
}

async function postNewFilmWishList(token, newFilmWishList) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.post(
    `${baseUrl}/films`,
    newFilmWishList,
    config
  );
  return response.data;
}

async function postNewTvShowWishList(token, newTvShowWishList) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.post(
    `${baseUrl}/tvshows`,
    newTvShowWishList,
    config
  );
  return response.data;
}

async function deleteReading(token, book_api_id) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
    data: { book_api_id },
  };
  const response = await axios.delete(`${baseUrl}/readings`, config);
  return response.data;
}

async function deleteWatching(token, api_id, medias_id) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
    data: { api_id, medias_id },
  };
  const response = await axios.delete(`${baseUrl}/watchings`, config);
  return response.data;
}

async function deleteBookWishList(token, book_api_id) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
    data: { book_api_id },
  };
  const response = await axios.delete(`${baseUrl}/books`, config);
  return response.data;
}

async function deleteFilmWishList(token, api_id) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
    data: { api_id },
  };
  const response = await axios.delete(`${baseUrl}/films`, config);
  return response.data;
}

async function deleteTvShowWishList(token, api_id) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
    data: { api_id },
  };
  const response = await axios.delete(`${baseUrl}/tvshows`, config);
  return response.data;
}

export {
  postSignUp,
  postSignIn,
  getUserReadings,
  postNewReading,
  updateBookGradeOrReviewOrDate,
  updateWatchingGradeOrReviewOrDate,
  getUserBooksWishlist,
  getUserFilmsWishlist,
  getUserTvShowsWishlist,
  postNewBookWishList,
  postNewFilmWishList,
  postNewTvShowWishList,
  getUserWatchings,
  postNewWatching,
  deleteReading,
  deleteWatching,
  deleteBookWishList,
  deleteFilmWishList,
  deleteTvShowWishList,
};
