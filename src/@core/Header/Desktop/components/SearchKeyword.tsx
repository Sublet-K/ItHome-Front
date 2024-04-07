import React, { useState } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background: #f5f5f5;
  padding: 0.5rem;
  border-radius: 2rem;
  width: 100%;
  max-width: 500px;
`;

const Input = styled.input`
  border: none;
  background: transparent;
  outline: none;
  padding: 0.5rem;
  width: 100%;
`;

const StyledSearchIcon = styled(SearchIcon)`
  color: #606060;
  width: 24px;
`;

export const SearchKeyword = ({
  placeholder = "검색 키워드를 입력하세요.",
}) => {
  const [query, setQuery] = useState("");

  const handleChange = (e: any) => {
    setQuery(e.target.value);
  };

  return (
    <SearchContainer>
      {/*<StyledSearchIcon />*/}
      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
      />
    </SearchContainer>
  );
};
