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
    editList: (state, action) => {
      const { boardId, listId, editedList } = action.payload;
      state.forEach((board) => {
        if (board.id === boardId) {
          board.lists = board.lists.map((list) =>
            list.id === listId ? { ...list, ...editedList } : list
          );
        }
      });
    },
    deleteList: (state, action) => {
      const { boardId, listId } = action.payload;
      state.forEach((board) => {
        if (board.id === boardId) {
          board.lists = board.lists.filter((list) => list.id !== listId);
        }
      });
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
    editCard: (state, action) => {
      const { listId, cardId, editedCard } = action.payload;
      state.forEach((board) => {
        board.lists.forEach((list) => {
          if (list.id === listId) {
            list.cards = list.cards.map((card) =>
              card.id === cardId ? { ...card, ...editedCard } : card
            );
          }
        });
      });
    },
    deleteCard: (state, action) => {
      const { listId, cardId } = action.payload;
      state.forEach((board) => {
        board.lists.forEach((list) => {
          if (list.id === listId) {
            list.cards = list.cards.filter((card) => card.id !== cardId);
          }
        });
      });
    },
  },
});

export const {
  addBoard,
  addList,
  editList,
  deleteList,
  addCard,
  editCard,
  deleteCard,
} = boardSlice.actions;
export default boardSlice.reducer;
