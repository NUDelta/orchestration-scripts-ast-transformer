# Orchestration Scripts AST Transformer

This repo provides a demo and playground for seeing how orchestration script code written with the
orchestration programming language can be transformed into representations that the orchestration
execution engine can use.

## Design Goal

Due to the way the orchestration execution environment works and the need for most of the OS
language functions to be asynchronous (since they query an external Studio API), writing code for
orchestration scripts can be syntactically messy, requiring the user to add async/await flags and
this.keywords for any OS functions. For instance, these are the script components that need to be
specified for prompting students 1 week before their status updates:

```javascript
// who the script should apply to
async function applicableSet() {
  return await this.projects({ filter: this.nonPhdProjects() });
}

// when the script should run
async function detector() {
  return await this.isWeekBefore(this.project.statusUpdateDate);
}

// what feedback should be provided and when
async function feedback() {
  return await this.messageProjectChannel(
    `You have a status update in 1 week!
        Make sure to meet with your mentor to discuss your plan.`
  );
}

// when the feedback should be delivered
async function feedbackOpportunity() {
  return await this.venue("Studio");
}
```

There are a couple issues that are worth trying to resolve:

1. Can the `async/await` flags and `this` keywords be added after the script has been composed?
   These are needed for execution, but are just clutter for script writers.

2. Instead of having a mentor specify each of the components above as separate functions, is there a
   way to provide a more natural code interface that speaks at the level of a script they want to
   support? For example:
   - **for** projects that are not Ph.D. student projects
   - **when** it's the week before the project's status update,
   - **then** message the project's slack channel with, _"You have a status update in 1 week! Make
     sure to meet with your mentor to discuss your plan."_
   - **at** studio meeting

## Approach

To resolve the issues above, this repo explores using [babel](https://babeljs.io/) to transform a
human-friendly version of the orchestration script into a machine-friendly executable version. We do
this by writing a custom babel plugin that parses the AST of the original code, and makes
adjustments to it so that it's in a form that the orchestration engine is expecting (e.g., by adding
`async/await` and `this` to OS function calls).

This, for example, would let us write the following to define a simple trigger to send a message
during a SIG meeting in a more human-readable form (top) that then gets transformed into what the
orchestration engine needs:

```javascript
// input code (what a mentor would write)
function feedbackOpportunity() {
  return during(venue("SIG"));
}

// output code (what the engine will use to execute)
async function feedbackOpportunity() {
  return await this.during(await this.venue("SIG"));
}
```

## Installation

1. Make sure you have [Node.js](https://nodejs.org/en/) and
   [yarn](https://classic.yarnpkg.com/en/docs/install#mac-stable) installed.

2. Run `yarn install` to install packages.

## Usage

### Demo 1: adding async/await flags and this keywords to OS code

Run this demo by running `yarn async-this-demo`. One example of this transformation looks like:

```javascript
//input code:
function applicableSet() {
  return projects.includeIf(isPhdStudentProject() && isWritingAPaper());
}

// output code:
async function applicableSet() {
  return await this.projects.includeIf(
    (await this.isPhdStudentProject()) && (await this.isWritingAPaper())
  );
}
```

### Demo 2: tranforming human-friendly OS code to machine-executable representation

Run this demo by running `yarn human-to-os-demo`. One example of this transformation looks like
this:

```javascript
// input program
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
}

// output program
async function overcommittedOnSprint() {
  return {
    applicableSet: async function () {
      return await this.projects.excludeIf(this.isPhdStudentProject);
    },
    detector: async function () {
      return (
        (await this.isDayOf(this.venues.sig)) &&
        this.project.sprintLog.committedPoints >= 1.25 * this.project.sprintLog.availablePoints
      );
    },
    feedback: async function () {
      return await this.message(
        "Looks like your students have planned way more than their available points. If applicable, try to discuss slicing strategies with them during SIG.",
        this.project.sigHead
      );
    },
    feedbackOpportunity: async function () {
      return await this.minutesBefore(this.venues.sig, 5);
    },
  };
}
```

## Tests

Testing code for a larger set of examples is also included in `./tests/`. These can be run with
`yarn test`.
