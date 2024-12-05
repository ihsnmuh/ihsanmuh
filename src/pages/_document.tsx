import { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        {/* Umami Script */}
        <Script
          defer
          src='https://cloud.umami.is/script.js'
          data-website-id='a4e1f312-450a-43c1-9a1a-b0df40fb9248'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
