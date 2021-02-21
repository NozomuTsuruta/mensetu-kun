import Router from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "../components/Form";
import { List } from "../components/List";
import { IStore } from "../redux";
import { createQuestion, deleteAllQuestion } from "../redux/questions/actions";
import { IQuestion } from "../redux/questions/types";

type IForm = Omit<IQuestion, "id">;

export default function Index() {
  const questions = useSelector((state: IStore) => state.questions);
  const methods = useForm();
  const dispatch = useDispatch();

  const submit = (data: IForm) => {
    if (data.text.trim().length < 8) {
      methods.setError("text", {
        type: "minLength",
        message: "８文字以上入力してください",
        shouldFocus: true,
      });
      return;
    }
    dispatch(createQuestion(data));
    methods.reset();
  };

  const disabled = questions.length === 0;

  return (
    <FormProvider {...methods}>
      <div className="flex mb-4">
        <button
          className={`button mr-4 ${disabled ? "disabled" : ""}`}
          disabled={disabled}
          onClick={() => Router.push("/start")}
        >
          開始
        </button>
        <button
          className={`button ${disabled ? "disabled" : ""}`}
          disabled={disabled}
          onClick={() => dispatch(deleteAllQuestion())}
        >
          全削除
        </button>
      </div>
      <Form submit={submit} />
      <List list={questions} />
    </FormProvider>
  );
}