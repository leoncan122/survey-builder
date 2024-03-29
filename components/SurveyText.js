import {  Model } from "survey-core";
import { Survey } from "survey-react-ui";
import { text } from "../jsons/inputTypes";
import { Layout } from "./Layout";

const SurveyText = ({data}) => {
  console.log(data)
  let myCss = {
    row: "sv-row",
    question: {
        content: "sd-question__content question_content_custom",
        titleOnAnswer: "question-title-answered"
    },
    
};
const id = data?.id
  const model = new Model(data.content);
  model.onComplete.add( async function (sender, options) {
    const body = JSON.stringify({
      surveyId: id,
      content: sender.data,
      createdAt: "2022/10/22",
      createdBy: "Leon Cangini"
    })
    const res =await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/survey/survey_result`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: body
    })
    const data = await res.json()
    console.log(data)
  })
    
  return (
    <Layout>
      
      <Survey model={model} css={myCss}/>
    </Layout>
  )
}

export default SurveyText