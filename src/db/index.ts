import Dexie from "dexie";
import { IRecord } from "../redux/records/types";
import { ISchedule } from "../redux/schedule/types";

const database = new Dexie("mensetu-kun"); // データベース名 データベース接続
database.version(1).stores({ questions: "&id" }); // データベースのバージョン、テーブル名とインデックスとなるデータ名

export const questionsTable: Dexie.Table<IRecord, string> = database.table(
  "records"
); // データの型、キーとなるデータの型 テーブル作成

export const scheduleTable: Dexie.Table<ISchedule, string> = database.table(
  "schedule"
); // データの型、キーとなるデータの型 テーブル作成
