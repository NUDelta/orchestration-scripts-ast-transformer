// TODO: consider returning a time-frame for each of these scripts
// e.g., +- 10 mins from the trigger date (though, this should be dependent on the context)
// during: up to 10 mins after the venue has started
// before: up to 10 mins before the timestamp
// after: up to 10 mins after the timestamp

// TODO: if using luxon, good to shift towards its monday-0-index instead of my sunday-0-index

// TODO: this might be messing up due to daylight savings time from using the default date in the studio api
/**
 * Returns a timestamp for when to execute a script during the next instance of a venue.
 * TODO: to support DST, start_time and end_time should be strings like HH:MM, and also timezone.
 * @param venue object with information about the venue. Contains the following:
 * {
 *  name: string name of venue
 *  description: string description of venue
 *  day_of_week: string day of week venue occurs
 *  start_time: string start time of venue in format HH:MM:SS
 *  end_time: string end time of venue in format HH:MM:SS
 *  timezone: string timezone of start and end times for venue
 * }
 * @return {Promise<Date>}
 */
export const during = async function (venue) {};

/**
 * Returns a timestamp for when to execute a script before the next instance of a venue.
 * TODO: support something like "noon the day before"
 * @param venue object with information about the venue. Contains the following:
 * {
 *  name: string name of venue
 *  description: string description of venue
 *  day_of_week: string day of week venue occurs
 *  start_time: string start time of venue in format HH:MM:SS
 *  end_time: string end time of venue in format HH:MM:SS
 *  timezone: string timezone of start and end times for venue
 * }
 * @param timeBefore object used to compute the time before the venue's start_time:
 * {
 *   hours: number of hours
 *   minutes: number of minutes
 *   seconds: number of seconds
 * }
 * @return {Promise<Date>}
 */
export const before = async function (venue, timeBefore) {};

/**
 * TODO: This will not work as expected if time needs to be rounded to be matched.
 * Returns a timestamp for when to execute a script after the next instance of a venue.
 * TODO: support something like "noon the day after a venue"
 * @param venue object with information about the venue. Contains the following:
 * {
 *  name: string name of venue
 *  description: string description of venue
 *  day_of_week: string day of week venue occurs
 *  start_time: string start time of venue in format HH:MM:SS
 *  end_time: string end time of venue in format HH:MM:SS
 *  timezone: string timezone of start and end times for venue
 * }
 * @param timeAfter object used to compute the time after the venue's end_time:
 * {
 *   hours: number of hours
 *   minutes: number of minutes
 *   seconds: number of seconds
 * }
 * @return {Promise<Date>}
 */
export const after = async function (venue, timeAfter) {};

// TODO: write test cases to check this more rigorously.
/**
 * Computes the date and time of the next available venue.
 *
 * (1) get the day index of the current date and target day of the week
 * (2) compute targetDayOfWeekIndex - currDayOfWeekIndex to get the shift that needs to be applied to currDate.
 * (3) if the shift is < 1, add 7 to roll over to next week.
 * (4) add this shift to the current date to get the new date
 * (5) replace the timestamp with the start/end times of the venue.
 * @param targetDayOfWeek
 * @param venueStartTime
 * @param venueEndTime
 * @param timezone
 */
const computeNextVenue = function (targetDayOfWeek, venueStartTime, venueEndTime, timezone) {};

/**
 * Converts a string day of the week to an integer index.
 *
 * @param dayString
 * @return {number}
 */
const dayOfWeekToIndex = function (dayString) {
  let dayIndex;
  switch (dayString) {
    case "Sunday":
      dayIndex = 0;
      break;
    case "Monday":
      dayIndex = 1;
      break;
    case "Tuesday":
      dayIndex = 2;
      break;
    case "Wednesday":
      dayIndex = 3;
      break;
    case "Thursday":
      dayIndex = 4;
      break;
    case "Friday":
      dayIndex = 5;
      break;
    case "Saturday":
      dayIndex = 6;
      break;
  }

  return dayIndex;
};

export const minutesBefore = async (nMinutes) => {};
export const minutesAfter = async (nMinutes) => {};
export const hoursBefore = async (nhours) => {};
export const hoursAfter = async (nhours) => {};
export const daysBefore = async (ndays) => {};
export const daysAfter = async (ndays) => {};
export const weeksBefore = async (nweeks) => {};
export const weeksAfter = async (nweeks) => {};
export const sprintsBefore = async (nsprints) => {};
export const sprintsAfter = async (nsprints) => {};
