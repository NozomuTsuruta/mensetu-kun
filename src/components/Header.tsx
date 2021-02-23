import { is_sp } from "../util";

export const Header = () => (
  <div className="w-full px-8 py-4 border-black border-b-2 mb-8 flex items-center">
    <h1 className="font-stick font-bold text-4xl tracking-widest2">面接くん</h1>
    {!is_sp() && <p>ー 面接練習アプリ ー</p>}
  </div>
);
