import { ActionTypes, IAnswer } from "./types";

export const addAnswer = (answer: IAnswer) => ({
  type: ActionTypes.ADD_ANSWER,
  payload: answer,
});

export const readAnswers = () => ({
  type: ActionTypes.READ_ANSWERS,
});

export const updateAnswer = (answer: IAnswer) => ({
  type: ActionTypes.UPDATE_ANSWER,
  payload: answer,
});
