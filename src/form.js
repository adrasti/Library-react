import { useContext } from "react";
import { useState } from "react";
import { LibraryContext } from "./App";
import { data } from "./demodata";

const Form = () => {
  const { dispatch } = useContext(LibraryContext);
  const [title, setTitle] = useState(""); //states that collect the form entries
  const [name, setName] = useState("");
  const [pageNum, setPageNum] = useState("");
  const [read, setRead] = useState(true);

  const handleSubmit = (e, dispatch) => {
    e.preventDefault();
    const bookobj = {
      title: title,
      authName: name,
      pageNum: pageNum,
      isRead: read,
      id: new Date().getTime().toString(),
    };
    dispatch({ type: "ADD", book: bookobj }); //add a new book
    document.querySelector(".libraryForm").classList.add("none");
  };
  return (
    <div className="libraryForm none">
      <form id="f" onSubmit={(e) => handleSubmit(e, dispatch)}>
        <div>
          <input
            type="text"
            id="title"
            name="title"
            placeholder=" "
            maxLength="34"
            required={true}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <label htmlFor="title">Book's title</label>
        </div>
        <div>
          <input
            type="text"
            id="aname"
            name="name"
            placeholder=" "
            maxLength="26"
            required={true}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <label htmlFor="aname">Author's name</label>
        </div>
        <div>
          <input
            type="number"
            id="number"
            name="number"
            placeholder=" "
            min="1"
            max="25000"
            required={true}
            value={pageNum}
            onChange={(e) => {
              setPageNum(e.target.value);
            }}
          />
          <label htmlFor="number">Number of pages</label>
          <div className="requirements">
            Please enter the number of pages (no more than 25000)
          </div>
        </div>
        <div id="r">
          <span>Have you read it?</span>
          <div>
            <div id="one">
              <input
                type="radio"
                id="r1"
                className="none"
                name="radio"
                value="Yes"
                checked={read && true}
                onChange={() => {
                  setRead(!read);
                }}
              />
              <label htmlFor="r1">Yes</label>
            </div>
            <div id="two">
              <input
                type="radio"
                id="r2"
                className="none"
                name="radio"
                value="No"
                checked={!read && true}
                onChange={() => {
                  setRead(!read);
                }}
              />
              <label htmlFor="r2">No</label>
            </div>
          </div>
        </div>
        <span>
          <div id="addbuttons">
            <button type="submit" id="a">
              Add
            </button>
            <button
              id="demo"
              type="button"
              onClick={() => {
                dispatch({ type: "DEMO", data: data }); //add demo books
              }}
            >
              Demo
            </button>
          </div>
          <button
            id="b"
            type="button"
            onClick={() => {
              document.querySelector(".libraryForm").classList.add("none"); //close the form
            }}
          >
            Close
          </button>
        </span>
      </form>
    </div>
  );
};

export default Form;
