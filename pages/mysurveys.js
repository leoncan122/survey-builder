import { Layout } from "./[id]/Layout";

const MySurveys = ({ data }) => {
  // console.log("dsad", data[2].createdAt);
  const deleteSurvey = async(id) => {
    try {
      const res = await fetch(`http://localhost:3500/survey/${id}`, {
        method: "DELETE"
      })
      const data = await res.json();
      if (data) console.log("deleted succesful") 
    }catch(e) {
      console.log(e)
    }
  }
  return (
    <>
      <section id="mysurveys-container">
        {data?.map((survey) => (
          <>
            <div className="survey-card">
              <p>{new Date(survey.createdAt).toLocaleDateString()}</p>
              <p>{survey.name}</p>
              <div><a href={`/${survey.id}`}>Run</a></div>
              <a href={`/${survey.id}/edit`}>Edit</a>
              <div><button onClick={() => deleteSurvey(survey.id)}>Delete</button></div>
            </div>
          </>
        ))}
      </section>
    </>
  );
};
export default MySurveys;

export async function getServerSideProps() {
  const response = await fetch(`http://localhost:3500/survey`);
  const data = await response.json();

  return { props: { data } };
}
