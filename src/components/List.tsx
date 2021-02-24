import { FC } from "react";
import { IQuestion } from "../redux/questions/types";
import { Item } from "./Item";

type IProps = {
  list: IQuestion[];
  isFrequent: boolean;
};

export const List: FC<IProps> = ({ list, isFrequent }) => (
  <ul className="mb-8">
    {list.map(({ id, text, second }) => (
      <Item
        key={id}
        id={id}
        text={text}
        second={second}
        isFrequent={isFrequent}
      />
    ))}
  </ul>
);
