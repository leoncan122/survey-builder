import {  Model } from "survey-core";
import { Survey } from "survey-react-ui";
import { date, text } from "../jsons/inputTypes";

const SurveyDate = () => {
  const textSurvey = new Model(date);
    return <Survey model={textSurvey}/>
}

export default SurveyDate