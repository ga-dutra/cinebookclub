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

export { postSignUp, postSignIn };
