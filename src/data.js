const sampleData = [
  {
    id: Date.now(),
    title: "Sample Board 1",
    lists: [
      {
        id: 101,
        title: "To Do",
        cards: [
          { id: 1001, title: "Task 1" },
          { id: 1002, title: "Task 2" },
        ],
      },
      {
        id: 102,
        title: "In Progress",
        cards: [{ id: 1003, title: "Task 3" }],
      },
      {
        id: 103,
        title: "Done",
        cards: [{ id: 1004, title: "Task 4" }],
      },
    ],
  },
  {
    id: Date.now() + 1,
    title: "Sample Board 2",
    lists: [
      {
        id: 101,
        title: "To Do",
        cards: [
          { id: 1001, title: "Task 1" },
          { id: 1002, title: "Task 2" },
        ],
      },
      {
        id: 102,
        title: "In Progress",
        cards: [{ id: 1003, title: "Task 3" }],
      },
      {
        id: 103,
        title: "Done",
        cards: [{ id: 1004, title: "Task 4" }],
      },
    ],
  },
  {
    id: Date.now() + 2,
    title: "Sample Board 3",
    lists: [
      {
        id: 101,
        title: "To Do",
        cards: [
          { id: 1001, title: "Task 1" },
          { id: 1002, title: "Task 2" },
        ],
      },
      {
        id: 102,
        title: "In Progress",
        cards: [{ id: 1003, title: "Task 3" }],
      },
      {
        id: 103,
        title: "Done",
        cards: [{ id: 1004, title: "Task 4" }],
      },
    ],
  },
];

export default sampleData;
