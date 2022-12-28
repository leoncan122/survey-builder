import {  Model } from "survey-core";
import { Survey } from "survey-react-ui";
import { boolean, text } from "../jsons/inputTypes";

const SurveyBoolean = () => {
  const booleanSurvey = new Model(boolean);
    return <Survey model={booleanSurvey}/>
}

export default SurveyBoolean