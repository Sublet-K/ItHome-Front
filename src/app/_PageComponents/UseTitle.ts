import { useEffect, useState, useRef } from "react";

export const useTitle = (initialTitle: string) => {
  /* 사용법
  탭 이름 변경하는 거임. loading 전까지는 loading 탭으로 주고
  만약 loading이 끝나면 타이틀로 바꾸는 거임
  */
  const [title, setTitle] = useState(initialTitle);
  const updateTitle = () => {
    const htmlTitle = document.querySelector("title");
    if (!htmlTitle) {
      console.error("ERROR: htmlTitle document is NULL");
      throw Error();
    }
    htmlTitle.innerText = title;
  };
  useEffect(updateTitle, [title]);
  return setTitle;
};
