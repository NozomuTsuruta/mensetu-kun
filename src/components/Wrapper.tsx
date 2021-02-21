import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { readQuestions } from "../redux/questions/actions";
import { Header } from "./Header";

export const Wrapper: FC = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(readQuestions());
  }, [dispatch]);
  return (
    <>
      <Header />
      <div className="px-8">{children}</div>
    </>
  );
};
