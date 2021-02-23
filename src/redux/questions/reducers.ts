import { ActionTypes, IQuestion, IQuestionAction } from "./types";

const initialState: IQuestion[] = [
  {
    id: "1",
    text: "初めまして、本日の面接を担当させていただく、面接くんと申します。",
    second: 8,
  },
  {
    id: "2",
    text: "まずは、自己紹介をお願いします。",
    second: 60,
  },
];

export const questionsReducer = (
  state: IQuestion[] = initialState,
  action: IQuestionAction
) => {
  switch (action.type) {
    case ActionTypes.CREATE_QUESTION:
      return [...state, action.payload];
    case ActionTypes.READ_QUESTIONS:
      return [...state, ...action.payload];
    case ActionTypes.UPDATE_QUESTION:
      return [
        ...state.map((question) => {
          if (question.id === action.payload.id) {
            return { ...question, ...action.payload };
          }
          return question;
        }),
      ];
    case ActionTypes.DELETE_QUESTION:
      return [...state.filter((question) => question.id !== action.payload)];
    case ActionTypes.DELETE_ALL_QUESTIONS:
      return initialState;
    default:
      return state;
  }
};
