import { Layout } from "../components/Layout";
const MySurveys = ({ data }) => {
  // console.log("dsad", data[2].createdAt);
  const deleteSurvey = async (id) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/survey/${id}`, {
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
        <div className="row">

        {data?.map((survey) => (
          <>
              <div className="col-sm-12 col-md-4 col-xl-3">
                <div className="thumbnail">
                  <img src="images.jfif" alt="survey-img" className="img-fluid"/>
                  <div className="caption">
                    <h3>{JSON.parse(survey.content).title}</h3>
                    <p>{survey.createdat.split('T')[0]}</p>
                    <p>
                      <a
                        href={`dashboard/${survey.id}`}
                        className="btn btn-primary"
                        role="button"
                      >
                        Dashboard
                      </a>{" "}
                      <a
                        href={`/${survey.id}/survey`}
                        className="btn btn-secondary"
                        role="button"
                      >
                        Run
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            
          </>
        ))}
            </div>

      </section>
    </Layout>
  );
};
export default MySurveys;

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/survey`);
  console.log(res);
  const data = await res.json();
  return { props: { data: data } };
}
