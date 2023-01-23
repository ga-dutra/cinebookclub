import styled from "styled-components";
import { toast } from "react-toastify";
import { useState } from "react";
import logo_img_acima4 from "../../assets/img/logo-img-acima4.png";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  function submitForm(event) {
    event.preventDefault();
  }

  function handleForm({ value, name }) {
    setForm({
      ...form,
      [name]: value,
    });
  }
  return (
    <Wrapper>
      <Logo src={logo_img_acima4} alt="Cine-book club logo" />
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

const Wrapper = styled.div`
  background-color: #ffd7ba;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const Logo = styled.img`
  max-width: 120vw;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 80vw;

  input {
    height: 48px;
    margin-bottom: 12px;
    background-color: #ffe5d9;
    border: solid #e8e8e4;
    border-radius: 5px;
    padding-left: 12px;
    font-family: "Raleway", sans-serif;
    font-weight: 500;
    font-size: 18px;
    color: #000000;
    word-wrap: break-word;
  }

  input::placeholder {
    font-weight: 400;
    color: #495057;
  }

  input:focus {
    outline: none;
  }
  button {
    cursor: pointer;
    width: 100%;
    height: 48px;
    margin: 10px 0;
    border-radius: 5px;
    background-color: #ff3847;
    border: 0px solid #a328d6;
    font-size: 20px;
    font-weight: 700;
    color: #ffffff;
    font-family: "Raleway", sans-serif;
  }
`;

const Link = styled.p`
  margin-top: 12px;
  font-size: 18px;
  font-family: "Raleway", sans-serif;
  color: #495057;
  cursor: pointer;
`;
