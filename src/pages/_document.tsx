import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  const umamiDomain = process.env.NEXT_PUBLIC_UMAMI_DOMAIN;
  const umamiId = process.env.NEXT_PUBLIC_UMAMI_ID;

  return (
    <Html lang='en'>
      <Head>
        {/* Umami Script */}
        <script
          async
          defer
          src='https://cloud.umami.is/script.js'
          data-website-id='a4e1f312-450a-43c1-9a1a-b0df40fb9248'
        />

        {/* Umami Script Local Domain */}
        {umamiDomain && umamiId && (
          <script
            async
            defer
            src={`${umamiDomain}/script.js`}
            data-website-id={umamiId}
          />
        )}

        {/* Microsoft Clarity (production host only) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (window.location.hostname === "ihsanmuh.com" || window.location.hostname === "www.ihsanmuh.com") {
                (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "vkncrl4j1n");
              }
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
