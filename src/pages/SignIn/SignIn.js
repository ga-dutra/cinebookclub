import styled from "styled-components";
import { toast } from "react-toastify";
import { useState } from "react";
import newlogo from "../../assets/img/newlogo.png";
import { useNavigate } from "react-router-dom";
import { postSignIn } from "../../services/services";

import {
  Wrapper,
  FormWrapper,
  Logo,
  Link,
  Description,
} from "../Enroll/Enroll.js";

export default function SignIn() {
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  async function submitForm(event) {
    event.preventDefault();
    const body = { ...form };
    try {
      await postSignIn(body);
      toast("Login realizado com sucesso!");
      navigate("/");
    } catch (error) {
      toast("Houve um erro ao realizar o login. Tente novamente!");
      console.log(error.message);
    }
  }

  function handleForm({ value, name }) {
    setForm({
      ...form,
      [name]: value,
    });
  }
  return (
    <Wrapper>
      <Logo src={newlogo} alt="Cine-book club logo" />
      {/* <Description>LOGIN</Description> */}
      <FormWrapper onSubmit={submitForm}>
        <input
          placeholder="E-mail"
          name="email"
          type="email"
          required
          onChange={(e) => {
            handleForm({ name: e.target.name, value: e.target.value });
          }}
        />
        <input
          placeholder="Senha"
          name="password"
          type="password"
          required
          onChange={(e) => {
            handleForm({ name: e.target.name, value: e.target.value });
          }}
        />
        <button>Entrar</button>
      </FormWrapper>
      <Link onClick={() => navigate("/sign-up")}>
        Ainda não possui conta? Cadastre-se
      </Link>
    </Wrapper>
  );
}
