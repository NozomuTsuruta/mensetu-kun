import { ActionTypes, IAnswer } from "./types";

export const setAnswer = (answer: IAnswer) => ({
  type: ActionTypes.SET_ANSWER,
  payload: answer,
});

export const resetAnswers = () => ({
  type: ActionTypes.RESET_ANSWERS,
});
