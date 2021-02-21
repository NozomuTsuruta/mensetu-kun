import { FC } from "react";
import { IQuestion } from "../redux/questions/types";

type IProps = {
  list: IQuestion[];
};

export const List: FC<IProps> = ({ list }) => {
  return (
    <ul>
      {list.map(({ id, text, time }) => (
        <li key={id}>
          <p>{text}</p>
          <p>{time}</p>
        </li>
      ))}
    </ul>
  );
};
