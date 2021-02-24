import { FC, RefObject, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import useOutsideClick from "../hooks/useOutsideClick";
import { updateAnswer } from "../redux/answers/actions";
import { IAnswer } from "../redux/answers/types";

export const ResultItem: FC<IAnswer> = ({ question, id, answer }) => {
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<{ answer: string }>();
  const ref = useOutsideClick(() => {
    setEdit(false);
  });
  const submit = (data: { answer: string }) => {
    dispatch(updateAnswer({ question, answer: data.answer, id }));
  };

  return (
    <form
      className="mb-4 bg-white"
      onSubmit={handleSubmit(submit)}
      ref={ref as RefObject<HTMLFormElement>}
    >
      <p>質問: {question}</p>
      {edit ? (
        <input type="text" name="answer" defaultValue={answer} ref={register} />
      ) : (
        <p>あなたの回答: {answer}</p>
      )}

      {edit ? (
        <button type="submit" onClick={() => setEdit(false)}>
          変更
        </button>
      ) : (
        <button onClick={() => setEdit(true)}>編集</button>
      )}
    </form>
  );
};
