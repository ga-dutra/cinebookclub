import styled from "styled-components";

export default function WishListBox({ book }) {
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
          {book.description.slice(0, 50)} ...
        </h3>
      </BookDescription>{" "}
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
  width: 44px !important;
  height: 68px !important;
  border-radius: 6px;
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
    font-size: 17px;
    margin-bottom: 8px;
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
