import React from "react";
import { Layout } from "../../[id]/Layout";

const Index = ({ data, relatedSurveys }) => {
  // console.log(data);
  // const headers = data[0]?.result && Object.keys(data[0]?.result);

  return (
    <Layout>
      <section class="container mt-5">
        <h1>{JSON.parse(data[0].content).title}</h1>
        <h2>Dashboard</h2>
        <h2 class="mt-5">What do you want to do today?</h2>
        <div class="d-flex gap-3" role="group" aria-label="dashboard-buttons">
          <div class="btn-group" role="group">
            <button type="button" class="btn btn-primary">
              Download csv
            </button>
          </div>
          <div class="btn-group" role="group">
              <a type="button" class="btn btn-primary" href={`${data[0].id}/surveyOutputResults`}>Make report</a>
          </div>
          <div class="btn-group" role="group">
              <a type="button" class="btn btn-primary" href={`/${data[0].id}/edit`}>Edit survey</a>
          </div>
        </div>
        {relatedSurveys?.map((survey) => (
          <>
            <h3 className="mt-5 mb-3">Relational surveys</h3>
            <div class="row ">
              <div class="col-sm-6 col-md-4">
                <div class="thumbnail">
                  <img src="images.jfif" alt="survey-img" />
                  <div class="caption">
                    <h3>{JSON.parse(survey.content).title}</h3>
                    <p>{survey.createdat.split("T")[0]}</p>
                    <p>
                      {/* <a
                        // href={`/dashboard/${survey.id}`}
                        class="btn btn-primary"
                        role="button"
                      >
                        Dashboard
                      </a>{" "} */}
                      <a
                        href={`/${survey.id}/editRelatedSurvey`}
                        class="btn btn-secondary"
                        role="button"
                      >
                        Edit
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
      </section>
      <section class="container table-responsive mt-5">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">By</th>
              {relatedSurveys?.map((survey) => (
                      <th scope="col">{JSON.parse(survey.content).title}</th>
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
                      <td scope="col"><a href={`/${survey.id}/relatedSurvey`}>Run</a></td>
                    ))}
                  </tr>
                </>
              ))}
          </tbody>
        </table>
        
      </section>
    </Layout>
  );
};

export default Index;
export const getServerSideProps = async (ctx) => {
  const { id } = ctx.params;
  const [data, relatedSurveys] = await Promise.all([
    fetch(`http://localhost:3500/survey/all_result_by_survey_id/${id}`).then(
      (r) => r.json()
    ),
    fetch(`http://localhost:3500/survey/all_related/${id}`).then((r) =>
      r.json()
    ),
  ]);
  return { props: { data, relatedSurveys } };
};
