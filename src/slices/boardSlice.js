import { createSlice } from "@reduxjs/toolkit";

const boardSlice = createSlice({
  name: "board",
  initialState: [], // Initial state is an array of boards
  reducers: {
    addBoard: (state, action) => {
      const { newBoard } = action.payload;
      state.push(newBoard);
    },
    addList: (state, action) => {
      const { boardId, newList } = action.payload;
      const board = state.find((board) => board.id === boardId);
      if (board) {
        const updatedBoard = { ...board, lists: [...board.lists, newList] };
        const index = state.findIndex((board) => board.id === boardId);
        state[index] = updatedBoard;
      } else {
        // Create a new board if it doesn't exist
        const newBoard = {
          id: Date.now(),
          title: `Board ${state.length + 1}`,
          lists: [newList],
        };
        state.push(newBoard);
      }
    },
    addCard: (state, action) => {
      const { listId, newCard } = action.payload;
      state.forEach((board) => {
        board.lists.forEach((list) => {
          if (list.id === listId) {
            list.cards.push(newCard);
          }
        });
      });
    },
    setBoards: (state, action) => {
      const boards = action.payload;
      state.splice(0, state.length, ...boards); // Clear existing boards and add new ones

      // Update user-specific boards in Firestore
      // const user = auth.currentUser;
      // if (user) {
      //   const userDocRef = doc(db, "users", user.uid);
      //   updateDoc(userDocRef, { boards });
      // }
    },
  },
});

export const { addBoard, addList, addCard, setBoards } = boardSlice.actions;
export default boardSlice.reducer;
