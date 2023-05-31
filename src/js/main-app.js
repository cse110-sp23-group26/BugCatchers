
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// Rui Li's edit 28/05/23:
// Added a json 'fortunes' which contains 2 test fortune card to local storage 
// Instead add fortune cards to html body, added it to a <div class = "fortuneCardList">

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

window.addEventListener('DOMContentLoaded', init);

function init() {
    // Default variables to set (i.e Celeste's name, default welcoming message etc.)
    speakerName = 'Celeste';
    welcomeMsg = 'Hello user! What can I do for you?'

    /*
    // set those two data to local storage
    const fortunes = [
        {
            "name": "Celeste",
            "id": "fortune1",
            "text": "you will not die soon probably"
        },
        {
            "name": "Celeste",
            "id": "fortune2",
            "text": "you will literally explode"
        }
    ]
    // Add fortune cards to local storage and HTML
    for (let fortune of fortunes) {
        addFortuneCard(fortune);
    }
    */

    // init check-in system
    // this fcuntion in js/util/CheckIn.js
    initializeCheckIn();
    // add event listener to check in button
    // this fcuntion in js/util/CheckIn.js
    document.getElementById('check-in-button').addEventListener('click', function () {
        let result = checkIn();
        // Update the display
        document.getElementById('last-check-in-date').textContent = 'Last Check-In: ' + result.date;
        document.getElementById('check-in-count').textContent = 'Count: ' + result.count;
    });

    // TODO: get username
    // insert default text to the character and dialogue blobs
    let speakerContainer = document.querySelector('.speaker');
    let dialogueContainer = document.querySelector('.dialogue-text');
    speakerContainer.textContent = speakerName;
    dialogueContainer.textContent = welcomeMsg;

    // get input if user click the DOWN arrow
    const arrowElement = document.querySelector('.arrow');
    // Add click event listener to the arrow element
    arrowElement.addEventListener('click', () => {
        // Event handler code here
        console.log('Arrow clicked!');
        let curDialogue = document.querySelector('.dialogue-text');
        curDialogue.textContent = 'Would you like to know what the stars say about your futures?';

        // disable arrow
        arrowElement.style.display = 'none';

        // switch the DOWN arrow with a yes button
        addButtonToTextBox("Yes!");

    });


    // FortuneCardList listeners
    const menu = document.getElementById("menu");
    const CardList = document.getElementById("CardList");
    // Add a click event listener to toggle the visibility of the content
    menu.addEventListener('click', () => {
        // check if the List is opening right now
        if (CardList.content.style.display === 'none') {
            // create List title
            const ListTitle = document.createElement('h3');
            ListTitle.textContent = 'Saved Fortune!';
            CardList.content.appendChild(ListTitle);
            
            // Read from localstorage
            let fortunes = JSON.parse(localStorage.getItem('FortunesCard')) || [];
            // issue #41, if no data in fortunes, add a fortune card said no recording
            if (fortunes.length == 0){
                const emptyFortuneCardList = document.createElement('p');
                emptyFortuneCardList.textContent = 'no content';
                CardList.content.appendChild(emptyFortuneCardList);
            }
            for (let fortune of fortunes) {
                const fortuneCard = document.createElement("fortune-card");
                fortuneCard.data = fortune;
                // Add to HTML
                CardList.content.appendChild(fortuneCard);
            }

            // add close button on right buttom
            const closeButton = document.createElement('button');
            closeButton.textContent = 'Close';
            closeButton.addEventListener('click', () => {
                const menu = document.getElementById("menu");
                menu.click();
            });
            CardList.content.appendChild(closeButton);
            
            CardList.content.style.display = 'block';
        } else {
            CardList.content.innerHTML = '';
            CardList.content.style.display = 'none';
        }
    });
    
}




/**
 * Adds a button to the text box and adds an event listener for click that calls the action parameter
 * @param buttonText is a string that represents the text that is on a button
 */
function addButtonToTextBox(buttonText) {
    const button = document.createElement('button');
    // Set button properties
    button.textContent = buttonText; // Set the text content of the button
    button.classList.add('yes-button'); // Add a CSS class for styling (optional)
    button.disabled = false; // Set the disabled property (true or false)

    // Apply button styles
    button.style.padding = '10px 20px'; // Set padding
    button.style.backgroundColor = 'blue'; // Set background color
    button.style.color = 'white'; // Set text color
    button.style.border = 'none'; // Remove border
    button.style.cursor = 'pointer'; // Set cursor style

    // Append the button to a parent element
    const parentElement = document.querySelector(".interactive");
    parentElement.innerHTML = '';
    parentElement.appendChild(button);

    button.addEventListener('click', async (event) => {
        button.remove();
        let birthday = await get_birthday();
        let sign = await getConstellation(birthday);
        
        let generators = [templete1,templete2,templete3,templete4,templete5];

        let reponse = await generators[Math.floor(Math.random()*generators.length)](sign);

        let curDialogue = document.querySelector('.dialogue-text')

        // split responses and display
        const arrowElement = document.querySelector('.arrow');
        await split_and_display(reponse).then(arrowElement.style.display = 'block');

        // add to local storage with random id.
        let new_fortunes = {"name": "Celeste","id": Math.floor(Math.random() * (1000 - 0 + 1)) + 0, "text": reponse};
        addFortuneCard(new_fortunes);
        updateFortuneCardList();
    });

}

function get_birthday(){
    return "Jan 11";
}

//Function to print char by char for typing animation
function typeAnswer(answerElem, answerText) {
	if (answerText.length <= 0) {
		return;
	}
	let char = answerText.split("");
	answerElem.textContent = answerElem.textContent + char.splice(0,1)[0];
	setTimeout(typeAnswer, 50, answerElem, char.join(""));
}

//Function to split the string and display it with text animation
async function split_and_display(string){
    let maxLength = 100;
    const strings = [];
    let index = 0;
    let curDialogue = document.querySelector('.dialogue-text')
    while (index < string.length) {
      const substring = string.substring(index, index + maxLength);
      strings.push(substring);
      index += maxLength;
    }

    //Loop through each string and display it with typing animation
    //Can fix when Split is correct above^^
    let answerElement = document.querySelector('.dialogue-text');
    answerElement.textContent = '';
    typeAnswer(answerElement, strings[0]);
    
    
    /* Display the bubble text string block one by one
    strings.forEach((text, index) => {
        //for each string, display it with typing animation
            answerElement = document.querySelector('.dialogue-text');
            answerElement.textContent = '';
            setTimeout(() => {
                //typeAnswer(answerElement, text);
                curDialogue.textContent = text;
            }, index * 30); //This delay is used for each dialouge box
            
    });
    */

}



// update the fortune card list by simply click the menu button twice
function updateFortuneCardList(){
    const menu = document.getElementById("menu");
    menu.click();
    menu.click();
}









