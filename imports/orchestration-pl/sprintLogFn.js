/**
 * This file has API functions for accessing data from the Sprint Log.
 *
 * Each function has access to this which will include:
 * {
 *  students: [list of student names],
 *  projects: [list of project names]
 * }
 **/

// TODO: this can be made into a generic that looks for any single or multiple key words/phrases
/**
 * Checks if a sprint has a prototype task planned.
 *
 * @param taskList
 * @return {Promise<boolean>}
 */
export const hasPrototypeTask = async function (taskList) {};

/**
 *
 * @return {Promise<*[]>}
 */
export const getTasksForSprint = async function () {};

export const getCurrentSprintLog = async function () {};

export const isOverCommitted = async function () {};

// TODO: this should be in a separate controller
/**
 *
 * @param projectName
 * @return {Promise<any>}
 */
const getSprintLogForProject = async function (projectName) {};

/**
 *
 * @return {Promise<any>}
 */
const getCurrentSprint = async function () {};
