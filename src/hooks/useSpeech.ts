import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IQuestion } from "../redux/questions/types";

const useSpeech = (
  question: IQuestion,
  setQuestionNum: Dispatch<SetStateAction<number>>
) => {
  const [paused, setPaused] = useState(false);
  const [synth, setSynth] = useState<SpeechSynthesis>();

  useEffect(() => {
    if (!process.browser || !question) {
      return;
    }
    const synth = window.speechSynthesis;
    setSynth(synth);
    const uttr = new SpeechSynthesisUtterance();
    const voices = synth.getVoices();
    uttr.voice = voices[0]; // 0, 58
    uttr.lang = "ja-JP";
    uttr.pitch = 0;
    uttr.rate = 0.8;
    uttr.text = question.text;
    synth.speak(uttr);
    const timer = setTimeout(() => {
      setQuestionNum((prev) => prev + 1);
    }, 60000);
    return () => {
      clearTimeout(timer);
    };
  }, [question, setQuestionNum]);

  const pause = () => {
    setPaused(true);
    synth?.pause();
  };

  const resume = () => {
    setPaused(false);
    synth?.resume();
  };

  return { pause, resume, paused };
};

export default useSpeech;
