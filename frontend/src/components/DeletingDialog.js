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
import {
  deleteReading,
  deleteWatching,
  deleteBookWishList,
  deleteFilmWishList,
  deleteTvShowWishList,
} from "../services/services";
import { toast } from "react-toastify";

export default function DeletingDialog({
  confirmDialog,
  setConfirmDialog,
  media,
}) {
  const token = useToken();
  const { inputCleaner, setInputCleaner } = useContext(SearchContext);
  function handleConfirmationDialog() {
    if (confirmDialog.type === "deleteReading") postDeleteReading();
    else if (confirmDialog.type === "deleteWatching") postDeleteWatching();
    else if (confirmDialog.type === "deleteBookWishList")
      postDeleteBookWishList();
    else if (confirmDialog.type === "deleteTvShowWishList")
      postDeleteTvShowWishList();
    else if (confirmDialog.type === "deleteFilmWishList")
      postDeleteFilmWishList();
  }

  async function postDeleteReading() {
    try {
      await deleteReading(token, media.book_api_id);
      setConfirmDialog({
        ...confirmDialog,
        isOpen: false,
      });
      toast(`${media.title} deletado com sucesso!`);
      setInputCleaner(!inputCleaner);
    } catch (error) {
      console.log(error);
      toast(`Não foi possível deletar ${media.title}`);
      setConfirmDialog({
        ...confirmDialog,
        isOpen: false,
      });
      setInputCleaner(!inputCleaner);
    }
  }
  async function postDeleteWatching() {
    try {
      await deleteWatching(token, media.api_id, media.medias_id);
      setConfirmDialog({
        ...confirmDialog,
        isOpen: false,
      });
      toast(`${media.title} deletado com sucesso!`);
      setInputCleaner(!inputCleaner);
    } catch (error) {
      console.log(error);
      toast(`Não foi possível deletar ${media.title}`);
      setConfirmDialog({
        ...confirmDialog,
        isOpen: false,
      });
      setInputCleaner(!inputCleaner);
    }
  }
  async function postDeleteBookWishList() {
    try {
      await deleteBookWishList(token, media.book_api_id);
      setConfirmDialog({
        ...confirmDialog,
        isOpen: false,
      });
      toast(`${media.title} deletado com sucesso!`);
      setInputCleaner(!inputCleaner);
    } catch (error) {
      console.log(error);
      toast(`Não foi possível deletar ${media.title}`);
      setConfirmDialog({
        ...confirmDialog,
        isOpen: false,
      });
      setInputCleaner(!inputCleaner);
    }
  }
  async function postDeleteTvShowWishList() {
    try {
      await deleteTvShowWishList(token, media.api_id);
      setConfirmDialog({
        ...confirmDialog,
        isOpen: false,
      });
      toast(`${media.title} deletado com sucesso!`);
      setInputCleaner(!inputCleaner);
    } catch (error) {
      console.log(error);
      toast(`Não foi possível deletar ${media.title}`);
      setConfirmDialog({
        ...confirmDialog,
        isOpen: false,
      });
      setInputCleaner(!inputCleaner);
    }
  }
  async function postDeleteFilmWishList() {
    try {
      await deleteFilmWishList(token, media.api_id);
      setConfirmDialog({
        ...confirmDialog,
        isOpen: false,
      });
      toast(`${media.title} deletado com sucesso!`);
      setInputCleaner(!inputCleaner);
    } catch (error) {
      console.log(error);
      toast(`Não foi possível deletar ${media.title}`);
      setConfirmDialog({
        ...confirmDialog,
        isOpen: false,
      });
      setInputCleaner(!inputCleaner);
    }
  }

  return (
    <Dialog open={confirmDialog.isOpen}>
      <Wrapper>
        <DialogTitle>
          <MediaImage src={media.img}></MediaImage>
        </DialogTitle>
        <DialogContent>
          <h5>Tem certeza que deseja deletar</h5>
          <h6>{media.title} ?</h6>
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

const MediaImage = styled.img`
  width: 90px;
  height: 130px;
  margin-bottom: -12px;
`;
