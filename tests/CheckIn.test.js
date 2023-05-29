require('jest-localstorage-mock');
// const checkIn = require('../src/js/util/CheckIn.js');



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


  function checkIn() {
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth() + 1;  // Months are 0-based
    let currentDay = currentDate.getDate();

    let lastCheckInDate = localStorage.getItem('LastCheckInTime');
    let checkInCount = parseInt(localStorage.getItem('CheckInCount')) || 0;

    if (lastCheckInDate) {
        lastCheckInDate = new Date(lastCheckInDate);
        let lastYear = lastCheckInDate.getFullYear();
        let lastMonth = lastCheckInDate.getMonth() + 1;
        let lastDay = lastCheckInDate.getDate();

        // If current date is later than the last check-in date
        if (currentYear > lastYear || 
            (currentYear == lastYear && currentMonth > lastMonth) ||
            (currentYear == lastYear && currentMonth == lastMonth && currentDay > lastDay)) {
            checkInCount++;
        }
    } else {
        // This is the first check-in
        checkInCount++;
    }

    // Update the last check-in date and check-in count in local storage
    localStorage.setItem('LastCheckInTime', currentDate);
    localStorage.setItem('CheckInCount', checkInCount);

    return {
        date: `${currentYear}/${currentMonth}/${currentDay}`,
        count: checkInCount
    }
}