import "../styles/tailwind.css";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../redux";
import { Wrapper } from "../components/Wrapper";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </Provider>
  );
}
