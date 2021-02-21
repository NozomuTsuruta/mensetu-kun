import { ActionTypes, IQuestion, IQuestionAction } from "./types";

const initialState: IQuestion[] = [];

export const questionsReducer = (
  state: IQuestion[] = initialState,
  action: IQuestionAction
) => {
  switch (action.type) {
    case ActionTypes.CREATE_QUESTION:
      return [...state, action.payload];
    case ActionTypes.READ_QUESTIONS:
      return action.payload;
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
    default:
      return state;
  }
};
