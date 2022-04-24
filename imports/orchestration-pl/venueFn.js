/**
 * This file has functions for accessing information about venues.
 *
 * Each function has access to this which will include:
 * {
 *  students: [list of student names],
 *  projects: [list of project names]
 * }
 **/

// TODO: separate out the logic here into smaller controllers
/**
 * Gets the start and end time that a venue with a given name is occurring.
 * @param venueName
 * @return object with information about the venue. Contains the following:
 * {
 *  name: string name of venue
 *  description: string description of venue
 *  day_of_week: string day of week venue occurs
 *  start_time: string start time of venue in format HH:MM:SS
 *  end_time: string end time of venue in format HH:MM:SS
 *  timezone: string timezone of start and end times for venue
 * }
 */
export const venue = async function (venueName) {};

/**
 * Gets the start and end time of the first SIG meeting of the quarter.
 * @return {Promise<*>}
 */
export const firstSigMeeting = async function () {};

/**
 * Gets the start and end time of the last SIG meeting of the quarter.
 * @return {Promise<*>}
 */
export const lastSigMeeting = async function () {};

// TODO: have a venue trigger for immediate that just returns true so that the script runs immediately
