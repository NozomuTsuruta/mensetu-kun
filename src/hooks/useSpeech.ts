import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { IQuestion } from "../redux/questions/types";
import Router from "next/router";
import { useDispatch } from "react-redux";
import { addAnswer } from "../redux/answers/actions";

const useSpeech = (
  question: IQuestion,
  setQuestionNum: Dispatch<SetStateAction<number>>,
  loading: boolean
) => {
  const [paused, setPaused] = useState(false);
  const [count, setCount] = useState<number>(60);
  const synth = useRef<SpeechSynthesis>();
  const uttr = useRef<SpeechSynthesisUtterance>();
  const dispatch = useDispatch();

  useEffect(() => {
    synth.current = window.speechSynthesis;
    uttr.current = new SpeechSynthesisUtterance();
    const voices = synth.current.getVoices();
    uttr.current.voice = voices[0]; // 0, 58
    uttr.current.lang = "ja-JP";
    uttr.current.pitch = 0;
    uttr.current.rate = 0.8;
  }, []);

  useEffect(() => {
    if (!question || loading || paused || !synth.current || !uttr.current) {
      return;
    }
    uttr.current.text = question.text;
    synth.current.speak(uttr.current);
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
    setCount(question.second);
  }, [question]);

  useEffect(() => {
    const rec = new webkitSpeechRecognition();
    rec.continuous = true;
    if (synth.current?.speaking) {
      return rec.stop();
    }
    rec.start();
    rec.onresult = (e) => {
      let answer = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        answer += e.results[i][0].transcript + "。";
      }
      dispatch(addAnswer({ id: question.id, question: question.text, answer }));
    };
  }, [synth.current?.speaking]);

  const pause = () => {
    setPaused(true);
    synth.current?.pause();
  };

  const resume = () => {
    setPaused(false);
    synth.current?.resume();
  };

  const cancel = () => {
    synth.current?.cancel();
    Router.push("/");
  };

  const prev = () => {
    synth.current?.cancel();
    setQuestionNum((prev) => prev - 1);
  };

  const next = () => {
    synth.current?.cancel();
    setQuestionNum((prev) => prev + 1);
  };

  return { pause, resume, cancel, prev, next, paused, count };
};

export default useSpeech;
