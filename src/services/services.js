import axios from "axios";

const baseUrlTest = "http://localhost:4000"; //url de teste

async function postSignUp(body) {
  const response = await axios.post(`${baseUrlTest}/users/signup`, body);
  return response.data;
}

async function postSignIn(body) {
  const response = await axios.post(`${baseUrlTest}/users/signin`, body);
  return response.data;
}

async function getUserReadings(token) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get(`${baseUrlTest}/readings`, config);

  return response.data;
}

async function getUserWatchings(token, medias_id) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get(
    `${baseUrlTest}/watchings/${medias_id}`,
    config
  );

  return response.data;
}

async function postNewReading(token, newReading) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.post(
    `${baseUrlTest}/readings`,
    newReading,
    config
  );
  return response.data;
}

async function postNewWatching(token, newWatching) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.post(
    `${baseUrlTest}/watchings`,
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
  const response = await axios.put(`${baseUrlTest}/readings`, body, config);
  return response.data;
}

async function updateWatchingGradeOrReviewOrDate(token, api_id, data) {
  const body = { ...data, api_id };
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.put(`${baseUrlTest}/watchings`, body, config);
  return response.data;
}

async function getUserBooksWishlist(token) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get(`${baseUrlTest}/books`, config);
  return response.data;
}

async function getUserFilmsWishlist(token) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get(`${baseUrlTest}/films`, config);
  return response.data;
}

async function getUserTvShowsWishlist(token) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get(`${baseUrlTest}/tvshows`, config);
  return response.data;
}

async function postNewBookWishList(token, newBookWishList) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.post(
    `${baseUrlTest}/books`,
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
    `${baseUrlTest}/films`,
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
    `${baseUrlTest}/tvshows`,
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
  const response = await axios.delete(`${baseUrlTest}/readings`, config);
  return response.data;
}

async function deleteWatching(token, api_id, medias_id) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.delete(
    `${baseUrlTest}/watchings`,
    { medias_id, api_id },
    config
  );
  return response.data;
}

async function deleteBookWishList(token, book_api_id) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.delete(
    `${baseUrlTest}/books`,
    { book_api_id },
    config
  );
  return response.data;
}

async function deleteFilmWishList(token, api_id) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.delete(
    `${baseUrlTest}/films`,
    { api_id },
    config
  );
  return response.data;
}

async function deleteTvShowWishList(token, api_id) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.delete(
    `${baseUrlTest}/tvshows`,
    { api_id },
    config
  );
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
