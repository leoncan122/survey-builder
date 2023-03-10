import React from "react";
import "survey-core/survey.i18n.js";
import "survey-creator-core/survey-creator-core.i18n.js";
import "survey-core/defaultV2.css";
import "survey-creator-core/survey-creator-core.css";
import dynamic from "next/dynamic";

const EditorComponent = dynamic(() => import("../../../components/EditorRelated"), {
  ssr: false,
});
const creatorOptions = {
  showLogicTab: true,
  isAutoSave: true,
};
// const creator = new SurveyCreator(creatorOptions);

function EditRelatedSurvey({ data }) {
  return <EditorComponent content={data[0]?.content} data={data} />;
}
export default EditRelatedSurvey;

export async function getServerSideProps(ctx) {
  const { id } = ctx.params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/survey/related/${id}`);
  const data = await res.json();

  return { props: { data: data } };
}
