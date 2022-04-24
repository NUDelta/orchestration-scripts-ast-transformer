import * as scriptTargetFn from "./scriptTargetFn.js";
import * as sprintLogFn from "./sprintLogFn.js";
import * as venueFn from "./venueFn.js";
import * as triggerFn from "./triggerFn.js";
import * as communicationFn from "./communicationFn.js";
import * as peopleFn from "./peopleFn.js";
import * as projectFn from "./projectFn.js";
import * as predicateFn from "./predicateFn.js";
import * as filterFn from "./filtersFn.js";

import { sig, sigs } from "./objects/sigs.js";
import { student, students } from "./objects/students.js";
import { projects, project } from "./objects/projects.js";
import { committees, committee } from "./objects/committees.js";

const allObjects = {
  sig,
  sigs,
  student,
  students,
  project,
  projects,
  committee,
  committees,
};

const allFunctions = {
  ...scriptTargetFn,
  ...sprintLogFn,
  ...venueFn,
  ...triggerFn,
  ...communicationFn,
  ...peopleFn,
  ...projectFn,
  ...predicateFn,
  ...filterFn,
};

export const objectIdentifiers = new Set(Object.keys(allObjects));
export const functionIdentifiers = new Set(Object.keys(allFunctions));
