import React,{ useEffect } from "react";
import { SurveyCreatorComponent, SurveyCreator } from "survey-creator-react";
import "survey-core/defaultV2.min.css";
import "survey-creator-core/survey-creator-core.min.css";
import { useRouter } from "next/router";

const creatorOptions = {
  showLogicTab: true,
  isAutoSave: true,
};

export default function SurveyCreatorWidget() {
  const router = useRouter()
  const creator = new SurveyCreator(creatorOptions);

  creator.saveSurveyFunc = async (saveNo, callback) => {
    // If you use localStorage:
    window.localStorage.setItem("survey-json", creator.text);
    callback(saveNo, true);

    // If you use a web service:
  const body = JSON.stringify({
      survey_id: router.query.id,
      content: creator.JSON,
      changedBy: 'Leon cangini',
      changedAt: '2022/12/28'
  })
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/survey/related`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json;charset=UTF-8'
      },
      body: body
  })

  };

  return <SurveyCreatorComponent creator={creator} />;
}
