import React from "react";
import { Layout } from "../../[id]/Layout";

const Index = ({ data }) => {
  const headers = Object.keys(data[0].result);

  return (
    <Layout>
      <section class="container mt-5">
      <h1>{JSON.parse(data[0].content).title}</h1>
        <h2>Dashboard</h2>
        <h2 class="mt-5">What do you want to do today?</h2>
        <div class="d-flex gap-3" role="group" aria-label="dashboard-buttons">
        <div class="btn-group" role="group">
          <button type="button" class="btn btn-primary">Download csv</button>
        </div>
        <div class="btn-group" role="group">
          <button type="button" class="btn btn-primary">Make report</button>
        </div>
        <div class="btn-group" role="group">
          <button type="button" class="btn btn-primary">Edit survey</button>
        </div>
</div>
      </section>
      <section class="container table-responsive mt-5">
        
        <table class="table">
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

export default Index;
export const getServerSideProps = async (ctx) => {
  const { id } = ctx.params;
  const res = await fetch(
    `http://localhost:3500/survey/all_result_by_survey_id/${id}`
  );
  const data = await res.json();
  return { props: { data } };
};
