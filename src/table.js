import { LibraryContext } from "./App";
import { useContext } from "react";
import { TableItem } from "./tableitem";
import React, { useReducer } from "react";

const defaultState = {
  id: true,
  title: true,
  author: true,
  number: true,
  status: true,
};

const reducer = (state, action) => {
  /* whenever the table is sorted by one of the keys, the next time
it is sorted by the same key, it happens in a different order (asc / desc)
meanwhile, the order for the rest of the keys is reset to asc */
  if (action.type === "TITLE") {
    return {
      ...defaultState,
      title: !state.title,
    };
  }
  if (action.type === "ID") {
    return {
      ...defaultState,
      id: !state.id,
    };
  }
  if (action.type === "AUTHOR") {
    return {
      ...defaultState,
      author: !state.author,
    };
  }
  if (action.type === "NUMBER") {
    return {
      ...defaultState,
      number: !state.number,
    };
  }
  if (action.type === "STATUS") {
    return {
      ...defaultState,
      status: !state.status,
    };
  }
};

export const Table = () => {
  const [stateSort, dispatchSort] = useReducer(reducer, defaultState);
  const { dispatch, state } = useContext(LibraryContext);
  return (
    <div id="table">
      <div
        id="close"
        onClick={() => {
          dispatch({ type: "HIDELIST" });
        }}
      ></div>
      <table id="bookslist">
        <thead>
          {" "}
          {/*clickable headers that sort the table */}
          <tr>
            <th
              onClick={() => {
                stateSort.id
                  ? dispatch({ type: "SORT", key: "id", asc: true })
                  : dispatch({ type: "SORT", key: "id", asc: false });
                dispatchSort({ type: "ID" });
              }}
            >
              Id
            </th>
            <th
              onClick={() => {
                stateSort.title
                  ? dispatch({ type: "SORT", key: "title", asc: true })
                  : dispatch({ type: "SORT", key: "title", asc: false });
                dispatchSort({ type: "TITLE" });
              }}
            >
              Title
            </th>
            <th
              onClick={() => {
                stateSort.author
                  ? dispatch({ type: "SORT", key: "author", asc: true })
                  : dispatch({ type: "SORT", key: "author", asc: false });
                dispatchSort({ type: "AUTHOR" });
              }}
            >
              Author
            </th>
            <th
              onClick={() => {
                stateSort.number
                  ? dispatch({ type: "SORT", key: "number", asc: true })
                  : dispatch({ type: "SORT", key: "number", asc: false });
                dispatchSort({ type: "NUMBER" });
              }}
            >
              Number of pages
            </th>
            <th
              onClick={() => {
                stateSort.status
                  ? dispatch({ type: "SORT", key: "status", asc: true })
                  : dispatch({ type: "SORT", key: "status", asc: false });
                dispatchSort({ type: "STATUS" });
              }}
            >
              Status
            </th>
          </tr>
        </thead>
        {state.books
          ? state.books.map((shelf) => {
              return <TableItem shelf={shelf} key={shelf[0].id} />;
            })
          : ""}
      </table>
    </div>
  );
};
