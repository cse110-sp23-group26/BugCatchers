// Input:  String in format MediaMetadata, such as "Jan 11" or "Jan11" or "January11" or "january11" 
// Output: String of the corrspond constellation. If date format nor right, return error Message string.

/**
 * Given a date, calculates which zodiac sign the date falls into.
 * @param {string} dateString - A string representing the input date
 * @returns {string} - The zodiac sign corresponding to the date
 */
export function getConstellation(dateString) {
	// remove the space, and store month and day to 'month' and 'day'
	const trimmedString = dateString.replace(/\s+/g, " ");  // Now this replaces multiple spaces with a single space
	const regex = /([a-zA-Z]+)\s*(\d+)/;  // This regular expression also considers a possible space after the month
	const matches = trimmedString.match(regex);

	if (matches) {
		const month = matches[1].toUpperCase();
		const day = parseInt(matches[2]);

		switch (month) {
			case "JAN":
			case "JANUARY":
				if (day >= 1 && day <= 19) {
					return "Capricorn";
				} else if (day >= 20 && day <= 31) {
					return "Aquarius";
				}
				break;
			case "FEB":
			case "FEBRUARY":
				if (day >= 1 && day <= 18) {
					return "Aquarius";
				} else if (day >= 19 && day <= 29) {
					return "Pisces";
				}
				break;
			case "MAR":
			case "MARCH":
				if (day >= 1 && day <= 20) {
					return "Pisces";
				} else if (day >= 21 && day <= 31) {
					return "Aries";
				}
				break;
			case "APR":
			case "APRIL":
				if (day >= 1 && day <= 19) {
					return "Aries";
				} else if (day >= 20 && day <= 30) {
					return "Taurus";
				}
				break;
			case "MAY":
				if (day >= 1 && day <= 20) {
					return "Taurus";
				} else if (day >= 21 && day <= 31) {
					return "Gemini";
				}
				break;
			case "JUN":
			case "JUNE":
				if (day >= 1 && day <= 20) {
					return "Gemini";
				} else if (day >= 21 && day <= 30) {
					return "Cancer";
				}
				break;
			case "JUL":
			case "JULY":
				if (day >= 1 && day <= 22) {
					return "Cancer";
				} else if (day >= 23 && day <= 31) {
					return "Leo";
				}
				break;
			case "AUG":
			case "AUGUST":
				if (day >= 1 && day <= 22) {
					return "Leo";
				} else if (day >= 23 && day <= 31) {
					return "Virgo";
				}
				break;
			case "SEP":
			case "SEPTEMBER":
				if (day >= 1 && day <= 22) {
					return "Virgo";
				} else if (day >= 23 && day <= 30) {
					return "Libra";
				}
				break;
			case "OCT":
			case "OCTOBER":
				if (day >= 1 && day <= 22) {
					return "Libra";
				} else if (day >= 23 && day <= 31) {
					return "Scorpio";
				}
				break;
			case "NOV":
			case "NOVEMBER":
				if (day >= 1 && day <= 21) {
					return "Scorpio";
				} else if (day >= 22 && day <= 30) {
					return "Sagittarius";
				}
				break;
			case "DEC":
			case "DECEMBER":
				if (day >= 1 && day <= 21) {
					return "Sagittarius";
				} else if (day >= 22 && day <= 31) {
					return "Capricorn";
				}
				break;
			default:
				console.log("please check your month input")
				return false;
		}
	}

	// the string format not correct
	console.log("please check your day input")
	return false;
}
