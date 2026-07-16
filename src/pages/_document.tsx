import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="nl-BE">
      <Head>
        <meta name="title" content="Tweede kookboek van Robrecht" />
        <meta
          name="description"
          content="Een collectie van lekkere recepten, deze keer niet van mezelf"
        />
        <meta name="keywords" content="kookboek,recepten,koken,robrecht" />
        {/* This tells crawlers to not index the site */}
        <meta name="robots" content="noindex" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="author" content="Robrecht Meersman" />
        <meta property="og:title" content="Tweede kookboek van Robrecht" />
        <meta property="og:site_name" content="kookboek.robrecht.me" />
        <meta property="og:url" content="https://kookboek.robrecht.me/" />
        <meta
          property="og:description"
          content="Een collectie van lekkere recepten, deze keer niet van mezelf "
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://kookboek.robrecht.me/og-image.png" />
      </Head>
      <body className="bg-bg text-ink min-h-screen min-w-full">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
