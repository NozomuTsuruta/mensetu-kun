import { FC } from "react";
import { IQuestion } from "../redux/questions/types";
import { Item } from "./Item";

type IProps = {
  list: IQuestion[];
  isFrequent: boolean;
};

export const List: FC<IProps> = ({ list, isFrequent }) => (
  <ul className="pb-8">
    {list.length > 0 ? (
      list.map(({ id, text, second }) => (
        <Item
          key={id}
          id={id}
          text={text}
          second={second}
          isFrequent={isFrequent}
        />
      ))
    ) : (
      <h1 className="text-2xl">質問がありません</h1>
    )}
  </ul>
);
