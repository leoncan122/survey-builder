import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'survey-core/modern.min.css';
import { StylesManager } from "survey-core";

const   SurveyText = dynamic(
  () => import("../../components/SurveyText"),
  {
    ssr: false,
  }
);

const SurveyRelatedForm = ({data}) => {
  console.log(data)
  

  useEffect(() => {
    StylesManager.applyTheme("modern");
  });

  return (
    <>
    
    <SurveyText content={data[0].content} />
    </>
  )
}
export default SurveyRelatedForm;
export async function getServerSideProps(ctx) {
    const {id} = ctx.params
    const response = await fetch(`http://localhost:3500/survey/related/${id}`);
    
    const data = await response.json();
    return { props: { data } };
  }