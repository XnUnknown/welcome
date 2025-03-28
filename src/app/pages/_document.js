import { Html, Head, Main, NextScript } from 'next/document'
 
export default function Document() {
  return (
    <Html>
      <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Big+Shoulders:opsz,wght@10..72,100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Tektur:wght@400..900&display=swap" rel="stylesheet" />
            <title>XnUnknown - Portfolio</title>
            <meta name="description" content="Welcome to my portfolio. Showcasing my work in web development, AI, VFX, and more." />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}