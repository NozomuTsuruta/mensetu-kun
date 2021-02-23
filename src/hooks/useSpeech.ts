import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IQuestion } from "../redux/questions/types";
import Router from "next/router";

const useSpeech = (
  question: IQuestion,
  setQuestionNum: Dispatch<SetStateAction<number>>,
  loading: boolean
) => {
  const [paused, setPaused] = useState(false);
  const [synth, setSynth] = useState<SpeechSynthesis>();
  const [count, setCount] = useState<number>(60);

  useEffect(() => {
    const synth = window.speechSynthesis;
    setSynth(synth);
  }, []);

  useEffect(() => {
    if (!process.browser || !question || loading || paused || !synth) {
      return;
    }
    const uttr = new SpeechSynthesisUtterance();
    const voices = synth.getVoices();
    uttr.voice = voices[0]; // 0, 58
    uttr.lang = "ja-JP";
    uttr.pitch = 0;
    uttr.rate = 0.8;
    uttr.text = question.text;
    synth?.speak(uttr);
    const timer = setTimeout(() => {
      setQuestionNum((prev) => prev + 1);
    }, question.second * 1000);
    const interval = setInterval(() => setCount((prev) => prev - 1), 1000);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [question, loading, paused]);

  useEffect(() => {
    setCount(60);
  }, [question]);

  const pause = () => {
    setPaused(true);
    synth?.pause();
  };

  const resume = () => {
    setPaused(false);
    synth?.resume();
  };

  const cancel = () => {
    synth?.cancel();
    Router.push("/");
  };

  const prev = () => {
    synth?.cancel();
    setQuestionNum((prev) => prev - 1);
  };

  const next = () => {
    synth?.cancel();
    setQuestionNum((prev) => prev + 1);
  };

  return { pause, resume, cancel, prev, next, paused, count };
};

export default useSpeech;
