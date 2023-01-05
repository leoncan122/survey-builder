import React from "react";
import { Layout } from "../../../components/Layout";

const SurveyOutputResults = ({ data }) => {
  // console.log("results", data);
  const headers = data[0]?.result && Object.keys(data[0]?.result);
  const surveyTitle = JSON.parse(data[0]?.content).title;
  return (
    <Layout>
      <section className="container table-responsive mt-5">
        <h1>{surveyTitle}</h1>
        <h2>Results</h2>

        <table class="table mt-5">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">By</th>
              {headers?.map((title) => (
                <th scope="col">{title}</th>
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
                    {headers?.map((title) => (
                      <td scope="col">{element.result[title]}</td>
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

export default SurveyOutputResults;
export async function getServerSideProps(ctx) {
  const { id } = ctx.params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/survey/all_result_by_survey_id/${id}`
  );

  const data = await response.json();
  return { props: { data } };
}
