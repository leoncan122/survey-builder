import {  Model } from "survey-core";
import { Survey } from "survey-react-ui";
import { numeric, text } from "../jsons/inputTypes";

const SurveyNumeric = () => {
  const textSurvey = new Model(numeric);
    return <Survey model={textSurvey}/>
}

export default SurveyNumeric