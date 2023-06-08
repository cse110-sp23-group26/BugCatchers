/**
 * Reads each of the JSON files containing fortunes.
 * @returns {object} - An object containing the JSON from each of the JSON files
 */
async function readJSON() {
    let astro = await fetch('conf/Astrology.json');
    astro = await astro.json();

    let suggestion = await fetch('conf/Suggestions.json');
    suggestion = await suggestion.json();

    let fortune = await fetch('conf/Fortunes.json');
    fortune = await fortune.json();
    let transitional = await fetch('conf/Transitional.json');
    transitional = await transitional.json();

    return {
        astro: astro,
        suggestion: suggestion,
        fortune: fortune,
        transitional: transitional
    }
}

/**
 * Randomly selects fortunes from each of the JSON files.
 * @param {string} sign - A string containing the zodiac sign to generate a fortune for
 * @returns {object} - An object containing various fortune strings that can be used to generate a fortune
 */
async function randomSelectFortune(sign) {
    const fortuneData = await readJSON();
    const astro = fortuneData.astro;
    const fortune = fortuneData.fortune;
    const suggestion = fortuneData.suggestion;
    const transitional = fortuneData.transitional;

    return {
        astro_info_text: astro[sign]["info"][Math.floor(Math.random()*astro[sign]["info"].length)],
        astro_feature_text: lowercaseStart(astro[sign]["features"][Math.floor(Math.random()*astro[sign]["features"].length)]),
        fortune_money_text: fortune["Money"][Math.floor(Math.random()*fortune["Money"].length)],
        fortune_school_text: fortune["School"][Math.floor(Math.random()*fortune["School"].length)],
        fortune_relation_text: fortune["Relation"][Math.floor(Math.random()*fortune["Relation"].length)],
        fortune_work_text: fortune["Work"][Math.floor(Math.random()*fortune["Work"].length)],
        fortune_generic_text: fortune["Generic"][Math.floor(Math.random()*fortune["Generic"].length)],
        suggestion_text: suggestion["suggestions"][Math.floor(Math.random()*suggestion["suggestions"].length)],
        transitional: transitional["transitional"][Math.floor(Math.random()*transitional["transitional"].length)]
    }
}

// Make the first letter of a string lowercase (for the sign features)
function lowercaseStart(s) {
    return s.charAt(0).toLowerCase() + s.slice(1);
}

/**
 * Template 1 for randomly generating a fortune.
 * @param {string} sign - The zodiac sign to generate a fortune for
 * @returns {string} - The randomly generated fortune
 */
async function templete1(sign) {
    // Changed from concatenation to string templating to clean up code a bit
    const fortune = await randomSelectFortune(sign);
    return `The stars have spoken. ${fortune.fortune_money_text} ${sign} are ${fortune.astro_feature_text}. ${fortune.suggestion_text}`;
}

/**
 * Template 2 for randomly generating a fortune.
 * @param {string} sign - The zodiac sign to generate a fortune for
 * @returns {string} - The randomly generated fortune
 */
async function templete2(sign) {
    const fortune = await randomSelectFortune(sign);
    return `The stars are telling me your future. ${fortune.fortune_work_text} ${sign} are ${fortune.astro_feature_text}. ${fortune.suggestion_text}`;
}

/**
 * Template 3 for randomly generating a fortune.
 * @param {string} sign - The zodiac sign to generate a fortune for
 * @returns {string} - The randomly generated fortune
 */
async function templete3(sign) {
    const fortune = await randomSelectFortune(sign);
    let random_text = [
        fortune.fortune_money_text, 
        fortune.fortune_school_text, 
        fortune.fortune_relation_text, 
        fortune.fortune_work_text, 
        fortune.fortune_generic_text
    ]
    random_text = random_text[Math.floor(Math.random()*random_text.length)]

    return `The stars foretell your future. ${random_text} ${sign} are ${fortune.astro_feature_text}. ${fortune.suggestion_text}`;
}

// These templates are commented out for now as their purpose is somewhat unclear
/* 
async function templete4(sign) {
    let astro = await fetch('conf/Astrology.json');
    astro = await astro.json();

    let suggestion = await fetch('conf/Suggestions.json');
    suggestion = await suggestion.json();

    let fortune = await fetch('conf/Fortunes.json');
    fortune = await fortune.json();
    let transitional = await fetch('conf/Transitional.json');
    transitional = await transitional.json();

    var asteo_info_text = astro[sign]["info"][Math.floor(Math.random()*astro[sign]["info"].length)];
    var asteo_feature_text = astro[sign]["features"][Math.floor(Math.random()*astro[sign]["features"].length)];

    var fortune_money_text = fortune["Money"][Math.floor(Math.random()*fortune["Money"].length)];
    var fortune_school_text = fortune["School"][Math.floor(Math.random()*fortune["School"].length)];
    var fortune_relation_text = fortune["Relation"][Math.floor(Math.random()*fortune["Relation"].length)];
    var fortune_work_text = fortune["Work"][Math.floor(Math.random()*fortune["Work"].length)];
    var fortune_generic_text = fortune["Generic"][Math.floor(Math.random()*fortune["Generic"].length)];

    var suggestion_text = suggestion["suggestions"][Math.floor(Math.random()*suggestion["suggestions"].length)];

    var transitional_1 = transitional["transitional"][Math.floor(Math.random()*transitional["transitional"].length)];
    var transitional_2 = transitional["transitional"][Math.floor(Math.random()*transitional["transitional"].length)];

    var random_text = [fortune_money_text,fortune_school_text,fortune_relation_text,fortune_work_text,fortune_generic_text]
    random_text = random_text[Math.floor(Math.random()*random_text.length)]

    var responses = random_text + sign + " are " + asteo_feature_text + suggestion_text;

    return responses;
}

async function templete5(sign) {
    let astro = await fetch('conf/Astrology.json');
    astro = await astro.json();

    let suggestion = await fetch('conf/Suggestions.json');
    suggestion = await suggestion.json();

    let fortune = await fetch('conf/Fortunes.json');
    fortune = await fortune.json();
    let transitional = await fetch('conf/Transitional.json');
    transitional = await transitional.json();

    var asteo_info_text = astro[sign]["info"][Math.floor(Math.random()*astro[sign]["info"].length)];
    var asteo_feature_text = astro[sign]["features"][Math.floor(Math.random()*astro[sign]["features"].length)];

    var fortune_money_text = fortune["Money"][Math.floor(Math.random()*fortune["Money"].length)];
    var fortune_school_text = fortune["School"][Math.floor(Math.random()*fortune["School"].length)];
    var fortune_relation_text = fortune["Relation"][Math.floor(Math.random()*fortune["Relation"].length)];
    var fortune_work_text = fortune["Work"][Math.floor(Math.random()*fortune["Work"].length)];
    var fortune_generic_text = fortune["Generic"][Math.floor(Math.random()*fortune["Generic"].length)];

    var suggestion_text = suggestion["suggestions"][Math.floor(Math.random()*suggestion["suggestions"].length)];

    var transitional_1 = transitional["transitional"][Math.floor(Math.random()*transitional["transitional"].length)];
    var transitional_2 = transitional["transitional"][Math.floor(Math.random()*transitional["transitional"].length)];

    var random_text = [fortune_money_text,fortune_school_text,fortune_relation_text,fortune_work_text,fortune_generic_text]
    random_text = random_text[Math.floor(Math.random()*random_text.length)]

    var responses = random_text + sign + " are " + asteo_feature_text + suggestion_text;

    return responses;
} */
