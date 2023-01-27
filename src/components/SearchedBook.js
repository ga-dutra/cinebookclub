import styled from "styled-components";
import { useEffect, useState } from "react";

export default function SearchedBook({ title, author, description, img }) {
  console.log(img, title);
  return (
    <Wrapper>
      <img src={img} alt="" />
      <h1>
        {" "}
        {title} - {author}{" "}
      </h1>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;

  img {
    width: 39px !important;
    height: 52px !important;
    border-radius: 6px;
    object-fit: contain;
    cursor: pointer;
  }
  h1 {
    font-size: 19px;
    font-weight: 400;
    color: #515151;
    margin: 0px 10px;
    cursor: pointer;
    font-family: "Lato";
  }
`;
