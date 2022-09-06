import { LibraryContext } from "./App";
import { useContext } from "react";

export const Book = ({ shelf }) => {
  {
    const { dispatch } = useContext(LibraryContext);
    return (
      <>
        {shelf.map((e) => {
          const { title, authName, pageNum, isRead, id } = e;
          return (
            <div key={id} className="content">
              <div className="text">
                <div className="info">
                  <span className="tit">"{title}"</span>
                  <span className="author">By: {authName}</span>
                  <span className="pages">{pageNum} pages</span>
                </div>
                <div className="buttons">
                  <button
                    className="del"
                    type="button"
                    onClick={() => {
                      dispatch({ type: "REMOVE", id: id }); //delete the book from the list (done by looking for the right id)
                    }}
                  ></button>
                  <button
                    className={isRead ? "read" : "unread"}
                    onClick={() => {
                      dispatch({ type: "EDIT", bookId: id }); //edit the books' status (done by looking for the right id)
                    }}
                  >
                    {isRead ? "read" : "unread"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        ;
      </>
    );
  }
};
