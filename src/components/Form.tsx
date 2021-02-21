import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { IQuestion } from "../redux/questions/types";

type IProps = {
  submit: (data: Omit<IQuestion, "id">) => void;
  mode: "add" | "edit";
  text?: string;
};

export const Form: FC<IProps> = ({ submit, mode, text }) => {
  const {
    handleSubmit,
    register,
    formState: { isDirty },
    errors,
  } = useFormContext();
  const modeText = mode === "add" ? "追加" : "更新";

  return (
    <form className="flex mb-4" onSubmit={handleSubmit(submit)}>
      <input
        type="text"
        name="text"
        className={`input ${
          errors.text ? "bg-red-300 border-red-700 border-2" : ""
        }`}
        ref={register({
          minLength: {
            value: 8,
            message: "8文字以上入力してください",
          },
        })}
        placeholder={errors.text ? errors.text.message : `質問を${modeText}`}
        defaultValue={text || ""}
      />
      <button
        type="submit"
        disabled={!isDirty || errors.text}
        className={`button ${!isDirty || errors.text ? "disabled" : ""}`}
      >
        {modeText}
      </button>
    </form>
  );
};
