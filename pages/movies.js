import {  Model } from "survey-core";
  import { Survey } from "survey-react-ui";
  import { text } from "../jsons/inputTypes";
  
  const SurveyText = ({content}) => {
    let myCss = {
      row: "sv-row",
      question: {
          content: "sd-question__content question_content_custom",
          titleOnAnswer: "question-title-answered"
      },
      
  };
  
    const model = new Model(content);
    model.onComplete.add( async function (sender, options) {
      const body = JSON.stringify({
        surveyId: 1,
        content: sender.data,
        createdAt: "2022/10/22",
        createdBy: "Leon Cangini"
      })
      const res =await fetch('http://localhost:3500/survey/survey_result', {
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
  
  export default SurveyText