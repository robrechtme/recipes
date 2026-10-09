import "../styles/globals.css";

import type { AppProps } from "next/app";
import { Caveat, Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat" });

const App = ({ Component, pageProps }: AppProps) => (
  <div className={`${montserrat.variable} ${caveat.variable} font-sans`}>
    <Component {...pageProps} />
  </div>
);

export default App;
