require('jest-localstorage-mock');
const checkIn = require('../src/js/util/CheckIn.js');

describe('Test checkIn function', () => {
    beforeEach(() => {
        localStorage.removeItem('LastCheckInTime');
        localStorage.removeItem('CheckInCount');
    });
  
    it('First check in', () => {
        const result = checkIn();
        const today = new Date();
        const expectedDate = `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`;
      
        expect(result.date).toBe(expectedDate);
        expect(result.count).toBe(1);
  
        expect(localStorage.getItem('CheckInCount')).toBe('1');
        expect(new Date(localStorage.getItem('LastCheckInTime')).toLocaleDateString()).toBe(new Date().toLocaleDateString());
    });
  
    // Add more test cases if you want
    // such as testing what happens if the user has already checked in today
    // or what happens if the user last checked in yesterday, etc.
  });