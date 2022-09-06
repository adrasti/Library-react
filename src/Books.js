import { LibraryContext } from "./App";
import { useContext } from "react";
import { Book } from "./book";

export const Books = () => {
  const { state } = useContext(LibraryContext);
  return (
    <>
      {state.books.map((shelf) => {
        return (
          <div key={shelf[0].id} className="shelf">
            {" "}
            {/* a shelf's key is id of its first book */}
            <div className="grid">
              <Book shelf={shelf} />
            </div>
          </div>
        );
      })}
    </>
  );
};
