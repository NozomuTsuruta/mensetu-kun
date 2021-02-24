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
  IoMdCheckboxOutline,
} from "react-icons/io";
import useSpeech from "../hooks/useSpeech";
import { Spinner } from "../components/Spinner";
import Router from "next/router";

export default function Start() {
  const [questionNum, setQuestionNum] = useState(0);
  const questions = useSelector((state: IStore) => state.questions);
  const answersLength = useSelector((state: IStore) => state.answers.length);
  const [loading, setLoading] = useState(true);
  const { pause, paused, resume, cancel, next, prev, count } = useSpeech(
    questions[questionNum],
    setQuestionNum,
    loading
  );

  setTimeout(() => {
    setLoading(false);
  }, 2000);

  return (
    <div>
      <p className="text-2xl">{count}</p>
      {loading && <Spinner />}
      <Screen />
      <div className="bg-black pb-4">
        <h2 className="text-2xl mb-4 text-white text-center">
          {questions.length > 0 && !loading && questions[questionNum].text}
        </h2>
      </div>
      <div className="flex justify-center border-2 p-4">
        <button
          className={`command mr-4 ${questionNum === 0 ? "disabled" : ""}`}
          onClick={prev}
          disabled={questionNum === 0}
        >
          <IoIosSkipBackward size={30} />
        </button>
        <button className="command mr-4" onClick={cancel}>
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
          className={`command mr-4 ${answersLength === 0 ? "disabled" : ""}`}
          onClick={() => Router.push("/result")}
          disabled={answersLength === 0}
        >
          <IoMdCheckboxOutline size={30} />
        </button>
        <button
          className={`command mr-4 ${
            questionNum + 1 >= questions.length ? "disabled" : ""
          }`}
          onClick={next}
          disabled={questionNum + 1 >= questions.length}
        >
          <IoIosSkipForward size={30} />
        </button>
      </div>
    </div>
  );
}
