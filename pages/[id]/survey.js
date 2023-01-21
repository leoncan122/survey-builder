import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'survey-core/modern.min.css';
import { StylesManager } from "survey-core";


const  SurveyText = dynamic(
  () => import("../../components/SurveyText"),
  {
    ssr: false,
  }
);

const SurveyForm = ({data}) => {
  console.log(data)

  useEffect(() => {
    StylesManager.applyTheme("modern");
  });

  return (
    <>
    
    <SurveyText data={data} />
    </>
  )
}
export default SurveyForm;
export async function getServerSideProps(ctx) {
    const {id} = ctx.params
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/survey/${id}`);
    
    const data = await response.json();
    return { props: { data } };
  }