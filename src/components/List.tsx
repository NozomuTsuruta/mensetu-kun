import { FC } from "react";
import { IQuestion } from "../redux/questions/types";
import { Item } from "./Item";

type IProps = {
  list: IQuestion[];
};

export const List: FC<IProps> = ({ list }) => (
  <ul>
    {list.map(({ id, text }) => (
      <Item key={id} id={id} text={text} />
    ))}
  </ul>
);
