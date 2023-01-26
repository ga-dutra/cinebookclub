import axios from "axios";

const baseUrlTest = "http://localhost:4000"; //url de teste

async function postSignUp(body) {
  return axios.post(`${baseUrlTest}/users/signup`, body);
}

async function postSignIn(body) {
  return axios.post(`${baseUrlTest}/users/signin`, body);
}

export { postSignUp, postSignIn };
