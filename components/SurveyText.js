import {  Model } from "survey-core";
import { Survey } from "survey-react-ui";
import { text } from "../jsons/inputTypes";

const SurveyText = ({content}) => {
  let myCss = {
    row: "sv-row",
    question: {
        content: "sd-question__content question_content_custom",
        titleOnAnswer: "question-title-answered"
    }
};

  const model = new Model(content);
    return <Survey model={model} css={myCss}/>
}

export default SurveyText