import Dexie from "dexie";
import { IQuestion } from "../redux/questions/types";

const database = new Dexie("mensetu-kun"); // データベース名 データベース接続
database.version(1).stores({ questions: "&id" }); // データベースのバージョン、テーブル名とインデックスとなるデータ名

export const questionsTable: Dexie.Table<IQuestion, string> = database.table(
  "questions"
); // データの型、キーとなるデータの型 テーブル作成
