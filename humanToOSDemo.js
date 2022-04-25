import {
  transformOSCode,
  humanToOsConfig,
  asyncThisConfig,
} from "./controllers/babelConfigurations.js";
import { prepareCodeForEqualityTesting } from "./imports/utils.js";

// input programs to test
const inputPrograms = [
  //TODO: add test case for predicate like below in async-this.test.js
  function overcommittedOnSprint() {
    applyTo(projects.excludeIf(isPhdStudentProject));

    when(isDayOf(venue("SIG")) && project.sprintLog.isOverCommitted());

    then(
      messageProjectChannel(
        "Looks like you have planned way more than your available points. Let's talk about slicing strategies today during SIG."
      )
    );

    at(minutesBefore(venue("SIG"), 5));
  },
];

// generate output
const outputPrograms = inputPrograms.map((inputProgram) => {
  return transformOSCode(transformOSCode(inputProgram, humanToOsConfig), asyncThisConfig);
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
