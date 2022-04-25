import { transformOSCode, asyncThisConfig } from "./controllers/babelConfigurations.js";
import { prepareCodeForEqualityTesting } from "./imports/utils.js";

import {
  objectIdentifiers,
  functionIdentifiers,
} from "./imports/orchestration-pl/identifierSet.js";

// input programs to test
const inputPrograms = [
  // select student projects who are writing papers
  function applicableSet() {
    return projects.includeIf(isPhdStudentProject() && isWritingAPaper());
  },

  // check if its the last SIG meeting
  function detector() {
    // get time for last sig meeting
    let lastSigMeetingTime = lastSigMeeting();
    lastSigMeetingTime.toString();

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

  // send feedback 5 minutes before SIG meeting
  function feedbackOpportunity() {
    return minutesBefore(venue("SIG"), 5);
  },
];

// generate output
const outputPrograms = inputPrograms.map((inputProgram) => {
  return transformOSCode(inputProgram, asyncThisConfig);
});

// print input and transformed output code
for (let i = 0; i < inputPrograms.length; i++) {
  let [formattedOutput, formattedInput] = prepareCodeForEqualityTesting(
    outputPrograms[i].toString(),
    inputPrograms[i].toString(),
    true
  );

  console.log(`input code: \n${formattedInput} \n`);
  console.log(`output code: \n${formattedOutput}`);
  console.log("-------------------------------------------------------");
}
