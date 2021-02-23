import Router from "next/router";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "../components/Form";
import { List } from "../components/List";
import { IStore } from "../redux";
import { resetAnswers } from "../redux/answers/actions";
import { createQuestion, deleteAllQuestion } from "../redux/questions/actions";
import { IQuestion } from "../redux/questions/types";

type IForm = Omit<IQuestion, "id">;

export default function Index() {
  const questions = useSelector((state: IStore) => state.questions);
  const methods = useForm();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetAnswers());
  }, []);

  const submit = (data: IForm) => {
    dispatch(createQuestion({ text: data.text, second: 60 }));
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
      <Form mode="add" submit={submit} />
      <List list={questions} />
    </FormProvider>
  );
}
