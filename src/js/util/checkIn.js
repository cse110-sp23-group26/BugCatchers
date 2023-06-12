/*
	This script handles the logic for a check-in system. It consists of two main functions:
	1. checkIn(): Triggered by a button click, it updates and displays the last check-in date and check-in count.
	2. initializeCheckIn(): On page load, it retrieves and displays the last check-in date and check-in count from localStorage.
*/

// Function to handle check-ins
export function checkIn() {
	let currentDate = new Date();

	// Retrieve the last check-in date and count from localStorage
	let lastCheckInDate = localStorage.getItem("LastCheckInTime");
	let checkInCount = parseInt(localStorage.getItem("CheckInCount")) || 0;

	// If there's a previous check-in date and it's earlier than the current date, increment the count
	if (lastCheckInDate) {
		let lastDate = new Date(lastCheckInDate);
		if (currentDate.setHours(0,0,0,0) > lastDate.setHours(0,0,0,0)) {
			checkInCount++;
		}
	} else {
		// If this is the first check-in, initialize the count to 1
		checkInCount++;
	}

	// Update localStorage and return the new check-in date and count
	localStorage.setItem("LastCheckInTime", currentDate);
	localStorage.setItem("CheckInCount", checkInCount);

	return {
		date: currentDate.toISOString().split("T")[0],
		count: checkInCount
	}
}

// Function to initialize check-in data on page load
export function initializeCheckIn() {
	let lastCheckInDate = localStorage.getItem("LastCheckInTime");
	let checkInCount = localStorage.getItem("CheckInCount");

	if (lastCheckInDate) {
		document.getElementById("last-check-in-date").textContent = "Last Check-In: " + new Date(lastCheckInDate).toISOString().split("T")[0];
	}

	if (checkInCount) {
		document.getElementById("check-in-count").textContent = "Count: " + checkInCount;
	}
}

// Event listener for the check-in button
document.getElementById("check-in-button").addEventListener("click", function() {
	let result = checkIn();

	// Update the display
	document.getElementById("last-check-in-date").textContent = "Last Check-In: " + result.date;
	document.getElementById("check-in-count").textContent = "Count: " + result.count;
});

// Initialize check-in data on page load
document.addEventListener("DOMContentLoaded", initializeCheckIn);

// Uncomment for use with Node.js
// module.exports = checkIn;
