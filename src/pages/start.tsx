import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IStore } from "../redux";

export default function Start() {
  const [questionNum, setQuestionNum] = useState(0);
  const questions = useSelector((state: IStore) => state.questions);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance();
    const voices = synth.getVoices();
    utter.voice = voices[0]; // 0, 58
    utter.lang = "ja-JP";
    utter.pitch = 0;
    utter.text = questions[questionNum].text;
    synth.speak(utter);
    const timer = setTimeout(() => {
      if (questionNum + 1 >= questions.length) {
        return;
      }
      setQuestionNum((prev) => prev + 1);
    }, 60000);
    return () => {
      clearTimeout(timer);
    };
  }, [questionNum, questions]);

  return (
    <div>
      {questions[questionNum].text}
      {questionNum + 1 < questions.length && (
        <button onClick={() => setQuestionNum((prev) => prev + 1)}>次へ</button>
      )}
    </div>
  );
}
