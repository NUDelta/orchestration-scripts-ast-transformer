import { asyncThisTransformerConfig, transformOSCode } from "./controllers/babelTransformers.js";

// input programs to test
const inputCodes = [
  // check if its the last SIG meeting
  function detector() {
    // get time for last sig meeting
    let lastSigMeetingTime = lastSigMeeting();
    lastSigMeetingTime.toString(); // TODO: this is a failure case. this should not have an await

    // sent notification at the start of the last SIG meeting
    return new Date(lastSigMeetingTime.start_time);
  },

  // check if project is overcommitted
  function detector() {
    let currentSprint = getCurrentSprintLog();
    let currPointsCommitted = currentSprint.totalPoints.points_committed.total;
    let currPointsAvailable = currentSprint.totalPoints.point_available;

    return currPointsCommitted >= 1.25 * currPointsAvailable;
  },

  // send feedback during SIG
  function feedbackOpportunity() {
    return during(venue("SIG"));
  },
];

// generate output
const outputCodes = inputCodes.map((inputCode) => {
  return transformOSCode(inputCode, asyncThisTransformerConfig);
});

// print input and transformed output code
for (let i = 0; i < inputCodes.length; i++) {
  console.log(`input code: \n${inputCodes[i].toString()} \n`);
  console.log(`output code: \n${outputCodes[i].toString()}`);
  console.log("-------------------------------------------------------");
}
