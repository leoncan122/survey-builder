import { Layout } from "./[id]/Layout";

const MySurveys = ({ data }) => {
  // console.log("dsad", data[2].createdAt);
  const deleteSurvey = async (id) => {
    try {
      const res = await fetch(`http://localhost:3500/survey/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data) console.log("deleted succesful");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Layout>
      <section id="mysurveys-container">
        <h1>My surveys</h1>
        {data?.map((survey) => (
          <>
            <div class="row">
              <div class="col-sm-6 col-md-4">
                <div class="thumbnail">
                  <img src="images.jfif" alt="survey-img" />
                  <div class="caption">
                    <h3>{JSON.parse(survey.content).title}</h3>
                    <p>{survey.createdat.split('T')[0]}</p>
                    <p>
                      <a
                        href={`dashboard/${survey.id}`}
                        class="btn btn-primary"
                        role="button"
                      >
                        Dashboard
                      </a>{" "}
                      <a
                        href={`/${survey.id}/edit`}
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
            {/* <div className="survey-card">
              <p>{new Date(survey.createdAt).toLocaleDateString()}</p>
              <p>{survey.name}</p>
              <div><a href={`/${survey.id}`}>Run</a></div>
              <a href={`/${survey.id}/edit`}>Edit</a>
              <div><button onClick={() => deleteSurvey(survey.id)}>Delete</button></div>
            </div> */}
          </>
        ))}
      </section>
    </Layout>
  );
};
export default MySurveys;

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:3500/survey`);
  const data = await res.json();
  return { props: { data: data } };
}
