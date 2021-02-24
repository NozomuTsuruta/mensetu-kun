import { FC, useEffect } from "react";
import Head from "next/head";
import { useDispatch } from "react-redux";
import { readQuestions } from "../redux/questions/actions";
import { Header } from "./Header";

export const Wrapper: FC = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(readQuestions());
  }, []);
  return (
    <>
      <Header />
      <Head>
        <title>面接くん</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="px-8">{children}</div>
    </>
  );
};
