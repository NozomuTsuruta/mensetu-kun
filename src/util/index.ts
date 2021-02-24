let is_sp_cache: boolean | null = null;

/** 画面サイズがSPサイズかどうか */
export const is_sp = () => {
  if (is_sp_cache === null) {
    if (process.browser) {
      is_sp_cache = window.innerWidth <= 560;
    }
  }
  return is_sp_cache;
};

export const frequentQuestions = [
  {
    id: "1",
    text: "自己紹介をお願いします。",
    second: 60,
  },
  {
    id: "2",
    text: "弊社の志望理由を教えてください",
    second: 60,
  },
  {
    id: "3",
    text: "あなたの長所を教えてください",
    second: 60,
  },
  {
    id: "4",
    text: "あなたの短所を教えてください",
    second: 60,
  },
  {
    id: "5",
    text: "今までで一番頑張ったことを教えてください",
    second: 60,
  },
  {
    id: "6",
    text: "今までで一番苦労したことを教えてください",
    second: 60,
  },
  {
    id: "7",
    text: "自己PRをお願いします",
    second: 60,
  },
];
