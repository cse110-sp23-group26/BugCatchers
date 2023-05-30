

async function templete1(sign) {
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

    var responses = "Stars has spoken. " + fortune_money_text + sign + " are " + asteo_feature_text + suggestion_text;

    return responses;
}


async function templete2(sign) {
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

    var responses = "Stars is telling me your future. " + fortune_work_text + sign + " are " + asteo_feature_text + suggestion_text;

    return responses;
}

async function templete3(sign) {
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

    var responses = "Stars is telling me your future. " + random_text + sign + " are " + asteo_feature_text + suggestion_text;

    return responses;
}

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

    var responses = transitional_1 + random_text + sign + " are " + asteo_feature_text + suggestion_text;

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

    var responses = transitional_2 + random_text + sign + " are " + asteo_feature_text + suggestion_text;

    return responses;
}


















