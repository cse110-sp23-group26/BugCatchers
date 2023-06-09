// Given a string representing a constellation (such as Pisces), return two values.
// The first value is a string, which is an introduction to this constellation.
// The second value is a value representing the color available for JS, 
// which is more suitable for the given constellation and is dark. 
// This dark color can be used as the background color, because our text is all white.

/**
 * Given a constellation / zodiac sign, return its information and color.
 * @param {string} constellation - The input constellation / zodiac sign to get the color of
 * @returns {Array} - An array consisting of a string with an introduction to the zodiac sign, and a string with a hex color available for JS
 */
function getConstellationInfo(constellation) {
	const constellationData = {
		"Pisces": [
			"Pisces, a water sign, is the last constellation of the zodiac. It's symbolized by two fish swimming in opposite directions, representing the constant division of Pisces's attention between fantasy and reality.	",
			"#264653"
		],
		"Aries": [
			"Aries is the first sign of the zodiac, and that’s pretty much how those born under this sign see themselves: first. Aries are the leaders of the pack, first in line to get things going.",
			"#2a9d8f"
		],
		"Taurus": [
			"Taurus, the second sign of the zodiac and the ruler of the earth sign, is all about reward. Unlike the Aries love of the game, Taurus loves the rewards of the game.",
			"#8b1d08"
		],
		"Gemini": [
			"Gemini is the third sign of the zodiac, and those born under this sign will be quick to tell you all about it. That’s because they love to talk!",
			"#7f6000"
		],
		"Cancer": [
			"Cancer, the fourth sign of the zodiac, is all about home. Those born under this horoscope sign are ‘roots’ kinds of people, and take great pleasure in the comforts of home and family.",
			"#274e13"
		],
		"Leo": [
			"Roll out the red carpet, because Leo has arrived. Leo is represented by the lion, and these spirited fire signs are the kings and queens of the celestial jungle.",
			"#903d2c"
		],
		"Virgo": [
			"Virgo is an earth sign historically represented by the goddess of wheat and agriculture, an association that speaks to Virgo’s deep-rooted presence in the material world.",
			"#264653"
		],
		"Libra": [
			"Libra is an air sign represented by the scales (interestingly, the only inanimate object of the zodiac), an association that reflects Libra's fixation on balance and harmony.",
			"#2a9d8f"
		],
		"Scorpio": [
			"Scorpio is one of the most misunderstood signs of the zodiac. Because of its incredible passion and power, Scorpio is often mistaken for a fire sign.",
			"#4f388b"
		],
		"Sagittarius": [
			"Sagittarius, the ninth sign of the zodiac, is the home of the wanderers of the zodiac. It’s not a mindless ramble for these folks, either. Sagittarians are truth-seekers, and the best way for them to do this is to hit the road, talk to others and get some answers.",
		"#0c343d"
		],
		"Capricorn": [
			"Capricorn, the tenth sign of the zodiac, is all about hard work. Those born under this sign are more than happy to put in a full day at the office, realizing that it will likely take a lot of those days to get to the top.",
			"#073763"
		],
		"Aquarius": [
			"Aquarius is the eleventh sign of the zodiac, and Aquarians are the perfect representatives for the Age of Aquarius. Those born under this horoscope sign have the social conscience needed to carry us into the new millennium.",
			"#264653"
		], 
		// Powell!!!
		"Powell": [
			"A professor. Yes, your CSE110 professor. With all your respect, confess to him what you did in MIDTERM",
			"#264653"
		]
	};
	
	return constellationData[constellation] || ["Unknown constellation.", "#ffffff"];
}
