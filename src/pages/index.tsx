import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "../components/Form";
import { List } from "../components/List";
import { IStore } from "../redux";
import { createQuestion } from "../redux/questions/actions";
import { IQuestion } from "../redux/questions/types";
import Link from "next/link";

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
      <Form submit={submit} />
      <List list={questions} />
      <Link href="start">Start</Link>
    </FormProvider>
  );
}
