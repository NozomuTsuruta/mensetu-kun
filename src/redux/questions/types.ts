export type IQuestion = {
  id: string;
  text: string;
  time: number;
};

export const ActionTypes = {
  CREATE_QUESTION: "CREATE_QUESTION",
  READ_QUESTIONS: "READ_QUESTIONS",
  UPDATE_QUESTION: "UPDATE_QUESTION",
  DELETE_QUESTION: "DELETE_QUESTION",
} as const;

export type IQuestionAction =
  | { type: typeof ActionTypes.CREATE_QUESTION; payload: IQuestion }
  | { type: typeof ActionTypes.READ_QUESTIONS; payload: IQuestion[] }
  | {
      type: typeof ActionTypes.UPDATE_QUESTION;
      payload: { id: string; url?: string; date?: string; memo?: string };
    }
  | { type: typeof ActionTypes.DELETE_QUESTION; payload: string };
