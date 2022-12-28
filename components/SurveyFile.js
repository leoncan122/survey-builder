import {  Model } from "survey-core";
import { Survey } from "survey-react-ui";
import { file, text } from "../jsons/inputTypes";

const SurveyFile = () => {
  const textSurvey = new Model(file);
    return <Survey model={textSurvey}/>
}

export default SurveyFile