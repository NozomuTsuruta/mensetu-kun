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
