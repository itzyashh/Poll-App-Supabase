interface Poll {
    id: string;
    question: string;
    options: string[];
  }

const polls: Poll[] = [
    {
      id: "1",
      question: "What is your favorite color?",
      options: ["Red", "Green", "Blue"],
    },
    {
      id: "2",
      question: "What is your favorite animal?",
      options: ["Dog", "Cat", "Bird"],
    },
    {
      id: "3",
      question: "What is your favorite food?",
      options: ["Pizza", "Burger", "Pasta"],
    },
  ];

export default polls;

export type { Poll };