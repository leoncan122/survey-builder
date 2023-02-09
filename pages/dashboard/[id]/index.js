import React from "react";
import { Layout } from "../../../components/Layout";
import Link from "next/link";
import { Button } from "@leoncan122/react-form-lib";

const Index = ({ data, relatedSurveys }) => {
  console.log(data);
  // const headers = data[0]?.result && Object.keys(data[0]?.result);

  return (
    <Layout>
      <section class="container mt-5">
        <h1>{JSON.parse(data[0]?.content).title}</h1>
        <h2>Dashboard</h2>
        <h2 class="mt-5">What do you want to do today?</h2>
        <div class="d-flex gap-3" role="group" aria-label="dashboard-buttons">
          <div class="btn-group" role="group">
            <button type="button" class="btn btn-primary">
              Download csv
            </button>
          </div>
          <div class="btn-group" role="group">
            <a
              type="button"
              class="btn btn-primary"
              href={`${data[0].id}/surveyOutputResults`}
            >
              Make report
            </a>
          </div>
          <div class="btn-group" role="group">
            <a
              type="button"
              class="btn btn-primary"
              href={`editor/${data[0].id}`}
            >
              Edit survey
            </a>
          </div>
        </div>

        <h3 className="mt-5 mb-3">Relational surveys</h3>
        <div class="row gap-3">
          {/* <div class=""> */}
            {relatedSurveys?.map((survey) => (
              <div class="col-sm-6 col-md-3 card">
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title">{JSON.parse(survey.content).title}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">{survey.createdat.split("T")[0]}</h6>
                  <p class="card-text">This survey has a 1 to many relation with each of the main's output survey</p>
                  <a
                    href={`/editor/${survey.id}/related-survey`}
                    class="btn btn-secondary mt-auto align-self-start"
                    role="button"
                  >
                    Edit
                  </a>
                </div>
              </div>
            ))}
            <div class="card col-sm-6 col-md-3">
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">Add new Survey</h5>
                <h6 class="card-subtitle mb-2 text-muted">Today's date</h6>
                <p class="card-text">This survey has a 1 to many relation with each of the main's output survey</p>

                <a href={`/creator/${data[0].id}/related-survey`} class="btn btn-secondary mt-auto align-self-start" role="button">
                  Add
                </a>
              </div>
            </div>
          {/* </div> */}
        </div>
      </section>
      <section class="container table-responsive mt-5">
        <table class="table">
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
                    ))}
                  </tr>
                </>
              ))}
          </tbody>
        </table>
        {/* <Button label="I am in the library"/> */}
      </section>
    </Layout>
  );
};

export default Index;
export const getServerSideProps = async (ctx) => {
  const { id } = ctx.params;
  const [data, relatedSurveys] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/survey/all_result_by_survey_id/${id}`).then(
      (r) => r.json()
    ),
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/survey/all_related/${id}`).then((r) =>
      r.json()
    ),
  ]);
  return { props: { data, relatedSurveys } };
};
