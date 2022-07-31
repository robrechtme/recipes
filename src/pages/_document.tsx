import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="nl">
      <Head>
        <meta name="title" content="Tweede kookboek van Robrecht" />
        <meta
          name="description"
          content="Een collectie van lekkere recepten, deze keer niet van mezelf"
        />
        <meta name="keywords" content="kookboek,recepten,koken,robrecht" />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="revisit-after" content="30 days" />
        <meta name="author" content="Robrecht Meersman" />
        <meta property="og:title" content="Tweede kookboek van Robrecht" />
        <meta property="og:site_name" content="kookboek.robrecht.me" />
        <meta property="og:url" content="https://kookboek.robrecht.me/" />
        <meta
          property="og:description"
          content="Een collectie van lekkere recepten, deze keer niet van mezelf "
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://kookboek.robrecht.me/og-image.png"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="bg-primary-500 min-h-screen min-w-full">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
