/**
 * Returns a randomly generated fortune based on the user inputted fields.
 * 
 * @param {string} UserConstellation - The zodiac sign to generate a fortune for
 * @param {string} UserBirthDay - The day of the month to generate a fortune for
 * @param {string} UserBirthMonth - The month to generate a fortune for
 * @param {string} UserBirthYear - The year to generate a fortune for
 * @param {string} UserMood - The mood to generate a fortune for
 * @returns - A string containing the randomly generated fortune
 */
async function GetJsonResponse(UserConstellation, UserBirthDay, UserBirthMonth, UserBirthYear, UserMood){
    //return `Your constellation is ${UserConstellation}, your date of birth is ${UserBirthYear}-${UserBirthMonth}-${UserBirthDay}, your current mood is ${UserMood}`;
    let generators = [templete1,templete2,templete3];
    let generator = generators[Math.floor(Math.random()*generators.length)];
    let response = await generator(UserConstellation);
    return response;
}