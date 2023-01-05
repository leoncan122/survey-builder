import React, { useEffect } from "react";
import { SurveyCreator, SurveyCreatorComponent } from "survey-creator-react";
import "survey-core/survey.i18n.js";
import "survey-creator-core/survey-creator-core.i18n.js";
import "survey-core/defaultV2.css";
import "survey-creator-core/survey-creator-core.css";
import dynamic from "next/dynamic";

const CreatorComponent = dynamic(() => import("../../components/Creator"), {
  ssr: false,
});
const creatorOptions = {
  showLogicTab: true,
  isAutoSave: true,
};
// const creator = new SurveyCreator(creatorOptions);

function EditSurvey({ data }) {
  return <CreatorComponent content={data[0]?.content} data={data} />;
}
export default EditSurvey;

export async function getServerSideProps(ctx) {
  const { id } = ctx.params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/survey/${id}`);
  const data = await res.json();

  return { props: { data: data } };
}
