import { Dispatch, FC, RefObject, SetStateAction } from "react";
import { useFormContext } from "react-hook-form";
import useOutsideClick from "../hooks/useOutsideClick";
import { IQuestion } from "../redux/questions/types";

type IProps = {
  submit: (data: Omit<IQuestion, "id">) => void;
  mode: "add" | "edit";
  text?: string;
  setEdit?: Dispatch<SetStateAction<boolean>>;
};

export const Form: FC<IProps> = ({ submit, mode, text, setEdit }) => {
  const {
    handleSubmit,
    register,
    formState: { isDirty },
    errors,
  } = useFormContext();
  const modeText = mode === "add" ? "追加" : "更新";
  const ref = useOutsideClick(() => {
    console.log(mode, isDirty, setEdit);
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
      className="inline-block mb-8"
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
