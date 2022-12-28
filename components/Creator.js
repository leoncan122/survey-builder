import React,{ useEffect } from "react";
import { SurveyCreatorComponent, SurveyCreator } from "survey-creator-react";
import "survey-core/defaultV2.min.css";
import "survey-creator-core/survey-creator-core.min.css";

const creatorOptions = {
  showLogicTab: true,
  isAutoSave: true,
};

export default function SurveyCreatorWidget({ content, data }) {
  const creator = new SurveyCreator(creatorOptions);
  creator.text = content
  creator.saveSurveyFunc = async (saveNo, callback) => {
    // If you use localStorage:
    window.localStorage.setItem("survey-json", creator.text);
    callback(saveNo, true);

    // If you use a web service:
  const body = JSON.stringify({
      id: data[0]?.id,
      content: creator.JSON,
      changedBy: 'Leon cangini',
      changedAt: '2022/12/28'
  })
  const res = await fetch('http://localhost:3500/survey', {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json;charset=UTF-8'
      },
      body: body
  })

  };

  return <SurveyCreatorComponent creator={creator} />;
}
