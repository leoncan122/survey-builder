import React, { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import useCopyToClipboard from "../hooks/useCopyToClipboard";
import useNamesSelected from "../hooks/useNamesSelected";
import AddFilter from "../components/addFilter";

const Reports = ({ surveys }) => {
  // console.log(surveys);
  const [selected, setSelected] = useState(null);
  const [selectedForms, setSelectedForms] = useState([]);
  const [selectedNames, select] = useNamesSelected([]);
  const [results, setResults] = useState([]);
  const [filters, setFilters] = useState([
    
  ]);
  const [showModalFilter, setShowModalFilter]  = useState(false);
  console.log(results)
  useEffect(() => {
    const resultados = [];
    const filterResults = (arr) => {
      if (arr.length < 1) return;

      const [first, ...rest] = arr;

      const newData = results.filter((r) => first.execute(r));

      newData && resultados.push(newData[0]);

      return filterResults([...rest]);
    };

    filterResults(filters);
    setResults(resultados)
    
  }, [filters]);

  const typeOfQuestion = (field) => {
    if (!field.type) return;
    switch (field.type) {
      case "radiogroup":
        return field.choices.map((choice) => {
          if (typeof choice === "object") return choice.value;
          return choice;
        });
        break;
      case "checkbox":
        return field.choices.map((choice) => {
          if (typeof choice === "object") return choice.value;
          return choice;
        });
        break;
    }
  };

  const compareArrays = (arrayOfArrays) => {
    const matchs = surveys
      .filter((survey) => selectedForms.includes(survey.id))
      .map((survey) =>
        JSON.parse(survey?.content).pages.map((page) => page.elements)
      );
    const flat = matchs.flat();

    const toFindDuplicates = (arry) =>
      arry.filter((item, index, arr) => arr.indexOf(item) !== index);
    const result = toFindDuplicates([...flat[0], ...flat[0]]);
    return result;
  };

  const selectForm = async (id) => {
    const isValueSelected = selectedForms.includes(id);
    const newValues = selectedForms.filter((id) => !id);
    console.log(isValueSelected, newValues);
    if (isValueSelected) {
      setSelectedForms(newValues);
      deleteResults(id);
    } else {
      setSelectedForms((prev) => [...prev, id]);
      getResults(id);
    }
  };
  const getResults = async (id) => {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/survey/all_result_by_survey_id/${id}`
    );
    const result = await data.json();
    addResults(result[0].result);
  };
  const addResults = (result) => setResults((prev) => [...prev, result]);

  const deleteResults = (id) => {
    const newResults = results.filter((result) => result.survey_id !== id);
    setResults(newResults);
  };
  
  // const seeValueOptions = (element) => {};
  
  console.log("filters", filters);
  return (
      <Layout>
      {showModalFilter && <AddFilter setShowModalFilter={setShowModalFilter} setFilters={setFilters} selected={selected}/>}
      <section className="container mt-5">
        <h1>Make a customizable report</h1>
        <h2>Follow the steps</h2>

        <h3 className="mt-5 mb-3">1. Select one or more surveys</h3>
        <div className="row gap-3">
          {surveys?.map((survey) => {
            const json = JSON.parse(survey?.content);
            const fields = json.pages.map((page) => page.elements).flat();
            // console.log(fields)
            return (
              <>
                <div
                  className={`col-sm-6 col-md-3 card ${
                    selectedForms.includes(survey.id) && `bg-info`
                  }`}
                >
                  <div
                    className="card-body d-flex flex-column"
                    // onClick={(e) => handleSelection(survey.id)}
                  >
                    <h5 className="card-title">{json.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {survey.createdat.split("T")[0]}
                    </h6>
                    <p className="card-text">
                      This survey has a 1 to many relation with each of the
                      main's output survey
                    </p>
                    <button
                      onClick={() => selectForm(survey.id)}
                      className="bg-primary bg-gradient"
                    >
                      Select
                    </button>
                  </div>
                </div>
                <div className="col-sm-6 col-md-4">
                  <div className="list-group">
                    <button className="list-group-item list-group-item-action active">
                      {json.title}
                    </button>
                    {fields.map((field, index) => (
                      <button
                        key={index}
                        onClick={() => setSelected(field)}
                        className="list-group-item list-group-item-action"
                      >
                        {field.valueName}
                      </button>
                    ))}
                  </div>
                </div>
                {selected && (
                  <div className="col-sm-6 col-md-4">
                    <div className="list-group">
                      <div className="list-group-item list-group-item-action active">
                        {selected?.name}
                      </div>
                      <div className="list-group-item list-group-item-action ">
                        Title: {`"${selected?.title}"`}
                      </div>
                      <div className="list-group-item list-group-item-action ">
                        Value name: {`"${selected?.valueName}"`}
                      </div>
                      {selected.choices && (
                        <div className="list-group-item list-group-item-action ">
                          Choices:{" "}
                          {typeOfQuestion(selected).map((choice) => (
                            <ul className="list-group">
                              <li className="list-group-item">{choice}</li>
                            </ul>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
            );
          })}
        </div>
      </section>
      <section className="container mt-5">
        <h3 className="mt-5 mb-3">
          2. Select fields forms have in common and you want to filter for
        </h3>
        <p>Double click to select the field.</p>
        <div className="row mt-5">
          <div className="list-group col-sm-6 col-md-4">
            {selectedForms.length > 0 &&
              compareArrays(surveys).map((element, index) => (
                <button
                  key={index}
                  type="button"
                  className={`list-group-item list-group-item-action ${
                    selectedNames.includes(element.valueName) &&
                    "active bg-gradient"
                  }`}
                  onClick={(e) => setSelected(element)}
                >
                  {element.valueName} is Type {element.type}{" "}
                </button>
              ))}
          </div>
          {selected && (
            <div className="col-sm-6 col-md-4">
              <div className="list-group">
                <div className="list-group-item list-group-item-action active">
                  {selected?.name}
                </div>
                <div className="list-group-item list-group-item-action ">
                  Title: {`"${selected?.title}"`}
                </div>
                <div className="list-group-item list-group-item-action ">
                  Value name: {`"${selected?.valueName}"`}
                </div>
                {selected.choices && (
                  <div className="list-group-item list-group-item-action ">
                    Choices:{" "}
                    {typeOfQuestion(selected).map((choice, index) => (
                      <ul className="list-group" key={index}>
                        <li
                          onDoubleClick={() => {
                            select(selected.valueName);
                            setShowModalFilter(!showModalFilter)
                          }}
                          className="list-group-item"
                        >
                          {choice}
                        </li>
                      </ul>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
      <section className="container mt-5">
        <h3 className="mt-5 mb-3">3. Make your query</h3>
        <input
          className="form-control"
          type="text"
          defaultValue={`Select data FROM ${
            selectedForms.length > 0 &&
            surveys
              .filter((survey) => selectedForms.includes(survey.id))
              .map((survey) => JSON.parse(survey?.content).title)
              .join(" / ")
          } WHERE exists: ${selectedNames?.join(" / ")}`}
          aria-label="readonly input example"
        ></input>
        <button type="button" className="btn btn-success mt-2 mb-5">
          Success
        </button>
        <div className="row gap-3"></div>
      </section>
      {/* <section className="container table-responsive mt-5">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">By</th>
              {relatedSurveys?.map((survey) => (
                <th scope="col" className="text-center">
                  {JSON.parse(survey.content).title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((element, index) => (
                <>
                  <tr>
                    <td scope="row">{element.createdat.split("T")[0]}</td>
                    <td>{element.createdby}</td>
                    {relatedSurveys?.map((survey) => (
                      <td
                        scope="col"
                        className="d-flex justify-content-center gap-3"
                      >
                        <Link
                          legacyBehavior
                          href={{
                            pathname: `/${survey.id}/relatedSurvey`,
                            query: {
                              relatedPrimaryResultId: element.surveyresultid,
                            },
                          }}
                        >
                          <a className="btn btn-primary " role="button">
                            Run
                          </a>
                        </Link>
                        <a
                          href={`/dashboard/${element.surveyresultid}/relatedSurveyOutputResults`}
                          className="btn btn-primary"
                          role="button"
                        >
                          Results
                        </a>{" "}
                      </td>
                    ))}
                  </tr>
                </>
              ))}
          </tbody>
        </table>
      </section> */}
    </Layout>
    
  );
};

export default Reports;
export const getServerSideProps = async () => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/survey`);
  const surveys = await data.json();
  return { props: { surveys } };
};
