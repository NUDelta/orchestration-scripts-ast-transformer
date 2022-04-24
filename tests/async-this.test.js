import { asyncThisTransformerConfig, transformOSCode } from "../controllers/babelTransformers";
import { prepareCodeForEqualityTesting } from "./utils";

/**
 * Applicable set tests
 */
test("applicable set with complex filter", () => {
  let input = function applicableSet() {
    return projects.includeIf(isPhdStudentProject() && isWritingAPaper());
  };

  // prettier-ignore
  let expectedOutput = async function applicableSet() {
    return await this.projects.includeIf((await this.isPhdStudentProject()) && (await this.isWritingAPaper()));
  };

  let transformedCode = transformOSCode(input, asyncThisTransformerConfig);

  // setup received and expected code variables to check equality on
  let [receivedCode, expectedCode] = prepareCodeForEqualityTesting(transformedCode, expectedOutput);
  expect(receivedCode).toMatch(expectedCode);
});

/**
 * Detector tests
 */
test("detector for last SIG meeting", () => {
  let input = function detector() {
    // get time for last sig meeting
    let lastSigMeetingTime = lastSigMeeting();

    // sent notification at the start of the last SIG meeting
    return new Date(lastSigMeetingTime.start_time);
  };

  // prettier-ignore
  let expectedOutput = async function detector() {
    // get time for last sig meeting
    let lastSigMeetingTime = await this.lastSigMeeting();

    // sent notification at the start of the last SIG meeting
    return new Date(lastSigMeetingTime.start_time);
  };

  let transformedCode = transformOSCode(input, asyncThisTransformerConfig);

  // setup received and expected code variables to check equality on
  let [receivedCode, expectedCode] = prepareCodeForEqualityTesting(transformedCode, expectedOutput);
  expect(receivedCode).toMatch(expectedCode);
});

test("detector for having students send updated sprints after SIG", () => {
  let input = function detector() {
    return isDayAfter(venue("SIG"));
  };

  // prettier-ignore
  let expectedOutput = async function detector() {
        return await this.isDayAfter(await this.venue("SIG"));
    };

  let transformedCode = transformOSCode(input, asyncThisTransformerConfig);

  // setup received and expected code variables to check equality on
  let [receivedCode, expectedCode] = prepareCodeForEqualityTesting(transformedCode, expectedOutput);
  expect(receivedCode).toMatch(expectedCode);
});

test("detector for 1 week before Status Update", () => {
  let input = function detector() {
    return isWeekBefore(project.statusUpdateDate);
  };

  // prettier-ignore
  let expectedOutput = async function detector() {
      return await this.isWeekBefore(this.project.statusUpdateDate);
  };

  let transformedCode = transformOSCode(input, asyncThisTransformerConfig);

  // setup received and expected code variables to check equality on
  let [receivedCode, expectedCode] = prepareCodeForEqualityTesting(transformedCode, expectedOutput);
  expect(receivedCode).toMatch(expectedCode);
});

test("detector for overcommitted on sprint", () => {
  let input = function detector() {
    return dayOf(venue("SIG")) && project.sprintLog.isOverCommitted();
  };

  // prettier-ignore
  let expectedOutput = async function detector() {
    return (await this.dayOf(await this.venue("SIG"))) && (await this.project.sprintLog.isOverCommitted());
  };

  let transformedCode = transformOSCode(input, asyncThisTransformerConfig);

  // setup received and expected code variables to check equality on
  let [receivedCode, expectedCode] = prepareCodeForEqualityTesting(transformedCode, expectedOutput);
  expect(receivedCode).toMatch(expectedCode);
});

/**
 * Feedback message tests
 */
test("send feedback to project channel", () => {
  // prettier-ignore
  let input = function feedback() {
    return messageProjectChannel("Remember to send you revised sprint log based on feedback from yesterday's SIG!");
  };

  // prettier-ignore
  let expectedOutput = async function feedback() {
    return await this.messageProjectChannel("Remember to send you revised sprint log based on feedback from yesterday's SIG!");
  };

  let transformedCode = transformOSCode(input, asyncThisTransformerConfig);

  // setup received and expected code variables to check equality on
  let [receivedCode, expectedCode] = prepareCodeForEqualityTesting(transformedCode, expectedOutput);
  expect(receivedCode).toMatch(expectedCode);
});

/**
 * Feedback opportunity tests
 */
test("feedback opportunity 5 mins before SIG", () => {
  // prettier-ignore
  let input = function feedbackOpportunity() {
    return minutesBefore(venue("SIG"), 5);
  };

  // prettier-ignore
  let expectedOutput = async function feedbackOpportunity() {
    return await this.minutesBefore(await this.venue("SIG"), 5);
  };

  let transformedCode = transformOSCode(input, asyncThisTransformerConfig);

  // setup received and expected code variables to check equality on
  let [receivedCode, expectedCode] = prepareCodeForEqualityTesting(transformedCode, expectedOutput);
  expect(receivedCode).toMatch(expectedCode);
});

/**
 * Miscellaneous
 */
test("non-OS function calls", () => {
  // prettier-ignore
  let input = function nonOSFn() {
      let testArray = [];
      return testArray.toString();
    };

  // prettier-ignore
  let expectedOutput = async function nonOSFn() {
      let testArray = [];
      return testArray.toString();
    };

  let transformedCode = transformOSCode(input, asyncThisTransformerConfig);

  // setup received and expected code variables to check equality on
  let [receivedCode, expectedCode] = prepareCodeForEqualityTesting(transformedCode, expectedOutput);
  expect(receivedCode).toMatch(expectedCode);
});

test("refer to OS object", () => {
  // prettier-ignore
  let input = function osObj() {
        let targets = projects;
      };

  // prettier-ignore
  let expectedOutput = async function osObj() {
        let targets = this.projects;
      };

  let transformedCode = transformOSCode(input, asyncThisTransformerConfig);

  // setup received and expected code variables to check equality on
  let [receivedCode, expectedCode] = prepareCodeForEqualityTesting(transformedCode, expectedOutput);
  expect(receivedCode).toMatch(expectedCode);
});

test("non-OS object member", () => {
  // prettier-ignore
  let input = function osObj() {
      return testVar.length;
    };

  // prettier-ignore
  let expectedOutput = async function osObj() {
      return testVar.length;
    };

  let transformedCode = transformOSCode(input, asyncThisTransformerConfig);

  // setup received and expected code variables to check equality on
  let [receivedCode, expectedCode] = prepareCodeForEqualityTesting(transformedCode, expectedOutput);
  expect(receivedCode).toMatch(expectedCode);
});
