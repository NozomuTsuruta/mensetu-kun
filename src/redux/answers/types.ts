export type IAnswer = {
  id: string;
  question: string;
  answer: string;
};

export const ActionTypes = {
  SET_ANSWER: "SET_ANSWER",
  RESET_ANSWERS: "RESET_ANSWERS",
} as const;

export type IAnswerAction =
  | {
      type: typeof ActionTypes.SET_ANSWER;
      payload: IAnswer;
    }
  | {
      type: typeof ActionTypes.RESET_ANSWERS;
    };
