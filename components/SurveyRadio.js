import {  Model } from "survey-core";
import { Survey } from "survey-react-ui";

const SurveyRadio = () => {
  const textSurvey = new Model();
    return <Survey model={textSurvey}/>
}

export default SurveyRadio