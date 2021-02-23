export type IAnswer = {
  id: string;
  question: string;
  answer: string;
};

export const ActionTypes = {
  ADD_ANSWER: "ADD_ANSWER",
  READ_ANSWERS: "READ_ANSWERS",
  UPDATE_ANSWER: "UPDATE_ANSWER",
} as const;

export type IAnswerAction =
  | {
      type: typeof ActionTypes.ADD_ANSWER;
      payload: IAnswer;
    }
  | {
      type: typeof ActionTypes.READ_ANSWERS;
    }
  | {
      type: typeof ActionTypes.UPDATE_ANSWER;
      payload: IAnswer;
    };
