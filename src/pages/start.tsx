import Router from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Screen } from "../components/Screen";
import { IStore } from "../redux";
import {
  IoIosSkipForward,
  IoIosSkipBackward,
  IoMdPause,
  IoMdPlay,
  IoMdSquare,
} from "react-icons/io";
import useSpeech from "../hooks/useSpeech";

export default function Start() {
  const [questionNum, setQuestionNum] = useState(0);
  const questions = useSelector((state: IStore) => state.questions);
  const { pause, paused, resume } = useSpeech(
    questions[questionNum],
    setQuestionNum
  );

  return (
    <div>
      <Screen />
      <div className="bg-black pb-4">
        <h2 className="text-2xl mb-4 text-white text-center">
          {questions.length > 0 && questions[questionNum].text}
        </h2>
      </div>
      <div className="flex justify-center border-2 p-4">
        <button
          className={`command mr-4 ${questionNum === 0 ? "disabled" : ""}`}
          onClick={() => setQuestionNum((prev) => prev - 1)}
          disabled={questionNum === 0}
        >
          <IoIosSkipBackward size={30} />
        </button>
        <button className="command mr-4" onClick={() => Router.push("/")}>
          <IoMdSquare size={30} />
        </button>
        <button className="command mr-4">
          {paused ? (
            <IoMdPlay size={30} onClick={resume} />
          ) : (
            <IoMdPause size={30} onClick={pause} />
          )}
        </button>
        <button
          className={`command mr-4 ${
            questionNum + 1 >= questions.length ? "disabled" : ""
          }`}
          onClick={() => setQuestionNum((prev) => prev + 1)}
          disabled={questionNum + 1 >= questions.length}
        >
          <IoIosSkipForward size={30} />
        </button>
      </div>
    </div>
  );
}
