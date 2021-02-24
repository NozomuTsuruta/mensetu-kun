import Router from "next/router";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "../components/Form";
import { List } from "../components/List";
import { IStore } from "../redux";
import { readAnswers } from "../redux/answers/actions";
import { createQuestion, deleteAllQuestion } from "../redux/questions/actions";
import { IQuestion } from "../redux/questions/types";
import { frequentQuestions } from "../util";

type IForm = Omit<IQuestion, "id">;

export default function Index() {
  const [isFrequent, setIsFrequent] = useState(false);
  const questions = useSelector((state: IStore) => state.questions);
  const methods = useForm();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(readAnswers());
  }, []);
  const list = isFrequent
    ? frequentQuestions.filter(
        ({ text }) => !questions.some((question) => question.text === text)
      )
    : questions;

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
          className={`button mr-4 ${disabled ? "disabled" : ""}`}
          disabled={disabled}
          onClick={() => dispatch(deleteAllQuestion())}
        >
          全削除
        </button>
        <button
          className="button"
          onClick={() => setIsFrequent((prev) => !prev)}
        >
          {isFrequent ? "TOP" : "頻出"}
        </button>
      </div>
      {!isFrequent && <Form mode="add" submit={submit} />}
      <List list={list} isFrequent={isFrequent} />
    </FormProvider>
  );
}
