// constellation.test.js - unit test

// import the test file
import { getConstellation } from '../src/js/util/GetConstellation.js';

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
});