import React, { useCallback, useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import UseNamesSelected from '../hooks/UseNamesSelected';
import AddFilter from "../components/AddFilter";
import "../styles/FilterPanel.module.css";

const Reports = ({ surveys }) => {
  // console.log(surveys);
  const [selected, setSelected] = useState(null);
  const [selectedForms, setSelectedForms] = useState([]);
  const [selectedNames, select] = UseNamesSelected([]);
  const [results, setResults] = useState([]);
  const [filters, setFilters] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [showModalFilter, setShowModalFilter] = useState(false);
  useEffect(() => {
    let resultados = [];
    const filterResults = (arr) => {
      if (arr.length < 1) return;

      const [firstFilter, ...rest] = arr;

      const newData = results.filter((r) =>
        firstFilter.fn(r, firstFilter.resultKey, firstFilter.expression)
      );

      resultados = newData;

      return filterResults([...rest]);
    };

    filterResults(filters);
    setFilteredResults(resultados);
  }, [filters]);
console.log("filtered results", filteredResults)

  const compareArrays = useCallback(
    (surveys) => {
      let matchs = [];
      const selectedFormObjects = surveys
        .filter((survey) => selectedForms.includes(survey.id))
        .map((survey) =>
          JSON.parse(survey?.content).pages.map((page) => page.elements)
        );
      const flat = selectedFormObjects.flat();
  
      // console.log("matchs", matchs);
      // console.log("flatted matchs", flat);
  
      function getDuplicates(arrayOfArrays) {
        let duplicates = [];
        let valueMap = new Map();
        arrayOfArrays
          .reduce((acc, curr) => acc.concat(curr), [])
          .forEach((obj) => {
            let value = obj.valueName;
            if (!valueMap.has(value)) {
              valueMap.set(value, []);
            }
            valueMap.get(value).push(obj);
          });
        for (let [key, value] of valueMap) {
          if (value.length > 1) {
            duplicates = duplicates.concat(value.slice(0, 1));
          }
        }
        return duplicates;
      }
      // console.log("flat result", flat);
      return selectedForms.length < 2 ? flat[0] : getDuplicates(flat);
    }
  )
  const typeOfQuestion = useCallback(
    (field) => {
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
    }
  )
  const selectForm = async (id) => {
    const isValueSelected = selectedForms.includes(id);
    const newValues = selectedForms.filter((id) => !id);
    // console.log(isValueSelected, newValues);
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
      `${process.env.NEXT_PUBLIC_SERVER_URL}/survey/all_result_by_survey_schema_id/${id}`
    );
    const result = await data.json();
    // console.log("fetch result", result);
    addResults(result);
  };
  const addResults = (result) => setResults((prev) => [...prev, ...result]);

  const deleteResults = (id) => {
    const newResults = results.filter((result) => result.survey_id !== id);
    setResults(newResults);
  };

  const deleteFilter = (filter) => setFilters([...filters.filter(fltr => fltr.expression !== filter.expression || fltr.resultKey !== filter.resultKey)])
  console.log("filters", filters);

  return (
    <Layout>
      {showModalFilter && (
        <AddFilter
          showModalFilter={showModalFilter}
          setShowModalFilter={setShowModalFilter}
          setFilters={setFilters}
          selected={selected}
        />
      )}
      <section className="container mt-5">
        <h1>Make a customizable report</h1>
        <h2>Follow the steps</h2>

        <h3 className="mt-5 mb-3">1. Select one or more surveys</h3>
        {surveys?.map((survey) => {
          const json = JSON.parse(survey?.content);
          const fields = json.pages.map((page) => page.elements).flat();
          return (
            <>
              <div
                className={`row shadow mb-5 py-5  ${
                  selectedForms.includes(survey.id) && `bg-info`
                }`}
              >
                <div className={`card shadow py-3 col-sm-6 col-md-4 `}>
                  <div
                    className={`card-body d-flex flex-column`}
                    // onClick={(e) => handleSelection(survey.id)}
                  >
                    <h5 className="card-title fw-bolder">{json.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted ">
                      {survey.createdat.split("T")[0]}
                    </h6>

                    <button
                      onClick={() => selectForm(survey.id)}
                      className="bg-primary bg-gradient"
                    >
                      Select
                    </button>
                  </div>
                  <div className="list-group">
                    <button className="list-group-item list-group-item-action active fw-bolder  ">
                      {/* {json.title} */}
                      Datapoints
                    </button>
                    {fields.map((field, index) => (
                      <button
                        key={index}
                        onClick={() => setSelected(field)}
                        className="list-group-item list-group-item-action d-flex justify-content-between min-h-mas align-items-center"
                      >
                        <p>{field.valueName}</p>
                        <p className="small">
                          <strong>+</strong>
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="col-sm-6 col-md-8 list-group card ">
                  {selected && (
                    <>
                      <div className="list-group-item list-group-item-action ">
                        <strong>name: </strong> "{selected?.name}"
                      </div>
                      <div className="list-group-item list-group-item-action ">
                        <strong>Title: </strong> {`"${selected?.title}"`}
                      </div>
                      <div className="list-group-item list-group-item-action ">
                        <strong>Value name: </strong>
                        {`"${selected?.valueName}"`}
                      </div>

                      <div className="list-group-item list-group-item-action ">
                        <strong>Choices: </strong>{" "}
                        {selected.choices && (
                          <div className="d-flex mt-2 ">
                            {Array.from({ length: 2 }, (_, i) => {
                              const columnLength = Math.ceil(
                                selected.choices.length / 2
                              );
                              return (
                                <div key={i} style={{ flex: 1 }}>
                                  {typeOfQuestion(selected)
                                    .slice(
                                      i * columnLength,
                                      (i + 1) * columnLength
                                    )
                                    .map((option) => (
                                      <>
                                        <p className="small">{option}</p>
                                      </>
                                    ))}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </>
          );
        })}
      </section>
      <section className="container mt-5">
        <h3 className="mt-5 mb-3">
          2. Select fields forms have in common and you want to filter for
        </h3>
        <p>Click to select the field.</p>
        <div className="row mt-5">
          <div className="list-group ">
            <div
              type="button"
              className={`list-group-item list-group-item-action bg-dark text-white bg-gradient`}
            >
              Filters
            </div>
            <div className="d-flex gap-2 py-2 px-1">
              {filters.length > 0 ? (
                filters.map((filter) => (
                  <p type="button" className="btn-filter-panel"  name="" onClick={() => deleteFilter(filter)}>
                    <span>{filter.resultKey}  <ins>{filter.symbol}</ins>  {filter.expression}</span>
                    <small>X</small>
                  </p>
                ))
              ) : (
                <div className="list-group-item">No filters added yet</div>
              )}
            </div>
          </div>
          <div className="row mt-2">
            <button type="button" className={`list-group fw-bolder`}>
              Filter by
            </button>
            {selectedForms.length > 0 ? (
              compareArrays(surveys).map((element, index) => (
                <>
                  <button
                    key={index}
                    type="button"
                    className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${
                      selectedNames.includes(element.valueName) &&
                      "bg-info bg-gradient"
                    }`}
                    onClick={(e) => setSelected(element)}
                  >
                    {element.valueName}
                    <button
                      type="button"
                      className="bg-dark text-white btn"
                      onClick={() => {
                        setSelected(element);
                        setShowModalFilter(!showModalFilter);
                      }}
                    >
                      Add filter
                    </button>
                  </button>
                      
                </>
              ))
            ) : (
              <div className="list-group-item">No surveys selected yet</div>
            )}
          </div>
        </div>
        <div className="row mt-5">
        {filteredResults && (
          <table class="table">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">By</th>
              {/* {relatedSurveys?.map((survey) => (
                <th scope="col" className="text-center">
                  {JSON.parse(survey.content).title}
                </th>
              ))} */}
            </tr>
          </thead>
          <tbody>
            {filteredResults &&
              filteredResults.map((element, index) => (
                <>
                  <tr>
                    {/* <td scope="row">{element.createdat.split("T")[0]}</td>
                    <td>{element.createdby}</td> */}
                    {/* {relatedSurveys?.map((survey) => (
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
                          <a class="btn btn-primary " role="button">
                            Run
                          </a>
                        </Link>
                        <a
                          href={`/dashboard/${element.surveyresultid}/relatedSurveyOutputResults`}
                          class="btn btn-primary"
                          role="button"
                        >
                          Results
                        </a>{" "}
                      </td>
                    ))} */}
                  </tr>
                </>
              ))}
          </tbody>
        </table>
        )}
          {/* {selected && (
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
                <div className="list-group-item list-group-item-action ">
                  Type: {selected.type}{" "}
                </div>
                {selected.choices && (
                  <div className="list-group-item list-group-item-action ">
                    Choices:{" "}
                    {typeOfQuestion(selected).map((choice, index) => (
                      <ul className="list-group" key={index}>
                        <li
                          onDoubleClick={() => {
                            select(selected.valueName);
                            setShowModalFilter(!showModalFilter);
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
          )} */}
        </div>
      </section>
      {/* <section className="container mt-5">
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
