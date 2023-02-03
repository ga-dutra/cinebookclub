import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { useContext } from "react";
import styled from "styled-components";
import { SearchContext } from "../contexts/searchContext";
import useToken from "../hooks/useToken";
import { postNewReading, postNewBookWishList } from "../services/services";
import { toast } from "react-toastify";

export default function ConfirmDialog({
  confirmDialog,
  setConfirmDialog,
  book,
}) {
  const token = useToken();
  const { inputCleaner, setInputCleaner } = useContext(SearchContext);
  function handleConfirmationDialog() {
    if (confirmDialog.type === "addReading") {
      addNewReading();
    } else if (confirmDialog.type === "addBookWishList") {
      addBookWishList();
    }
  }

  async function addNewReading() {
    try {
      await postNewReading(token, book);
      setConfirmDialog({
        ...confirmDialog,
        isOpen: false,
      });
      toast(`${book.title} adicionado com sucesso!`);
      setInputCleaner(!inputCleaner);
    } catch (error) {
      console.log(error);
      if (error.response.status === 409) {
        toast(`${book.title} já está na sua lista!`);
        setConfirmDialog({
          ...confirmDialog,
          isOpen: false,
        });
        setInputCleaner(!inputCleaner);
      }
    }
  }

  async function addBookWishList() {
    try {
      await postNewBookWishList(token, book);
      setConfirmDialog({
        ...confirmDialog,
        isOpen: false,
      });
      toast(`${book.title} adicionado com sucesso!`);
      setInputCleaner(!inputCleaner);
    } catch (error) {
      console.log(error);
      if (error.response.status === 409) {
        toast(`${book.title} já está na sua lista!`);
        setConfirmDialog({
          ...confirmDialog,
          isOpen: false,
        });
        setInputCleaner(!inputCleaner);
      }
    }
  }

  return (
    <Dialog open={confirmDialog.isOpen}>
      <Wrapper>
        <DialogTitle>
          <BookImage src={book.img}></BookImage>
        </DialogTitle>
        <DialogContent>
          <h5>Adicionar</h5>
          <h6>{book.title} ?</h6>
        </DialogContent>
        <DialogActions>
          <Button color={"green"} onClick={handleConfirmationDialog}>
            Sim
          </Button>
          <Button
            color={"red"}
            onClick={() =>
              setConfirmDialog({
                ...confirmDialog,
                isOpen: false,
              })
            }
          >
            Não
          </Button>
        </DialogActions>
      </Wrapper>
    </Dialog>
  );
}
const Wrapper = styled.div`
  background-color: #ffd7ba;
  display: flex;
  flex-direction: column;
  text-align: center;
  width: auto;
  max-height: 320px;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  h6 {
    font-family: "Barlow Condensed", sans-serif;
    font-weight: 500;
    font-size: 24px;
  }
  h5 {
    font-family: "Barlow Condensed", sans-serif;
    font-weight: 400;
    font-size: 21px;
    margin-top: -10px;
    margin-bottom: 4px;
  }
`;
const Button = styled.button`
  width: 60px;
  height: 30px;
  margin: 0 14px;
  background-color: ${(props) => props.color};
  font-family: "Barlow Condensed", sans-serif;
  font-size: 18px;
  font-weight: 600;
  border-radius: 4px;
`;

const BookImage = styled.img`
  width: 90px;
  height: 130px;
  margin-bottom: -12px;
`;
