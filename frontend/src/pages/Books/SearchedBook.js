import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../contexts/userContext";
import ConfirmDialog from "../../components/ConfirmDialog";

export default function SearchedBook({
  title,
  author,
  description,
  img,
  book_api_id,
  page_count,
}) {
  const book = { title, author, description, img, book_api_id, page_count };
  const { mainMenu2Selected } = useContext(UserContext);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false });
  useEffect(() => {
    if (mainMenu2Selected === "LIDOS/ASSISTIDOS") {
      setConfirmDialog({
        isOpen: false,
        message: `Quer adicionar `,
        type: "addReading",
      });
    } else if (mainMenu2Selected === "LISTA DE DESEJOS") {
      setConfirmDialog({
        isOpen: false,
        message: `Quer adicionar `,
        type: "addBookWishList",
      });
    }
  }, []);

  return (
    <Wrapper>
      <img
        onClick={() => {
          setConfirmDialog({ ...confirmDialog, isOpen: true });
        }}
        src={img}
        alt=""
      />
      <h1
        onClick={() => {
          setConfirmDialog({ ...confirmDialog, isOpen: true });
        }}
      >
        {" "}
        {title} - {author}{" "}
      </h1>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
        img={img}
        title={title}
        book={book}
      />
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
