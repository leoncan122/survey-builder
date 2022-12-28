import{ Html, Head, Main, NextScript } from 'next/document'
import { SurveyCreator, SurveyCreatorComponent } from "survey-creator-react";


export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body id="surveyElement">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
