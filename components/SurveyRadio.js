import {  Model } from "survey-core";
import { Survey } from "survey-react-ui";
import { radio, text } from "../jsons/inputTypes";

const SurveyRadio = () => {
  const textSurvey = new Model(radio);
    return <Survey model={textSurvey}/>
}

export default SurveyRadio