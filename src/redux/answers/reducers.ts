import { ActionTypes, IAnswer, IAnswerAction } from "./types";

const initialState: IAnswer[] = [];

export const answersReducer = (
  state: IAnswer[] = initialState,
  action: IAnswerAction
) => {
  switch (action.type) {
    case ActionTypes.ADD_ANSWER:
      if (state.some(({ id }) => id === action.payload.id)) {
        return state.map((el) => {
          if (el.id === action.payload.id) {
            return {
              id: el.id,
              question: el.question,
              answer: el.answer + action.payload.answer,
            };
          }
          return el;
        });
      }
      return [...state, action.payload];
    case ActionTypes.READ_ANSWERS:
      return initialState;
    case ActionTypes.UPDATE_ANSWER:
      return state.map((el) => {
        if (el.id === action.payload.id) {
          return {
            id: el.id,
            question: el.question,
            answer: action.payload.answer,
          };
        }
        return el;
      });
    default:
      return state;
  }
};
