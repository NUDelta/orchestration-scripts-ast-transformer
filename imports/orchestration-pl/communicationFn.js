/**
 * This file has functions for determining who and how to communicate with people.
 *
 * Each function has access to this which will include:
 * {
 *  students: [list of student names],
 *  project: "project name",
 *  message: "message to send",
 *  resources: [
 *    {
 *      link: "link to resource",
 *      description: "description text about resource to help someone use it"
 *    }
 *  ]
 * }
 **/

// TODO: support message (with text and/or resources) being inject this into the function
/**
 * Sends a message to a Project Channel, given a project and message.
 * @return {Promise<void>}
 */
export const messageProjectChannel = async function () {};

/**
 * Sends a message to a SIG Channel, given a project and message.
 * @return {Promise<void>}
 */
export const messageSigChannel = async function () {};

/**
 * Sends a direct message to a SIG head.
 * @return {Promise<void>}
 */
export const messageSigHead = async function () {};

/**
 * Sends a direct message to a student.
 * @return {Promise<void>}
 */
export const messageStudent = async function () {};

// TODO: fix to use single project (this is old code)
export const getSlackChannelForProject = async function () {};

// TODO: why does this take an input instead of using the info from this?
export const getSlackIdForPerson = async function (people) {};

export const message = async function (messageText, target, opportunity) {};
