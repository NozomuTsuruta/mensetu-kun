import { useSelector } from "react-redux";
import { IStore } from "../redux";

export default function Result() {
  const answers = useSelector((state: IStore) => state.answers);
  return (
    <div>
      <h1 className="text-3xl mb-4">面接結果</h1>
      {answers.map(({ id, answer, question }) => (
        <div key={id} className="mb-4 bg-white">
          <p>質問: {question}</p>
          <p>あなたの回答: {answer}</p>
        </div>
      ))}
    </div>
  );
}
