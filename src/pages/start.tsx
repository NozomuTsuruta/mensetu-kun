import { useEffect, useState } from "react";

export default function Start() {
  const [voices, setVoices] = useState<string[]>([]);
  useEffect(() => {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance("");
    const voices = synth.getVoices();
    utter.voice = voices[0]; // 0, 58
    utter.lang = "ja-JP";
    utter.pitch = -1000;
    synth.speak(utter);
    const recognition = new webkitSpeechRecognition();
    recognition.start();
    const speechRecognitionList = new webkitSpeechGrammarList();
    recognition.grammars = speechRecognitionList;
    recognition.lang = "ja-JP";
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = function (event) {
      setVoices((prev) => [...prev, event.results[0][0].transcript]);
      recognition.stop();
    };
  }, [voices]);
  return (
    <ul>
      {voices.map((voice) => (
        <li key={voice}>{voice}</li>
      ))}
    </ul>
  );
}
