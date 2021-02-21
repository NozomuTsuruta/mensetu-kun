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
    dispatch(createQuestion(data));
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <button
        className={`button ${questions.length === 0 ? "disabled" : ""}`}
        onClick={() => dispatch(deleteAllQuestion())}
      >
        全削除
      </button>
      <Form submit={submit} />
      <List list={questions} />
      <button
        className={`button ${questions.length === 0 ? "disabled" : ""}`}
        onClick={() => Router.push("/start")}
      >
        開始
      </button>
    </FormProvider>
  );
}
