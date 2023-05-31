// return the resonpse based on the five input value
function GetJsonResponse(UserConstellation, UserBirthDay, UserBirthMonth, UserBirthYear, UserMood){
    return `Your constellation is ${UserConstellation}, your date of birth is ${UserBirthYear}-${UserBirthMonth}-${UserBirthDay}, your current mood is ${UserMood}`;
}