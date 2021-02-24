import { useSelector } from "react-redux";
import { Item } from "../components/Item";
import { IStore } from "../redux";
import { frequentQuestions } from "../util";

export default function Frequent() {
  const questions = useSelector((state: IStore) => state.questions);
  const list = frequentQuestions.filter(
    ({ text }) => !questions.some((question) => question.text === text)
  );
  return (
    <div>
      {list.map(({ id, text }) => (
        <Item key={id} id={id} text={text} />
      ))}
    </div>
  );
}
