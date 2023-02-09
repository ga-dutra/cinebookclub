import styled from "styled-components";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import {
  postNewFilmWishList,
  postNewTvShowWishList,
} from "../../services/services";
import useToken from "../../hooks/useToken";
import { toast } from "react-toastify";

export default function TrendingConfirmDialog({
  confirmDialog,
  setConfirmDialog,
  media,
}) {
  let mediaWished;
  const token = useToken();
  const unavailableImg =
    "https://www.fullperformance.com.br/images/evento/2020-03-01_1a_logo_default3.jpg";
  const imgURLbase = "https://image.tmdb.org/t/p/w220_and_h330_face";
  function handleConfirmationDialog() {
    mediaWished = {
      title: media.title || media.name,
      img: media.poster_path
        ? `${imgURLbase}${media.poster_path}`
        : unavailableImg,
      overview: media.overview || "...",
      api_id: String(media.id),
      vote_average: media.vote_average,
      medias_id: confirmDialog.type === "addFilmWishList" ? 2 : 3,
    };
    addFilmWishList(mediaWished);
  }

  async function addFilmWishList(mediaWished) {
    try {
      confirmDialog.type === "addFilmWishList"
        ? await postNewFilmWishList(token, mediaWished)
        : await postNewTvShowWishList(token, mediaWished);
      setConfirmDialog({
        ...confirmDialog,
        isOpen: false,
      });
      toast(
        `${mediaWished.title} adicionado com sucesso à sua lista de desejos!`
      );
    } catch (error) {
      console.log(error);
      if (error.response.status === 409) {
        toast(`${mediaWished.title} já está na sua lista de desejos!`);
        setConfirmDialog({
          ...confirmDialog,
          isOpen: false,
        });
      }
    }
  }

  return (
    <Dialog open={confirmDialog.isOpen}>
      <Wrapper>
        <DialogTitle>
          <MediaImage
            src={`${imgURLbase}${media.poster_path}` || unavailableImg}
          ></MediaImage>
        </DialogTitle>
        <DialogContent>
          <h5>Adicionar</h5>
          <h6>{media.title || media.name}</h6>
          <h5>À sua lista de desejos?</h5>
        </DialogContent>
        <DialogActions>
          <Button color={"blue"} onClick={handleConfirmationDialog}>
            Sim
          </Button>
          <Button
            color={"red"}
            onClick={() => {
              setConfirmDialog({
                ...confirmDialog,
                isOpen: false,
              });
            }}
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
  max-width: 290px;
  max-height: 500px;
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
  h5:nth-last-child(1) {
    margin-top: 5px;
    margin-bottom: -2px;
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
  color: #ffffff;
`;

const MediaImage = styled.img`
  width: 148px;
  height: 210px;
  border-radius: 6px;
  margin-bottom: -12px;
`;
