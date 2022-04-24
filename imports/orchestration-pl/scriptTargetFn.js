/**
 * This file has functions for defining script targets.
 *
 * All functions must return the following object:
 * {
 *  students: [list of student names],
 *  projects: [list of project names]
 * }
 */

/**
 * Returns all projects in the studio, and the students on them.
 * @return {Promise<{projects: *[], students}>}
 */
export const getAllProjects = async function () {};

/**
 * Returns all projects in a sig, and the students on those projects.
 * @param sigName
 * @return {Promise<*[]>}
 */
export const getProjectsInSig = async function (sigName) {};

export const getNonPhdProjects = async function () {};

/**
 * Returns all students in the studio, and their projects.
 * @return {Promise<{projects: *[], students}>}
 */
export const getAllStudents = async function () {};

/**
 * Returns all students in a sig, and their projects.
 * @param sigName string SIG to get students and projects in.
 * @return {Promise<*[]>}
 */
export const getStudentsInSig = async function (sigName) {};

/**
 * Returns all non-Ph.D. students (i.e., masters and undergrads) in the studio, and their projects.
 * @return {Promise<{projects: *[], students}>}
 */
export const getNonPhdStudents = async function () {};

/**
 * Returns all Ph.D. students in the studio, and their projects.
 * @return {Promise<{projects: *[], students}>}
 */
export const getPhdStudents = async function () {};

/**
 * Returns all faculty in the studio. Projects is left empty.
 * @return {Promise<{projects: *[], students}>}
 */
export const getFaculty = async function () {};

/**
 * Return a list of student objects for all students in the community.
 * @return {Promise<*[]>}
 */
const getAllStudentObjs = async function () {};

/**
 * Returns a list of project objects for a list of student names.
 * @param studentNames
 * @return {Promise<*[]>}
 */
const getAllProjectObjsForStudentList = async function (studentNames) {};
