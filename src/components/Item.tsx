import { FC, useState } from "react";
import { RiAddFill, RiDeleteBinLine, RiEdit2Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import {
  createQuestion,
  deleteQuestion,
  updateQustion,
} from "../redux/questions/actions";
import { IQuestion } from "../redux/questions/types";
import { Form } from "./Form";

type IProps = {
  id: string;
  text: string;
  second: number;
  isFrequent: boolean;
};

export const Item: FC<IProps> = ({ id, text, second, isFrequent }) => {
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const deleteItem = () => {
    if (confirm("質問を削除しますか？")) {
      dispatch(deleteQuestion(id));
    }
  };
  const submit = (data: Omit<IQuestion, "id">) => {
    dispatch(updateQustion(id, data));
    setEdit(false);
  };
  const addItem = () => {
    dispatch(createQuestion({ text, second }));
  };

  return edit ? (
    <Form
      mode="edit"
      submit={submit}
      text={text}
      setEdit={setEdit}
      second={second}
    />
  ) : (
    <div className="group p-4 bg-white mb-4 w-3/4 min-w-68 lg:w-3/5">
      <h2 className="text-2xl">質問: {text}</h2>
      <div className="flex justify-between mt-4">
        <p className="mr-4">回答時間：{second}秒</p>
        {isFrequent ? (
          <button onClick={addItem}>
            <RiAddFill className="icon" size={25} />
          </button>
        ) : (
          <div>
            <button className="mr-4" onClick={() => setEdit(true)}>
              <RiEdit2Line className="icon" size={25} />
            </button>
            <button className="mr-4" onClick={deleteItem}>
              <RiDeleteBinLine className="icon" size={25} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
