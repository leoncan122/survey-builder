import {  Model } from "survey-core";
import { Survey } from "survey-react-ui";
import { checkbox, text } from "../jsons/inputTypes";

const SurveyCheckbox = () => {
  const textSurvey = new Model(checkbox);
    return <Survey model={textSurvey}/>
}

export default SurveyCheckbox