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
  useEffect(() => {
    let resultados = [];
    const filterResults = (arr) => {
      if (arr.length < 1) return;

      const [firstFilter, ...rest] = arr;

      const newData = results.filter((r) => firstFilter.fn(r, firstFilter.resultKey, firstFilter.expression));

      resultados = newData

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

  const compareArrays = (surveys) => {
    let matchs = []
    const selectedFormObjects = surveys
      .filter((survey) => selectedForms.includes(survey.id))
      .map((survey) =>
        JSON.parse(survey?.content).pages.map((page) => page.elements)
      );
    const flat = selectedFormObjects.flat();

    // matchs = selectedFormObjects. 

    console.log("matchs", matchs)
    console.log("flatted matchs", flat)

    const x = []
    // const findsss = (arrays) => {
    //   const resultsDuplicateds = []
    //   return arrays.map((array, index) => {
    //     let values = array.map(objetos => objetos.valueName)
    //     return arrays.map((otherArrays, i) => {
    //       if (index === i ) return;
    //       const x = otherArrays.map(otherObjetos => {
    //         console.log("log: ",otherObjetos.valueName, values.includes(otherObjetos.valueName));
    //         values.includes(otherObjetos.valueName) && resultsDuplicateds.push(otherObjetos)
    //         console.log("verga",resultsDuplicateds);

    //       } )
    //     })
    //   })
      
    // }
    function findDuplicateKeys(array) {
      let keys = [];
      let duplicateKeys = [];
    
      array.forEach(function(obj) {
        for (let key in obj) {
          if (keys.includes(key)) {
            if (!duplicateKeys.includes(key)) {
              duplicateKeys.push(key);
            }
          } else {
            keys.push(key);
          }
        }
      });
    
      return duplicateKeys;
    }
    function getDuplicates(arrayOfArrays) {
      let duplicates = [];
      let valueMap = new Map();
      arrayOfArrays.reduce((acc, curr) => acc.concat(curr), [])
        .forEach(obj => {
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
    // const duplicatedResults = toFindDuplicates([...flat[0], ...flat[0]]);
    return getDuplicates(flat);
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
      `${process.env.NEXT_PUBLIC_SERVER_URL}/survey/all_result_by_survey_schema_id/${id}`
    );
    const result = await data.json();
    console.log("fetch result", result)
    addResults(result);
  };
  const addResults = (result) => setResults((prev) => [...prev, ...result]);

  const deleteResults = (id) => {
    const newResults = results.filter((result) => result.survey_id !== id);
    setResults(newResults);
  };
  
  // const seeValueOptions = (element) => {};
  
  console.log("results", results);
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
        <p>Click to select the field.</p>
        <div className="row mt-5">
          <div className="list-group col-sm-6 col-md-4">
          <button
                  type="button"
                  className={`list-group-item list-group-item-action active bg-gradient`}
                >Filter by</button>
            {selectedForms.length > 0 ? (
              compareArrays(surveys).map((element, index) => (
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
                  <button type="button"
                  className="bg-dark text-white btn"
                    onClick={() => {
                    setSelected(element)
                    setShowModalFilter(!showModalFilter)
                  }}
                  >Add filter</button>
                </button>
              ))) : (
                <div className="list-group-item">No surveys selected yet</div>
              )}
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

        <div className="list-group col-sm-6 col-md-4">
          <div
                  type="button"
                  className={`list-group-item list-group-item-action bg-dark text-white bg-gradient`}
                >Filters</div>
            {filters.length > 0 ? (
              filters.map(filter => (
                <div className="list-group-item">{`${filter.resultKey} ${filter.symbol} ${filter.expression}`}</div>
              ))
            ) : (
              <div className="list-group-item">No filters added yet</div>
            )}
              
          </div>
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
      
    </Layout>
    
  );
};

export default Reports;
export const getServerSideProps = async () => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/survey`);
  const surveys = await data.json();
  return { props: { surveys } };
};
