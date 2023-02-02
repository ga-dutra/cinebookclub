import styled from "styled-components";
import ReactStars from "react-rating-stars-component";
import { useContext, useState } from "react";
import { DebounceInput } from "react-debounce-input";
import useToken from "../../hooks/useToken";
import { updateBookGradeOrReviewOrDate } from "../../services/services";
import { toast } from "react-toastify";
import { SearchContext } from "../../contexts/searchContext";

export default function BookBox({ book }) {
  const token = useToken();
  const { setInputCleaner, inputCleaner } = useContext(SearchContext);
  const [review, setReview] = useState(book.review);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  async function ratingChanged(newRating) {
    try {
      await updateBookGradeOrReviewOrDate(token, book.book_api_id, {
        newGrade: newRating,
      });
      toast("Nota atualizada com sucesso");
    } catch (error) {
      console.log(error);
    }
  }
  async function updateDate(newDate) {
    try {
      await updateBookGradeOrReviewOrDate(token, book.book_api_id, {
        newReadingDate: newDate,
      });

      setInputCleaner(!inputCleaner);
    } catch (error) {
      console.log(error);
    }
  }
  async function updateReview(newReview) {
    try {
      await updateBookGradeOrReviewOrDate(token, book.book_api_id, {
        newReview: newReview,
      });
      toast("Resenha atualizada com sucesso");
      setInputCleaner(!inputCleaner);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Wrapper isDescriptionOpen={isDescriptionOpen}>
      <BookPicture src={book.img} alt={`${book.title} poster`} />
      <BookDescription>
        <h1>{book.title}</h1>
        <h2>{book.author}</h2>
      </BookDescription>
      <RatingWrapper>
        <BookDescription>
          <h3>
            <span>Lido em: </span> <br />
            <input
              type="date"
              value={book.read_at.slice(0, 10)}
              min="2000-01-02"
              onChange={(e) => {
                updateDate(e.target.value);
              }}
            ></input>
          </h3>
        </BookDescription>

        <ReactStars
          value={Number(book.grade)}
          count={5}
          onChange={ratingChanged}
          size={24}
          isHalf={true}
          emptyIcon={<i className="far fa-star"></i>}
          halfIcon={<i className="fa fa-star-half-alt"></i>}
          fullIcon={<i className="fa fa-star"></i>}
          activeColor="#ffb703"
        />
      </RatingWrapper>
      <OpenMenuWrapper onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}>
        {isDescriptionOpen ? "-" : "+"}
      </OpenMenuWrapper>
      <ReviewWrapper isDescriptionOpen={isDescriptionOpen}>
        <h1>Resenha Pessoal:</h1>
        <textarea
          autoFocus="none"
          type="text"
          placeholder={book.review !== "null" ? book.review : ""}
          value={review}
          onChange={(e) => setReview(e.target.value)}
        ></textarea>
        {review !== "null" && review.length !== 0 ? (
          <ion-icon
            onClick={() => updateReview(review)}
            name="checkmark-circle"
          ></ion-icon>
        ) : (
          ""
        )}
      </ReviewWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: calc(100vw - 30px);
  margin: 0 15px 26px 15px;
  border-radius: 8px;
  height: ${(props) => (props.isDescriptionOpen ? "200px" : "100px")};
  max-height: 200px;
  background-color: #fcffdf;
  position: relative;
  transition-property: height;
  transition-duration: 2s;
  transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
  font-family: "Lato", sans-serif;
  padding: 16px 12px 12px 12px;
`;

const BookPicture = styled.img`
  width: 62px !important;
  height: 70px !important;
  border-radius: 8px;
  object-fit: contain;
`;

const BookDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding-left: 8px;
  max-width: 158px;
  max-height: 60px;
  h1 {
    font-weight: 700;
    font-size: 17px;
    margin-bottom: 8px;
  }
  h2,
  span {
    font-style: italic;
  }
  h3 {
    font-size: 15px;
    margin-bottom: 2px;
  }
`;

const RatingWrapper = styled.div`
  input {
    font-family: "Lato", sans-serif;
    font-size: 15px;
    background-color: #fcffdf;
    border: none;
    width: 110px;
  }
  textarea:focus,
  input:focus {
    box-shadow: 0 0 0 0;
    outline: 0;
  }
`;

const OpenMenuWrapper = styled.div`
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #38b7ff;
  position: absolute;
  bottom: -15px;
  left: calc(50% - 15px);
  font-family: "Barlow Condensed", sans-serif;
  font-size: 26px;
  padding-bottom: 6px;
  cursor: pointer;
`;

const ReviewWrapper = styled.div`
  display: ${(props) => (props.isDescriptionOpen ? "initial" : "none")};
  position: relative;
  opacity: ${(props) => (props.isDescriptionOpen ? "1" : "0")};
  transition-property: opacity;
  transition-duration: 2s;
  transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  position: absolute;
  bottom: 20px;
  max-width: 95%;
  height: 88px;
  h1 {
    margin: 6px 0;
  }

  textarea {
    resize: none;
    font-family: "Indie Flower", cursive;
    font-size: 16.5px;
    width: calc(100vw - 54px);
    height: 55px;
    background-color: #e2eafc;
    border: none;
    border-radius: 4px;
    margin-bottom: 8px;
  }
  textarea::placeholder {
    color: #000000;
    font-size: 16.5px;
  }
  textarea:focus {
    box-shadow: 0 0 0 0;
    outline: 0;
  }

  ion-icon {
    position: absolute;
    z-index: 3;
    right: 8px;
    bottom: 10px;
    font-size: 24px;
    color: #ff002b;
  }
`;
