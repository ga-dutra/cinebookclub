import styled from "styled-components";
import ReactStars from "react-rating-stars-component";
import { useState } from "react";

export default function BookBox() {
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  return (
    <Wrapper isDescriptionOpen={isDescriptionOpen}>
      <ReactStars
        value={3}
        count={5}
        onChange={ratingChanged}
        size={24}
        isHalf={true}
        emptyIcon={<i className="far fa-star"></i>}
        halfIcon={<i className="fa fa-star-half-alt"></i>}
        fullIcon={<i className="fa fa-star"></i>}
        activeColor="#ffd700"
      />
      <OpenMenuWrapper onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}>
        {isDescriptionOpen ? "-" : "+"}
      </OpenMenuWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: calc(100vw - 30px);
  margin: 0 15px 12px 15px;
  border-radius: 8px;
  height: ${(props) => (props.isDescriptionOpen ? "160px" : "100px")};
  background-color: #fcffdf;
  position: relative;
  transition-property: height;
  transition-duration: 2s;
  transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
`;

const BookPicture = styled.img``;

const BookDescription = styled.div``;

const RatingWrapper = styled.div``;

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
