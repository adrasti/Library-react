import React, { useReducer, useEffect } from "react";
import "./App.css";
import Form from "./form.js";
import { Books } from "./Books";
import { reducer } from "./reducer";
import { Header } from "./header";
import { Table } from "./table.js";

export const LibraryContext = React.createContext();

const getLocalStorage = () => {
  try {
    let b = localStorage.getItem("books");
    if (b && b !== "undefined") {
      return JSON.parse(localStorage.getItem("books"));
    } else {
      return {
        shelfCount: 0,
        bookNum: 0,
        books: undefined,
      };
    }
  } catch {
    return {
      shelfCount: 0,
      bookNum: 0,
      books: undefined,
    };
  }
};

const defaultState = {
  listOpen: false,
  shelfCount: getLocalStorage().shelfCount,
  bookNum: getLocalStorage().bookNum,
  books: getLocalStorage().books,
};

function App() {
  //
  const [state, dispatch] = useReducer(reducer, defaultState); //reducer used to perform any updates to the state
  //(add, delete, edit, sort, show/hide list, add demo books)
  useEffect(() => {
    try {
      localStorage.setItem("books", JSON.stringify(state)); //any updates to the list of books are saved in the local storage
    } catch {}
  }, [state.books]);
  return (
    <LibraryContext.Provider value={{ dispatch, state }}>
      {state.listOpen ? (
        <Table /> //show the list of books
      ) : (
        <>
          <Header />
          <main>
            {state.books ? <Books /> : <div className="shelf"></div>}
          </main>{" "}
          {/* display the books in the shelves */}
          <Form />
        </>
      )}
    </LibraryContext.Provider>
  );
}

export default App;
