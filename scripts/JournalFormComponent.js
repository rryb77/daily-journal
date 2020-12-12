import { saveJournalEntry } from "./JournalDataProvider.js"

const contentTarget = document.querySelector(".formContainer")
const eventHub = document.querySelector("#container")

const render = () => {
    contentTarget.innerHTML = `
    <form class="journalForm" action="">

        <fieldset class="form__styling">
            <label class="textLabels" for="JournalDate">Date of Entry</label>
            <input class="form__dropdown" type="date" name="journalDate" id="journalDate">
        </fieldset>

        <fieldset class="form__styling">
            <label class="textLabels" for="JournalConcept">Concepts Covered</label>
            <input type="text" name="journalEntry" id="conceptsCovered">
        </fieldset>
        
        <fieldset class="form__styling">
            <label class="textLabels" for="JournalEntry">Journal Entry</label>
            <textarea id="journalEntry"></textarea>                    
        </fieldset>

        <fieldset class="form__styling">
            <label class="textLabels" for="JournalMood">Mood</label>
            <select class="mood__select" id="moodSelect">
                <option value="Happy">Happy</option>
                <option value="Ok">Ok</option>
                <option value="Neutral">Neutral</option>
                <option value="Frustrated">Frustrated</option>
                <option value="Stressed">Stressed</option>
            </select>

            <button type="button" class="btnRecord" id="btnRecord">Record Journal Entry</button>

        </fieldset>
    `
}



export const JournalFormComponent = () => {
    render()
}

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "btnRecord") {
        console.log('btnRecord was clicked')
        // Need to gather the data from the form
        // The .value attribute captures the text typed in those respective input element
        const concept = document.querySelector('#conceptsCovered')
        const entry = document.querySelector('#journalEntry')
        const mood = document.querySelector('#moodSelect')
        const date = document.querySelector('#journalDate')


        // Make a new object representation of a note
        // Use the defined variables above to create key/value pairs
        const newEntry = {
                        concept: concept.value,
                        entry: entry.value,
                        date: date.value,
                        mood: mood.value
                    }

        // Change API state and application state
        saveJournalEntry(newEntry)
        // Clear out the form
        // concepts.value = ""        
    }
})