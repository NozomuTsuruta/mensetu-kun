import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IQuestion } from "../redux/questions/types";
import Router from "next/router";
import { IAnswer } from "../redux/answers/type";

const useSpeech = (
  question: IQuestion,
  setQuestionNum: Dispatch<SetStateAction<number>>,
  loading: boolean
) => {
  const [paused, setPaused] = useState(false);
  const [synth, setSynth] = useState<SpeechSynthesis>();
  const [count, setCount] = useState<number>(60);
  const [uttr, setUttr] = useState<SpeechSynthesisUtterance>();
  const [answer, setAnswer] = useState<IAnswer[]>([]);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const uttr = new SpeechSynthesisUtterance();
    const voices = synth.getVoices();
    uttr.voice = voices[0]; // 0, 58
    uttr.lang = "ja-JP";
    uttr.pitch = 0;
    uttr.rate = 0.8;
    setSynth(synth);
    setUttr(uttr);
  }, []);

  useEffect(() => {
    if (!question || loading || paused || !synth || !uttr) {
      return;
    }
    uttr.text = question.text;
    synth.speak(uttr);
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
    if (synth?.speaking) {
      rec.stop();
      return;
    }
    rec.start();
    rec.onresult = (e) => {
      let answer = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        answer += e.results[i][0].transcript + "。";
      }
      setAnswer((prev) => {
        if (prev.some(({ id }) => id === question.id)) {
          return prev.map((el) => {
            if (el.id === question.id) {
              return {
                id: el.id,
                question: el.question,
                answer: el.answer + answer,
              };
            }
            return el;
          });
        }
        return [
          ...prev,
          { id: question.id, question: question.text, answer: answer },
        ];
      });
    };
  }, [synth?.speaking]);

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
