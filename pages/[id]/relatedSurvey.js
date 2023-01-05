import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'survey-core/modern.min.css';
import { StylesManager } from "survey-core";


const  RelatedSurveyPost = dynamic(
  () => import("../../components/RelatedSurveyPost"),
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
    
    <RelatedSurveyPost data={data} />
    </>
  )
}
export default SurveyRelatedForm;
export async function getServerSideProps(ctx) {
    const {id} = ctx.params
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/survey/related/${id}`);
    
    const data = await response.json();
    return { props: { data } };
  }
  