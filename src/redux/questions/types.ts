export type IQuestion = {
  id: string;
  text: string;
};

export const ActionTypes = {
  CREATE_QUESTION: "CREATE_QUESTION",
  READ_QUESTIONS: "READ_QUESTIONS",
  UPDATE_QUESTION: "UPDATE_QUESTION",
  DELETE_QUESTION: "DELETE_QUESTION",
  DELETE_ALL_QUESTIONS: "DELETE_ALL_QUESTIONS",
} as const;

export type IQuestionAction =
  | { type: typeof ActionTypes.CREATE_QUESTION; payload: IQuestion }
  | { type: typeof ActionTypes.READ_QUESTIONS; payload: IQuestion[] }
  | {
      type: typeof ActionTypes.UPDATE_QUESTION;
      payload: { id: string; url?: string; date?: string; memo?: string };
    }
  | { type: typeof ActionTypes.DELETE_QUESTION; payload: string }
  | { type: typeof ActionTypes.DELETE_ALL_QUESTIONS };
