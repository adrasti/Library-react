const addLeadingZeroes = (num) => {
  let i = String(num).length;
  let s = "";
  for (let j = 0; j < 2 - i; j++) {
    s = s + "0";
  }
  return s + String(num);
};

export const reducer = (state, action) => {
  try {
    if (action.type === "ADD") {
      let newBooks = [];
      let newCount = state.bookNum;
      let newShelfCount = state.shelfCount;
      if (state.books) {
        for (let i = 0; i < state.shelfCount; i++) {
          newBooks.push([...state.books[i]]);
        }
      }
      if (Math.ceil((state.bookNum + 1) / 12) > state.shelfCount) {
        newCount++;
        newShelfCount++;
        newBooks.push([action.book]);
      } else {
        newBooks[newBooks.length - 1].push(action.book);
        newCount++;
      }
      return {
        ...state,
        books: newBooks,
        bookNum: newCount,
        shelfCount: newShelfCount,
      };
    } else if (action.type === "REMOVE") {
      let temp = [[]];
      let newShelfCount = state.shelfCount;
      let newCount = state.bookNum - 1;
      let j = 0;
      let k = 0;
      for (let i = 0; i < state.shelfCount; i++) {
        state.books[i].forEach((e) => {
          if (e.id !== action.id) {
            if (j > 11) {
              temp.push([e]);
              j = 0;
              k++;
            } else {
              temp[k].push(e);
            }
            j++;
          }
        });
      }

      if (newCount % 12 === 0) {
        newShelfCount = state.shelfCount - 1;
      }
      if (newCount === 0) {
        temp = undefined;
      }
      return {
        ...state,
        books: temp,
        bookNum: newCount,
        shelfCount: newShelfCount,
      };
    } else if (action.type === "EDIT") {
      const newBooks = [];
      state.books.forEach((e) => {
        let temp = [];
        e.forEach((book) => {
          if (book.id === action.bookId) {
            temp.push({ ...book, isRead: !book.isRead });
          } else temp.push(book);
        });
        newBooks.push(temp);
      });
      return {
        ...state,
        books: newBooks,
      };
    } else if (action.type === "SHOWLIST") {
      return {
        ...state,
        listOpen: true,
      };
    } else if (action.type === "HIDELIST") {
      return {
        ...state,
        listOpen: false,
      };
    } else if (action.type === "SORT") {
      const newBooks = [];
      const newStateBooks = [[]];
      state.books.forEach((e) => {
        e.forEach((book) => {
          newBooks.push(book);
        });
      });
      let temp;
      if (action.key === "id") {
        if (action.asc) {
          for (let i = 0; i < state.bookNum - 1; i++) {
            for (let j = 0; j < state.bookNum - 1 - i; j++) {
              if (Number(newBooks[j].id) > Number(newBooks[j + 1].id)) {
                temp = newBooks[j];
                newBooks[j] = newBooks[j + 1];
                newBooks[j + 1] = temp;
              }
            }
          }
        } else {
          for (let i = 0; i < state.bookNum - 1; i++) {
            for (let j = 0; j < state.bookNum - 1 - i; j++) {
              if (Number(newBooks[j].id) < Number(newBooks[j + 1].id)) {
                temp = newBooks[j];
                newBooks[j] = newBooks[j + 1];
                newBooks[j + 1] = temp;
              }
            }
          }
        }
      } else if (action.key === "title") {
        if (action.asc) {
          for (let i = 0; i < state.bookNum - 1; i++) {
            for (let j = 0; j < state.bookNum - 1 - i; j++) {
              if (
                newBooks[j].title.toLowerCase() >
                newBooks[j + 1].title.toLowerCase()
              ) {
                temp = newBooks[j];
                newBooks[j] = newBooks[j + 1];
                newBooks[j + 1] = temp;
              }
            }
          }
        } else {
          for (let i = 0; i < state.bookNum - 1; i++) {
            for (let j = 0; j < state.bookNum - 1 - i; j++) {
              if (
                newBooks[j].title.toLowerCase() <
                newBooks[j + 1].title.toLowerCase()
              ) {
                temp = newBooks[j];
                newBooks[j] = newBooks[j + 1];
                newBooks[j + 1] = temp;
              }
            }
          }
        }
      } else if (action.key === "author") {
        if (action.asc) {
          for (let i = 0; i < state.bookNum - 1; i++) {
            for (let j = 0; j < state.bookNum - 1 - i; j++) {
              if (
                newBooks[j].authName.toLowerCase() >
                newBooks[j + 1].authName.toLowerCase()
              ) {
                temp = newBooks[j];
                newBooks[j] = newBooks[j + 1];
                newBooks[j + 1] = temp;
              }
            }
          }
        } else {
          for (let i = 0; i < state.bookNum - 1; i++) {
            for (let j = 0; j < state.bookNum - 1 - i; j++) {
              if (
                newBooks[j].authName.toLowerCase() <
                newBooks[j + 1].authName.toLowerCase()
              ) {
                temp = newBooks[j];
                newBooks[j] = newBooks[j + 1];
                newBooks[j + 1] = temp;
              }
            }
          }
        }
      } else if (action.key === "number") {
        if (action.asc) {
          for (let i = 0; i < state.bookNum - 1; i++) {
            for (let j = 0; j < state.bookNum - 1 - i; j++) {
              if (
                Number(newBooks[j].pageNum) > Number(newBooks[j + 1].pageNum)
              ) {
                temp = newBooks[j];
                newBooks[j] = newBooks[j + 1];
                newBooks[j + 1] = temp;
              }
            }
          }
        } else {
          for (let i = 0; i < state.bookNum - 1; i++) {
            for (let j = 0; j < state.bookNum - 1 - i; j++) {
              if (
                Number(newBooks[j].pageNum) < Number(newBooks[j + 1].pageNum)
              ) {
                temp = newBooks[j];
                newBooks[j] = newBooks[j + 1];
                newBooks[j + 1] = temp;
              }
            }
          }
        }
      } else if (action.key === "status") {
        if (action.asc) {
          for (let i = 0; i < state.bookNum - 1; i++) {
            for (let j = 0; j < state.bookNum - 1 - i; j++) {
              if (newBooks[j].isRead > newBooks[j + 1].isRead) {
                temp = newBooks[j];
                newBooks[j] = newBooks[j + 1];
                newBooks[j + 1] = temp;
              }
            }
          }
        } else {
          for (let i = 0; i < state.bookNum - 1; i++) {
            for (let j = 0; j < state.bookNum - 1 - i; j++) {
              if (newBooks[j].isRead < newBooks[j + 1].isRead) {
                temp = newBooks[j];
                newBooks[j] = newBooks[j + 1];
                newBooks[j + 1] = temp;
              }
            }
          }
        }
      }

      let j = 0;
      let k = 0;
      for (let i = 0; i < state.bookNum; i++) {
        if (j > 11) {
          newStateBooks.push([newBooks[i]]);
          j = 0;
          k++;
        } else {
          newStateBooks[k].push(newBooks[i]);
        }
        j++;
      }
      return {
        ...state,
        books: newStateBooks,
      };
    } else if (action.type === "DEMO") {
      const newBooks = [];
      let newShelfCount = state.shelfCount - 1;
      let k = 1;
      if (state.books) {
        state.books.forEach((e) => {
          let temp = [];
          e.forEach((book) => {
            temp.push(book);
          });
          newBooks.push(temp);
        });
      } else {
        newBooks.push([]);
        newShelfCount++;
      }
      let newBookNum = state.bookNum;
      let j = newBookNum - newShelfCount * 12;
      action.data.forEach((e) => {
        if (j > 11) {
          newBooks.push([
            {
              ...e,
              id:
                new Date().getTime().toString().slice(0, -2) +
                addLeadingZeroes(k),
            },
          ]);
          j = 0;
          newShelfCount++;
        } else {
          newBooks[newShelfCount].push({
            ...e,
            id:
              new Date().getTime().toString().slice(0, -2) +
              addLeadingZeroes(k),
          });
        }
        j++;
        newBookNum++;
        k++;
      });
      return {
        ...state,
        bookNum: newBookNum,
        shelfCount: newShelfCount + 1,
        books: newBooks,
      };
    }
  } catch {
    return {
      listOpen: false,
      shelfCount: 0,
      bookNum: 0,
      books: undefined,
    };
  }
};
