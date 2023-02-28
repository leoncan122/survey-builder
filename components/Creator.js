import React,{ useEffect } from "react";
import { SurveyCreatorComponent, SurveyCreator } from "survey-creator-react";
import "survey-core/defaultV2.min.css";
import "survey-creator-core/survey-creator-core.min.css";

const creatorOptions = {
  showLogicTab: true,
  isAutoSave: false,
};

export default function SurveyCreatorWidget() {
  const creator = new SurveyCreator(creatorOptions);

  creator.saveSurveyFunc = async (saveNo, callback) => {
    // If you use localStorage:
    window.localStorage.setItem("survey-json", creator.text);
    callback(saveNo, true);

    // If you use a web service:
  const body = JSON.stringify({
      content: creator.JSON,
      createdBy: 'Leon cangini',
      createdAt: '2022/12/28'
  })
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/survey`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json;charset=UTF-8'
      },
      body: body
  })
    const data = await res.json()
    // callback(saveNo, true);
  }catch (error) {
    alert(error.message)
  }
  

  };

  return <SurveyCreatorComponent creator={creator} />;
}
