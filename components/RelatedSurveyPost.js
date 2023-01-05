import { useRouter } from "next/router";
import {  Model } from "survey-core";
import { Survey } from "survey-react-ui";

const RelatedSurveyPost = ({data, }) => {
  const router = useRouter()
  let myCss = {
    row: "sv-row",
    question: {
        content: "sd-question__content question_content_custom",
        titleOnAnswer: "question-title-answered"
    },
    
};

  const model = new Model(data[0].content);
  model.onComplete.add( async function (sender, options) {
    const body = JSON.stringify({
      relatedSurveyId: Number(router.query.id),
      relatedSurveyResultId: Number(router.query.relatedPrimaryResultId),
      result: sender.data,
      createdAt: "2022/10/22",
      createdBy: "Leon Cangini"
    })
    const res = await fetch('http://localhost:3500/survey/related_survey_result', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: body
    })
    const data = await res.json()
    console.log(data)
  })
    
  return <Survey model={model} css={myCss}/>
}

export default RelatedSurveyPost