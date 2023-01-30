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

async function getUserReadings(token) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get(`${baseUrlTest}`, config);
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

export { postSignUp, postSignIn, getApiBooks, getUserReadings, postNewReading };
