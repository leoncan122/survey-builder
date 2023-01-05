const fs = require("fs");

const components = {questions:[{questionText: "Was this event delivered by a cluster?", ddbb_name: "isclusterevent", type: "radio"},
{questionText: "Which cluster delivered the event?", ddbb_name: "cluster", type: "radio"},
{questionText: "Conditional on cluster chosen in previous question: Which FBOs were involved?", ddbb_name: "clusterfbos", type: "checkbox"},
{questionText: "Names of all presenters/facilitators:", ddbb_name: "nameguestspeakers", type: "text"},
{questionText: "Where did this event take place?", ddbb_name: "location", type: "radio"},
{questionText: "List any co-sponsor/co-host who is also a grantee, or indicate N/A if not applicable.", ddbb_name: "partnerorganization1", type: "checkbox"},
{questionText: "List any co-sponsor/co-host who is not a grantee. Eg. Black Health, Health First, etc. Write N/A if none.", ddbb_name: "partnerorganization2", type: "checkbox"},
{questionText: "Was this part of a National Awareness Day?", ddbb_name: "nationalawarenessday", type: "checkbox"},
{questionText: "Who was your target audience? Select all that apply.", ddbb_name: "targetaudience", type: "checkbox"},
{questionText: "Total number of people at event", ddbb_name: "totalattendees", type: "number"},
{questionText: "Please write the number of how many of each of the following resources you distributed at the event. (Please only enter numbers next to each of these resource categories.)", ddbb_name: "resourcesDistributed", type: "number"},
{questionText: "How many people did you talk to, where you had a conversation about HIV, PrEP, or safer sex? (Please enter the total number only.)", ddbb_name: "totaltalkedhivprepsafersex", type: "number"},
{questionText: "What were the main discussion topics people raised about HIV, PrEP, or safer sex?", ddbb_name: "eventquestions", type: "text"},
{questionText: "Event narrative: Please briefly describe the details of your event. Please note any highlights, such as a special guest or title of a film you showed that discussed HIV, PrEP and/or safer sex.", ddbb_name: "eventhighlights", type: "text"},
{questionText: "Event challenges: Please briefly describe any challenges you faced when organizing or running your event.", ddbb_name: "eventchallenges", type: "text"},
{questionText: "Capacity Trainings: What have you learned from the Black Health capacity trainings, including ALI and YIP, during this quarter? How was the information useful to you and the community you serve?", ddbb_name: "capacitytraininguseful", type: "text"},
{questionText: "Lessons Learned: Describe any new approaches or strategic lessons you will implement for the next event, and that can be shared with other event organizers.", ddbb_name: "lessonslearned", type: "text"},
{questionText: "Upload supporting documentation - upload any flyers here", ddbb_name: "docUploadDropbox", type: "file"},
{questionText: "Upload an event picture here:", ddbb_name: "pictureUploadDropbox", type: "file"},
{questionText: "Upload another event picture", ddbb_name: "pictureUploadDropbox2", type: "file"},
{questionText: "Upload another event picture", ddbb_name: "pictureUploadDropbox3", type: "file"},

]}
let types = {
    default: ({nameCompo,questionText, type, nameDB }) => `import React from "react";

    const ${nameCompo} = ({form,setForm}) => {
    const options = []
      return (
        <div className='question-body'>
          <h2 className="mb-7 font-black">${questionText}</h2>
          <div>
        {options.map(opt => (

          <label >
            <input type="${type}" className="border-black rounded" value={opt.value} id={opt.id} name="${nameDB}" onChange={(e) => setForm(prev=> ({...prev, [e.target.name]: e.target.value}))} />
            
          </label>
        ))}
           </div> 
        </div>
      );
    };
    
    export default ${nameCompo};
    `
}
export default async function handler(req, res) {
    console.log(req);
    components.questions.forEach((que, index) => {
        const body = types.default(que)
        fs.writeFile(
            `components/oef-post-event-survey/${que.ddbb_name}.js`,
            body,
            {
              encoding: "utf8",
              
            },
            (err) => {
              if (err) console.log(err);
              else {
                console.log("File written successfully\n");
                console.log("The written has the following contents:");
                res.status(200)
              }
            }
          );
    })
   
  }



