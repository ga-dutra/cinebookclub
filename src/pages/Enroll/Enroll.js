import styled from "styled-components";
import { toast } from "react-toastify";
import { useState } from "react";
import newlogo from "../../assets/img/newlogo.png";
import { useNavigate } from "react-router-dom";
import { postSignUp } from "../../services/services";

export default function Enroll() {
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  async function submitForm(event) {
    event.preventDefault();
    const body = { ...form };
    try {
      await postSignUp(body);
      toast("Cadastro realizado com sucesso!");
      navigate("/login");
    } catch (error) {
      toast("Houve um erro ao realizar o cadastro. Tente novamente!");
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
      {/* <Description>CADASTRO</Description> */}
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
        <input
          placeholder="Repita sua senha"
          name="confirmed_password"
          type="password"
          required
          onChange={(e) => {
            handleForm({ name: e.target.name, value: e.target.value });
          }}
        />
        <button>Cadastrar-se</button>
      </FormWrapper>
      <Link onClick={() => navigate("/login")}>
        Já possui conta? Faça o login
      </Link>
    </Wrapper>
  );
}

export const Wrapper = styled.div`
  background-color: #fddacf;
  background-color: #ffd7ba;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

export const Logo = styled.img`
  max-width: 120vw;
  margin-top: -80px;
`;

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 80vw;

  input {
    height: 48px;
    margin-bottom: 12px;
    background-color: #ffe5d9;
    border: solid #fcd5ce;
    box-shadow: 1px 1px -1px -1px rgba(0, 0, 0, 0.03);
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

export const Link = styled.p`
  margin-top: 12px;
  font-size: 18px;
  font-family: "Raleway", sans-serif;
  color: #495057;
  cursor: pointer;
`;

export const Description = styled.p`
  font-family: "Barlow Condensed", sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: #d90429;
  margin: -30px 0 10px 0;
`;
