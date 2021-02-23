import { ActionTypes, IAnswer } from "./types";

export const addAnswer = (answer: IAnswer) => ({
  type: ActionTypes.ADD_ANSWER,
  payload: answer,
});

export const readAnswers = () => ({
  type: ActionTypes.READ_ANSWERS,
});
