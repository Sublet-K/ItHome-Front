import React, { useState } from "react";
import styled from "styled-components";
import { useSearchKeyword } from "@core/Header/store/SearchKeywordStore";

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

export const SearchKeyword = ({
  placeholder = "검색 키워드를 입력하세요.",
}) => {
  const { searchKeyword, setSearchKeyword } = useSearchKeyword();

  const handleChange = (e: any) => {
    setSearchKeyword(e.target.value);
  };

  return (
    <SearchContainer>
      <Input
        type="text"
        placeholder={placeholder}
        value={searchKeyword}
        onChange={handleChange}
      />
    </SearchContainer>
  );
};
