import { ActionTypes, IQuestion, IQuestionAction } from "./types";

const initialState: IQuestion[] = [
  {
    id: "1",
    text: "初めまして、本日の面接を担当させていただく、面接くんと申します。",
    second: 12,
  },
  {
    id: "2",
    text: "まずは、自己紹介をお願いします。",
    second: 60,
  },
  {
    id: "3",
    text: "弊社の志望理由を教えてください",
    second: 60,
  },
  {
    id: "4",
    text: "あなたの長所を教えてください",
    second: 60,
  },
  {
    id: "5",
    text: "あなたの短所を教えてください",
    second: 60,
  },
  {
    id: "6",
    text: "今までで一番頑張ったことを教えてください",
    second: 60,
  },
  {
    id: "7",
    text: "今までで一番苦労したことを教えてください",
    second: 60,
  },
  {
    id: "8",
    text: "自己PRをお願いします",
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
