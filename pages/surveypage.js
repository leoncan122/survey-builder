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

const SurveyPage = () => {
  
  useEffect(() => {
    StylesManager.applyTheme("modern");

  })
  return (
    <>
    <Header />
    <main>
      <section id="menu">
        <div className="">
          <div className="">
            <a href="#Date">Dates</a>
          </div>
          
          <div className="">
            <a href="#Numeric">Numeric</a>
          </div>
          <div className="">
            <a href="#Boolean">Boolean</a>
          </div>
          <div className="">
            <a href="#Checkbox">Checkbox</a>
          </div>
          <div className="">
            <a href="#Radio">Radio</a>
          </div>
          <div className="">
            <a href="#File">File</a>
          </div>
        </div>
      </section>
      <section id="content">
      <div>
        <h1 id="Date">Date</h1>
        <SurveyDate />
      </div>
      <div>
        <h1 id="Radio">Radio</h1>
        <SurveyRadio />
      </div>
      <div>
        <h1 id="Boolean">Boolean</h1>
        <SurveyBoolean />
      </div>
      <div>
        <h1 id="Checkbox">Checkbox</h1>
        <SurveyCheckbox />
      </div>
      <div>
        <h1 id="File">File</h1>
        <SurveyFile />
      </div>
      <div>
        <h1 id="Numeric">Numeric</h1>
        <SurveyNumeric />
      </div>
      </section>
     
    </main>
    </>
    
  );
};
export default SurveyPage;
