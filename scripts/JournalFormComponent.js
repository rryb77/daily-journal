import { FilterBar } from "./filter/filterBar.js";
import { useInstructors, getInstructors } from "./instructorProvider.js";
import { getEntries, saveJournalEntry } from "./JournalDataProvider.js"
import { getMoods, useMoods } from "./moodProvider.js";
import { profanityDialogGenerator } from "./profanityDialog.js"
import { getUserTextFiltered } from './profanityFilter.js'

// Location on the DOM for the entry form
const contentTarget = document.querySelector(".formContainer");
// eventHub for listener events
const eventHub = document.querySelector("#container");

// Render the form to the DOM
const render = (allMoods, allInstructors) => {
    
    contentTarget.innerHTML = `
    <form class="journalForm" action="">

        <fieldset class="form__styling">
            <label class="textLabels" for="JournalDate">Date of Entry</label>
            <input class="form__dropdown" type="date" name="journalDate" id="journalDate">
        </fieldset>

        <fieldset class="form__styling">
            <label class="textLabels" for="JournalConcept">Concepts Covered</label>
            <input type="text" name="journalEntry" id="conceptsCovered">
            <div class="error"></div>
        </fieldset>

        <fieldset class="form__styling">
            <label class="textLabels" for="JournalInstructor">Instructor</label>
            <select class="instructor__select" id="instructorSelect">
                ${
                    allInstructors.map(
                        instructorObj => {
                            return `<option value=${instructorObj.id}>${instructorObj.first_name} ${instructorObj.last_name}</option>`
                        }
                    )
                }
            </select>

        </fieldset>
        
        <fieldset class="form__styling">
            <label class="textLabels" for="JournalEntry">Journal Entry</label>
            <textarea id="journalEntry"></textarea>                    
        </fieldset>

        <fieldset class="form__styling">
            <label class="textLabels" for="JournalMood">Mood</label>
            <select class="mood__select" id="moodSelect">
                ${
                    allMoods.map(
                        moodObject => {
                            return `<option value=${moodObject.id}>${moodObject.label}</option>`
                        }
                    )
                }
            </select>

            <button type="button" class="btnRecord" id="btnRecord">Record Journal Entry</button>

        </fieldset>
    `
};

// Render the daily journal form to the DOM
export const JournalFormComponent = () => {
    getMoods() // Get the moods then..
        .then(getInstructors) // Get the instructor list then..
        //.then(getEntries) // TODO: I don't think I need this, confirm through tests and then remove
        .then(() => {
            const allMoods = useMoods()
            const allInstructors = useInstructors()
            FilterBar(allMoods)
            render(allMoods, allInstructors);
    })
}

//---------------------------------------//
//       Listener Events Below           //
//---------------------------------------//


//----------------------------------
// Click eventListener for btnRecord
//----------------------------------

eventHub.addEventListener("click", clickEvent => {
    // If the click event target id is equal to btnRecord then..
    if (clickEvent.target.id === "btnRecord") {
        
        // Set the DOM locations to grab data from
        const concept = document.querySelector('#conceptsCovered');
        const entry = document.querySelector('#journalEntry');
        const mood = document.querySelector('#moodSelect');
        const date = document.querySelector('#journalDate');
        const instructor = document.querySelector('#instructorSelect')

        // Make a new object representation of a note
        // Use the defined variables above to create key/value pairs
        const newEntry = {
            concept: concept.value,
            entry: entry.value,
            date: date.value,
            instructorId: parseInt(instructor.value),
            moodId: parseInt(mood.value) // parseInt - parse the string and return an integer
        };

        // Grab the words and store them in a variable to filter for bad words
        let conceptFilter = concept.value;
        let entryFilter = entry.value;

        // Send the words through the filter, and return the objects
        let allTheText = getUserTextFiltered(conceptFilter, entryFilter);
        
        // Store true or false in the variable for better readability below
        let conceptBad = allTheText.conceptWordsTyped.isItBad;
        let entryBad = allTheText.entryWordsTyped.isItBad;

        // Store the array of bad words found in a variable
        let conceptWordsFound = allTheText.conceptWordsTyped.badWordsList;
        let entryWordsFound = allTheText.entryWordsTyped.badWordsList;

        // Were any bad words found in the concept OR entry inputs?
        if (conceptBad === true || entryBad === true) {
            
            // If user text contains bad words in both the concept and entry section then alert the user, do not send through API
            if(conceptBad === true && entryBad === true) {
                profanityDialogGenerator(conceptWordsFound, entryWordsFound);

            // If user text contains bad words only the concept section then...
            } else if (conceptBad === true && entryBad === false) {
                
                // Set entryWordsFound to "N/A" then send the arrays to the generator
                let entryWordsFound = ["N/A"];
                profanityDialogGenerator(conceptWordsFound, entryWordsFound);

            // If user text contains bad words only in the entry section then...
            } else if (conceptBad === false && entryBad === true) {
                
                // Set conceptWordsFound to "N/A" then send the arrays to the generator
                let conceptWordsFound = ["N/A"];
                profanityDialogGenerator(conceptWordsFound, entryWordsFound);

            };
        
        // If it's clean then send it through our API and update the application state
        } else {
            saveJournalEntry(newEntry)
            concept.value = ""
            entry.value = ""
            date.value = "yyyy-MM-dd"
            mood.value = 1
            instructor.value = 1

        };
    };
});

//---------------------------------------------------
// keypress eventListener to check the max characters
//---------------------------------------------------

// Set char to 0 so it can count characters properly
let chars = 0;

// Set the max amount of characters for the Concepts Covered input box here
let conceptMax = 20;

// Listen for keypress events so we can increase the character count as needed
eventHub.addEventListener("keypress", clickEvent => {
    // Set the selector
    let error = document.querySelector('.error');

    // Make sure the item where keypresses are taking place is the #conceptsCovered section of the DOM
    if (clickEvent.target.id === 'conceptsCovered') {
        // Increase character count
        chars++;

        // If character count is great than the maximum set then...
        if (chars > conceptMax) {
            // Put a user warning in the DOM
            error.innerHTML = `Please use ${conceptMax} or less characters for the concepts covered input`;
            
            // Grab the button in the DOM by ID
            let btnElement = document.getElementById("btnRecord");

            // Disable it so it can't be clicked
            btnElement.disabled = true;

            // Add the disabled class to grey it out
            btnElement.classList.add('disabled');
        }
    }
})

// Listen for keydown events so the backspace key can be tracked
eventHub.addEventListener("keydown", clickEvent => {
    
    // Store the keyCode in a variable
    let keyID = clickEvent.keyCode;

    // Set the selector
    let error = document.querySelector('.error')

    // If keyID is equal to 8 (backspace) then...
    if (keyID === 8) {
        // Reduce the chars variable by 1
        chars--;

        // If the character count is equal to or less than the max character count then..
        if (chars <= conceptMax) {
            
            // Clear the user warning from the DOM
            error.innerHTML = "";

            // Grab the element by ID
            let btnElement = document.getElementById("btnRecord");

            // Allow the user to click the button again
            btnElement.disabled = false;

            // Remove the disabled class to restore the original color
            btnElement.classList.remove('disabled');
        };
    };
});