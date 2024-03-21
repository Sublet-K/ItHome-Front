import { CSSProperties } from "react";

export const gridStyle: { [key: string]: CSSProperties } = {
  // styled-components로 하면 이리하고 저리해도 적용이 안되어서 그냥 style로 함.
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "auto",
  },
  inputContainer: {
    marginTop: "2rem",
  },
  infoType: {
    fontSize: "1.5em",
    fontWeight: "bold",
    marginBottom: "2rem",
  },
  inputList: {
    display: "grid",
    gridTemplateRows: "1fr ",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    fontSize: "1em",
  },
};
