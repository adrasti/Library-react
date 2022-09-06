import { LibraryContext } from "./App";
import { useContext } from "react";

export const Header = () => {
  const { dispatch } = useContext(LibraryContext);
  return (
    <div className="header">
      <div id="library">LIBRARY</div>
      <div id="functionality">
        <div>
          <span>List of books:</span>
          <button
            id="list"
            type="button"
            onClick={() => {
              dispatch({ type: "SHOWLIST" });
            }}
          ></button>
        </div>
        <div>
          <span>Add new books:</span>
          <button
            id="add"
            type="button"
            onClick={() => {
              document.querySelector(".libraryForm").classList.remove("none");
            }}
          ></button>
        </div>
      </div>
    </div>
  );
};
