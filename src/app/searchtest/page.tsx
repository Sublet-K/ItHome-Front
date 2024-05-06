"use client";

import React from "react";
import { SubletPostStore } from "@store/SubletPostStore";

const SearchButton = () => {
  const { post } = SubletPostStore();
  console.log(post);
  return (
    <div>
      <h1>test</h1>
      {post.map((post) => (
        <div>
          <div>{post.title}</div>
        </div>
      ))}
    </div>
  );
};

export default SearchButton;
