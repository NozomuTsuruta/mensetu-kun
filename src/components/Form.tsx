import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { IQuestion } from "../redux/questions/types";

type IProps = {
  submit: (data: Omit<IQuestion, "id">) => void;
};

export const Form: FC<IProps> = ({ submit }) => {
  const { handleSubmit, register } = useFormContext();
  return (
    <form className="flex" onSubmit={handleSubmit(submit)}>
      <input type="text" name="text" ref={register} />
      <input type="number" name="time" ref={register} />
      <button type="submit">追加</button>
    </form>
  );
};
