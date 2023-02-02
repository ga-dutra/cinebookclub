import { useContext, useState } from "react";
import styled from "styled-components";
import { SearchContext } from "../contexts/searchContext";
import useToken from "../hooks/useToken";
import DeletingDialog from "./DeletingDialog";

export default function WishListBox({ book }) {
  const [confirmDialog, setConfirmDialog] = useState({
    type: "deleteBookWishList",
    isOpen: false,
  });
  const token = useToken();
  const { setInputCleaner, inputCleaner } = useContext(SearchContext);
  return (
    <Wrapper>
      <BookDescription>
        <h1>{book.title}</h1>
        <h2>{book.author}</h2>
      </BookDescription>{" "}
      <BookPicture src={book.img} alt={`${book.title} poster`} />{" "}
      <BookDescription>
        <h3>
          <span>Sinopse:</span> <br />
          {book.description.slice(0, 70)} ...
        </h3>
      </BookDescription>{" "}
      <ion-icon
        onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: true })}
        name="trash-outline"
      ></ion-icon>
      <DeletingDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
        img={book.img}
        title={book.title}
        media={book}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100vw - 30px);
  margin: 0 15px 26px 15px;
  border-radius: 8px;
  height: 120px;
  max-height: 200px;
  background-color: #fcffdf;
  position: relative;
  font-family: "Lato", sans-serif;
  padding: 10px;
  position: relative;

  ion-icon {
    z-index: 3;
    position: absolute;
    bottom: 4px;
    right: 4px;
    font-size: 18px;
  }
`;

const BookPicture = styled.img`
  width: 60px !important;
  height: 84px !important;
  border-radius: 6px;
  margin-left: 10px;
  object-fit: contain;
`;

const BookDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding-left: 8px;
  max-width: 140px;
  max-height: 60px;
  h1 {
    font-weight: 700;
    font-size: 17.5px;
    margin-bottom: 12px;
  }
  h2,
  span {
    font-style: italic;
  }
  h3 {
    font-size: 13px;
    margin-bottom: 2px;
    max-width: 120px;
  }
`;
