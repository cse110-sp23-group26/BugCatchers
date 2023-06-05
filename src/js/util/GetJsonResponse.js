// return the resonpse based on the five input value
async function GetJsonResponse(UserConstellation, UserBirthDay, UserBirthMonth, UserBirthYear, UserMood){
    //return `Your constellation is ${UserConstellation}, your date of birth is ${UserBirthYear}-${UserBirthMonth}-${UserBirthDay}, your current mood is ${UserMood}`;
    let generators = await [templete1,templete2,templete3,templete4,templete5];
    let generator = await generators[Math.floor(Math.random()*generators.length)];
    let response = await generator(UserConstellation);
    return response;
    
}