import styled from "styled-components";

export const Container = styled.div`
  border-bottom: 1px solid gray;
  margin-bottom: 0.5em;
`;

export const HeaderContainer = styled.nav`
  display: flex;
  flex-direction: space-between;
  align-items: center;
  margin-left: 10rem;
  margin-right: 10rem;
`;

export const LogoContainer = styled.div`
  display: flex;
  flex: 1;
`;

export const LogoIcon = styled.img`
  width: 4em;
  height: 100%;
  justify-content: left;
`;

export const SearchBoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 0 0.5em 0;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #000000;
  border-radius: 5px;
  padding: 1em;
  font-size: 1.3em;
  flex: 2;
`;

export const SearchByKeywordContainer = styled.div`
  display: flex;
  flex: 1;
`;

export const SearchByKeyword = styled.span`
  margin-right: 0.5em;
`;

export const SearchKeywordBig = styled.div`
  border: 0px;
  font-weight: bold;
`;

export const SearchByKeywordInput = styled.div`
  display: flex;
  flex: 1;
  border: 1px;
`;

export const SearchKeywordDescription = styled.div`
  font-size: 0.6em;
  text-align: left;
`;

export const SearchIconStyle = styled.button`
  font-weight: bold;
  color: rgba(0, 0, 0, 0.9);
  font-size: 1em;
`;

export const RightNavigation = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
  flex: 1;
`;

export const Favorite = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 1em;
  color: rgba(0, 0, 0, 1);
`;

export const FavoriteCount = styled.div`
  font-size: 0.8em;
`;

export const Profile = styled.div`
  color: rgba(0, 0, 0, 1);
  margin-left: 1.5em;
`;

/*
  const styles: { [key: string]: CSSProperties } = {
    container: {
      borderBottom: "1px solid gray",
      marginBottom: "0.5em",
    },
    headerContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    logoContainer: {
      display: "flex",
      flex: 1,
    },
    logoIcon: {
      width: "4em",
      height: "100%",
      color: "rgba(0, 0, 0, 1)",
      justifyContent: "left",
    },
    searchBoxContainer: {
      display: "flex",
      flexDirection: "row",
      margin: "0 0 0.5em 0",
      justifyContent: "space-between",
      alignItems: "center",
      border: "1px solid #000000",
      borderRadius: "5px",
      padding: "1em",
      fontSize: "1.3em",
      flex: 2,
    },
    searchByKeywordContainer: {
      display: "flex",
      flex: 1,
    },
    serachByKeyword: {
      marginRight: "0.5em",
    },
    searchKeywordBig: {
      border: "0px",
      fontWeight: "bold",
    },
    serachByKeywordInput: {
      display: "flex",
      flex: 1,
      border: "1px",
    },
    searchKeyworddescription: {
      fontSize: "0.6em",
      textAlign: "left",
    },
    searchIcon: {
      fontWeight: "bold",
      backgroundColor: "rgba(0, 0, 0, 0.9)",
      color: "white",
      fontSize: "1em",
    },
    rightNavigation: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "right",
      flex: 1,
    },
    favorite: {
      display: "flex",
      flexDirection: "column",
      marginRight: "1em",
      color: "rgba(0, 0, 0, 1)",
    },
    favoriteCount: {
      fontSize: "0.8em",
    },
    profile: {
      color: "rgba(0, 0, 0, 1)",
    },
  };
*/
