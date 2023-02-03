import { useState } from "react";
import styled from "styled-components";

export default function MediaTypeSelection({
  mediaSelected,
  setMediaSelected,
}) {
  const handleChange = (event) => {
    setMediaSelected(event.target.value);
  };

  const mediaTypeOptions = [
    { value: "", text: "Filmes / Séries", disabled: "disabled" },
    { value: "films", text: "Filmes" },
    { value: "tvshows", text: "Séries" },
  ];

  return (
    <SelectionWrapper value={mediaSelected}>
      <select
        value={mediaSelected}
        onChange={handleChange}
        test={mediaSelected}
      >
        {mediaTypeOptions.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.text}
          </option>
        ))}
      </select>
    </SelectionWrapper>
  );
}

const SelectionWrapper = styled.div`
  width: 100vw;
  background-color: #f8edeb;
  position: relative;
  position: fixed;
  z-index: 3;
  top: 180px;
  display: flex;
  justify-content: center;
  height: 60px;
  select {
    width: ${(props) => (props.value === "" ? "auto" : "86px")};
    background-color: #f8edeb;
    border: 0px;
    font-size: 16px;
    font-weight: 600;
    right: ${(props) =>
      props.value === "" ? "calc(100vw / 2 - 62px)" : "calc(100vw / 2 - 44px)"};
  }

  select:focus {
    outline: none;
  }
`;
