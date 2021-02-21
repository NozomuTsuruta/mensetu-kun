import { FC, useState } from "react";
import { RiDeleteBinLine, RiEdit2Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { deleteQuestion, updateQustion } from "../redux/questions/actions";
import { IQuestion } from "../redux/questions/types";
import { Form } from "./Form";

type IProps = {
  id: string;
  text: string;
};

export const Item: FC<IProps> = ({ id, text }) => {
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const deleteItem = () => {
    if (confirm("質問を削除しますか？")) dispatch(deleteQuestion(id));
  };
  const submit = (data: Omit<IQuestion, "id">) => {
    dispatch(updateQustion(id, data));
  };

  return edit ? (
    <Form submit={submit} />
  ) : (
    <div className="flex justify-between group p-4">
      <h2 className="">{text}</h2>
      <div className="hidden group-hover:block">
        <RiEdit2Line onClick={() => setEdit(true)} />
        <RiDeleteBinLine onClick={deleteItem} />
      </div>
    </div>
  );
};
