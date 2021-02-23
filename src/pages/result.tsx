import Router from "next/router";
import { useSelector } from "react-redux";
import { IStore } from "../redux";

export default function Result() {
  const answers = useSelector((state: IStore) => state.answers);
  const download = () => {
    const fileName = "result.json";
    const data = new Blob([JSON.stringify(answers)], { type: "text/json" });
    const jsonURL = window.URL.createObjectURL(data);
    const link = document.createElement("a");
    document.body.appendChild(link);
    link.href = jsonURL;
    link.setAttribute("download", fileName);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <h1 className="text-3xl mb-4">面接結果</h1>
      {answers.map(({ id, answer, question }) => (
        <div key={id} className="mb-4 bg-white">
          <p>質問: {question}</p>
          <p>あなたの回答: {answer}</p>
        </div>
      ))}
      <button className="button w-auto mr-4" onClick={download}>
        結果をダウンロード
      </button>
      <button className="button" onClick={() => Router.push("/")}>
        TOPへ
      </button>
    </div>
  );
}
