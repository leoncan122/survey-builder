import {
  InputDate,
  RadioList,
  InputTextarea,
  InputNumber,
  InputCheckboxColumns,
} from "@leoncan122/react-form-lib";
import { useState, useRef } from "react";
import '../styles/Custom.module.css'
import Sticky from "../components/Sticky";

const test = () => {
  const ref = useRef(null)

  const [surveyForm, setSurveyForm] = useState({
    dateEvent: "2022/05/02",
    fboAttendees: ["Faith Leader"],
    suggestions: "",
    radioOptions: 'Other',
    radioOptionsOther: '',
    descriptionArea: ''
  });
  console.log(surveyForm);
  const handleForm = (e) =>
    setSurveyForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const fboAttendeesOptions = [
    "Faith Leader",
    "Coordinator(s)",
    "Black Health Staff",
    "Other",
  ];
  const handleSingleValueForm = (e) =>
    setSurveyForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  return (
    <>
      <h1 className="container mx-auto">Test</h1>
      <InputDate name="dateEvent" surveyForm={surveyForm} onChange={handleForm}>
        Date
      </InputDate>
      <div>
      <Sticky onClick={(e) => console.log("click",e)} ref={ref} hideWhen='test' topOffset={'20px'} id="sticky-custom" >
        <button role="button" className="btn btn-primary" >STICKED BUTTON</button>
      </Sticky>
      <InputCheckboxColumns
        name="fboAttendees"
        options={fboAttendeesOptions}
        surveyForm={surveyForm}
        setSurveyForm={setSurveyForm}
        title={"Meeting attendees"}
        columns={2}
      />
      </div>
      
      

     
      
      <RadioList
        options={["Option 1", "Option 2", "Other"]}
        name="radioOptions"
        title="Radios"
        columns={2}
        surveyForm={surveyForm}
        onChange={handleSingleValueForm}
      />
      
      
      <InputTextarea
        title="TextArea"
        name="suggestions"
        onChange={handleSingleValueForm}
  />
  <InputTextarea
        id="test"
        title="Test"
        name="suggestions"
        onChange={handleSingleValueForm}
  />
  <InputTextarea
        title="TextArea"
        name="suggestions"
        onChange={handleSingleValueForm}
  />
  <InputTextarea
        title="TextArea"
        name="suggestions"
        onChange={handleSingleValueForm}
  />
  <InputTextarea
        title="TextArea"
        name="suggestions"
        onChange={handleSingleValueForm}
  />
      <InputNumber name="numberValue" onChange={handleSingleValueForm} title="Number"/>
    </>
  );
  
};

export default test;
