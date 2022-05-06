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
    // for these people or projects
    applyTo(projects.excludeIf(isPhdStudentProject));

    // when this happens
    when(
      isDayOf(venues.sig) &&
        project.sprintLog.committedPoints >= 1.25 * project.sprintLog.availablePoints
    );

    // then provide this feedback
    then(
      message(
        "Looks like your students have planned way more than their available points. If applicable, try to discuss slicing strategies with them during SIG.",
        project.sigHead
      )
    );

    // at this venue
    at(minutesBefore(venues.sig, 5));
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

  // TODO: add a script for creating all the components that need to be saved in the OS (minus name and description)
  // this is where any missing components can get added in
  // for test cases, think about the different configuations that can be passed in:
  // (1) full script
  // (2) full script missing repeat
  // (3) script missing at() and repeat()
  // (4) script with only applyTo() and then() and at() -- this is the kind that might come from a SOAP notes
  // (5) error handling if any of these configurations are not supplied
  console.log("OS Components");
  console.log(await Function(`return ${formattedOutput}`)()());
  console.log("-------------------------------------------------------");
}
