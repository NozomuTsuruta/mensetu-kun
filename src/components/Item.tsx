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
    setEdit(false);
  };

  return edit ? (
    <Form mode="edit" submit={submit} text={text} setEdit={setEdit} />
  ) : (
    <div className="group p-4 bg-white mb-4">
      <h2 className="text-2xl">Q: {text}</h2>
      <div className="flex mt-4">
        <RiEdit2Line className="icon" onClick={() => setEdit(true)} size={25} />
        <RiDeleteBinLine className="icon" onClick={deleteItem} size={25} />
      </div>
    </div>
  );
};
