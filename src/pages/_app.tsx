import "../styles/globals.css";

import type { AppProps } from "next/app";
import { Caveat, Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });
const caveat = Caveat({ subsets: ["latin"] });

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <style jsx global>{`
      html {
        --font-montserrat: ${montserrat.style.fontFamily};
        --font-caveat: ${caveat.style.fontFamily};
      }
    `}</style>
    <Component {...pageProps} />
  </>
);

export default App;
