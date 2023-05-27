/* 
A check-in system should already exist in the HTML page:
     <div class="check-in-block">
         <p id="last-check-in-date">Last Check-In: None</p>
         <p id="check-in-count">Count: 0</p>
         <button id="check-in-button">Check In!</button>
     </div>
Which represents
The year, month, and date of the last check-in (initialized to None)
Number of check-ins (initialized to 0)
A button "Check In!"

Here is the logic of this js file: when the user presses the button:
Call checkIn function to get the update check-in time and check-in count.

CheckIn function logic:
Check if there are LastCheckInTime and CheckInCount in localstorage
    If exist:
    - Extract that LastCheckInTime and CheckInCount
    - Get system time
    - Compare with the year, month and date of LastCheckInTime
    - If it is greater than the last check-in time:
        - CheckInCount+1, update LastCheckInTime, store both to localstorage
        - return the check-in time and number of check-ins in the div

    If not:
    - Get system time
    - Store the system time in localstorage with key LastCheckInTime
    - Initialize the number of check-ins to 1, store in localstorage with key CheckInCount
    - return the check-in time and check-in times in the div
*/

document.getElementById('check-in-button').addEventListener('click', function() {
    let result = checkIn();

    // Update the display
    document.getElementById('last-check-in-date').textContent = 'Last Check-In: ' + result.date;
    document.getElementById('check-in-count').textContent = 'Count: ' + result.count;
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

module.exports = checkIn;