import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { useContext } from "react";
import styled from "styled-components";
import { SearchContext } from "../../contexts/searchContext";
import useToken from "../../hooks/useToken";
import {
  postNewWatching,
  postNewFilmWishList,
  postNewTvShowWishList,
} from "../../services/services";
import { toast } from "react-toastify";

export default function FilmConfirmDialog({
  confirmDialog,
  setConfirmDialog,
  film,
}) {
  const token = useToken();
  const { inputCleaner, setInputCleaner } = useContext(SearchContext);
  function handleConfirmationDialog() {
    if (
      confirmDialog.type === "addFilmWatching" ||
      confirmDialog.type === "addTvShowWatching"
    ) {
      addNewWatching();
    } else if (
      confirmDialog.type === "addFilmWishList" ||
      confirmDialog.type === "addTvShowWishList"
    ) {
      addFilmWishList();
    }
  }

  async function addNewWatching() {
    try {
      await postNewWatching(token, film);
      setConfirmDialog({
        ...confirmDialog,
        isOpen: false,
      });
      toast(`${film.title} adicionado com sucesso!`);
      setInputCleaner(!inputCleaner);
    } catch (error) {
      console.log(error);
      if (error.response.status === 409) {
        toast(`${film.title} já está na sua lista!`);
        setConfirmDialog({
          ...confirmDialog,
          isOpen: false,
        });
        setInputCleaner(!inputCleaner);
      }
    }
  }

  async function addFilmWishList() {
    try {
      delete film.release_date;
      confirmDialog.type === "addFilmWishList"
        ? await postNewFilmWishList(token, film)
        : await postNewTvShowWishList(token, film);
      setConfirmDialog({
        ...confirmDialog,
        isOpen: false,
      });
      toast(`${film.title} adicionado com sucesso!`);
      setInputCleaner(!inputCleaner);
    } catch (error) {
      console.log(error);
      if (error.response.status === 409) {
        toast(`${film.title} já está na sua lista!`);
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
          <FilmImage src={film.img}></FilmImage>
        </DialogTitle>
        <DialogContent>
          <h5>Adicionar</h5>
          <h6>{film.title} ?</h6>
        </DialogContent>
        <DialogActions>
          <Button color={"blue"} onClick={handleConfirmationDialog}>
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
  border: 1px solid #f08080;
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
  font-family: "Righteous", cursive;
  font-size: 14px;
  font-weight: 500;
  border-radius: 4px;
  color: #ffffff;
  border: 0.5px solid #8a908d;
`;

const FilmImage = styled.img`
  width: 90px;
  height: 130px;
  margin-bottom: -12px;
`;
