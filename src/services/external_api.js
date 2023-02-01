import axios from "axios";

const baseUrlTest = "http://localhost:4000"; //url de teste

async function getApiBooks(search) {
  const api_key = process.env.REACT_APP_GOOGLE_API_KEY;
  let response;
  try {
    response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${search}&printType=books&orderBy=relevance&maxResults=5&key=${api_key}`
    );
  } catch (error) {
    console.log(error);
  }
  return response;
}

async function getApiFilms(search) {
  const api_key = process.env.REACT_APP_MOVIEDB_API_KEY;
  let response;
  try {
    response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=pt-BR&query=${search}&page=1&include_adult=false`
    );
  } catch (error) {
    console.log(error);
  }
  return response;
}

export { getApiBooks, getApiFilms };
