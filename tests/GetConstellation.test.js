// constellation.test.js - unit test

// import the test file
// import { getConstellation } from '../src/js/util/GetConstellation.js';

describe('Test getConstellation funtion', () => {
  it('should return the corresponding constellation for a valid date string', () => {
    // Test valid input Month and Day
    // Accept exist date
    // The month should be a string, accepting abbreviations and full, regardless of upper or lower cases.
    // Day should be a number, strings are not accepted.
    // With/without spaces are accepted.
    expect(getConstellation('Jan 11')).toBe('Capricorn');
    expect(getConstellation('Jan11')).toBe('Capricorn');
    expect(getConstellation('January11')).toBe('Capricorn');
    expect(getConstellation('january11')).toBe('Capricorn');

    expect(getConstellation('Feb 21')).toBe('Pisces');
    expect(getConstellation('Feb21')).toBe('Pisces');
    expect(getConstellation('February21')).toBe('Pisces');
    expect(getConstellation('february21')).toBe('Pisces');

    // Add more test cases if you want
  });

  it('should return an error message for an invalid date string', () => {
    // Test incalid date string
    expect(getConstellation('Invalid Date')).toBe('Error: wrong month format.');
    expect(getConstellation('Jan 32')).toBe('Error: wrong day format.');
    expect(getConstellation('Month 11')).toBe('Error: wrong month format.');

    // Add more test cases if you want
  });

  // Input:  String in format MediaMetadata, such as "Jan 11" or "Jan11" or "January11" or "january11" 
// Output: String of the corrspond constellation. If date format nor right, return error Message string.


function getConstellation(dateString) {
    // remove the space, and store month and day to 'month' and 'day'
    const trimmedString = dateString.replace(/\s+/g, "");
    const regex = /([a-zA-Z]+)(\d+)/;
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
          return "Error: wrong month format.";
      }
    }

    // the string format not correct
    return "Error: wrong day format.";
  }

});