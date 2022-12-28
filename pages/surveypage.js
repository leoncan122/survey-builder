// Default V2 theme
// import "survey-core/defaultV2.min.css";
// Modern theme
import 'survey-core/modern.min.css';
import { StylesManager } from "survey-core";


import dynamic from "next/dynamic";
import { useEffect } from 'react';
import Header from '../components/Header';
const SurveyText = dynamic(
  () => import("../components/SurveyText"),
  {
    ssr: false,
  }
);
const SurveyRadio = dynamic(
  () => import("../components/SurveyText"),
  {
    ssr: false,
  }
);
const SurveyDate = dynamic(
  () => import("../components/SurveyText"),
  {
    ssr: false,
  }
);
const SurveyBoolean = dynamic(
  () => import("../components/SurveyBoolean"),
  {
    ssr: false,
  }
);
const SurveyCheckbox = dynamic(
  () => import("../components/SurveyCheckbox"),
  {
    ssr: false,
  }
);
const SurveyFile = dynamic(
  () => import("../components/SurveyFile"),
  {
    ssr: false,
  }
);
const SurveyNumeric = dynamic(
  () => import("../components/SurveyNumeric"),
  {
    ssr: false,
  }
);
// const content = 
const SurveyPage = () => {
  
  useEffect(() => {
    StylesManager.applyTheme("modern");

  })
  return (
    <>
    <Header />
    <main>
      <section id="menu">

      </section>
     
    </main>
    </>
    
  );
};
export default SurveyPage;
