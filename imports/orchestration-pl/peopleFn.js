/**
 * This file has functions for accessing information about people in the community.
 *
 * Each function has access to this which will include:
 * {
 *  students: [list of student names],
 *  projects: [list of project names]
 * }
 **/

/**
 * Gets the SIG Head for a project.
 * @return {Promise<*[]>}
 */
export const getSigHeadForProject = async function () {};

/**
 * Gets all students who are on a project.
 * @return {Promise<*[]>}
 */
export const getStudentsOnProject = async function () {};

/**
 * Gets the list of students specified in the script.
 * @return {Promise<[{default: string, type: String | StringConstructor, required: boolean}]|string[]|[{default: string, type: String | StringConstructor, required: boolean}]|*>}
 */
export const getStudentsInScript = async function () {};
