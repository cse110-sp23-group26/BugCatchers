// takes input:
// fortune = 
// {
//     "name": "Celeste",
//     "id": "fortune2",
//     "text": "you will literally explode"
// }
// Then add it to localStorage (only add when this fortune card does not exist in localstorage)
// Then append it to HTMLAllCollection, under fortuneCardList 
function addFortuneCard(fortune) {
    // Add to local storage
    let fortunes = JSON.parse(localStorage.getItem('FortunesCard')) || [];
    let existingFortune = fortunes.find(f => f.id === fortune.id);
    if (!existingFortune) {
        fortunes.push(fortune);
        localStorage.setItem('FortunesCard', JSON.stringify(fortunes));
    }
}