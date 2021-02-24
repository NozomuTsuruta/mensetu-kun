import { Dispatch, FC, RefObject, SetStateAction } from "react";
import { useFormContext } from "react-hook-form";
import useOutsideClick from "../hooks/useOutsideClick";
import { IQuestion } from "../redux/questions/types";

type IProps = {
  submit: (data: Omit<IQuestion, "id">) => void;
  mode: "add" | "edit";
  text?: string;
  second?: number;
  setEdit?: Dispatch<SetStateAction<boolean>>;
};

export const Form: FC<IProps> = ({ submit, mode, text, second, setEdit }) => {
  const {
    handleSubmit,
    register,
    formState: { isDirty },
    errors,
  } = useFormContext();
  const modeText = mode === "add" ? "追加" : "更新";
  const ref = useOutsideClick(() => {
    if (mode === "edit" && !!setEdit) {
      if (isDirty) {
        if (confirm("変更内容を保存せずに終了しますか？")) {
          setEdit(false);
        }
      } else {
        setEdit(false);
      }
    }
  });

  return (
    <form
      className="mb-8 form flex items-center"
      onSubmit={handleSubmit(submit)}
      ref={ref as RefObject<HTMLFormElement>}
    >
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
          required: "8文字以上入力してください",
        })}
        placeholder={errors.text ? errors.text.message : `質問を${modeText}`}
        defaultValue={text}
      />
      <input
        type="number"
        name="second"
        className={`h-10 pl-2 border-l-2 border-gray ${
          errors.second ? "bg-red-300 border-red-700 border-2" : ""
        }`}
        ref={register({
          min: {
            value: 10,
            message: "10秒以上",
          },
          required: "10秒以上",
        })}
        placeholder={errors.second ? errors.second.message : "秒数"}
        defaultValue={second || 60}
      />
      <button type="submit" className="button">
        {modeText}
      </button>
    </form>
  );
};
