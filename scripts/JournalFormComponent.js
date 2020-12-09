const contentTarget = document.querySelector(".formContainer")

const render = () => {
    contentTarget.innerHTML = `
    <form class="journalForm" action="">
        <fieldset class="form__styling">
            <label for="JournalDate">Date of Entry</label>
            <input class="form__dropdown" type="date" name="journalDate" id="JournalDate">
        </fieldset>

        <fieldset class="form__styling">
            <label for="JournalConcept">Concepts Covered</label>
            <input type="text" name="journalEntry" id="JournalEntry">
        </fieldset>
        
        <fieldset class="form__styling">
            <label for="JournalEntry">Journal Entry</label>
                <textarea></textarea>                    
        </fieldset>

        <fieldset class="form__styling">
            <label for="JournalMood">Mood</label>
            <select class="mood__select">
                <option value="Happy">Happy</option>
                <option value="Ok">Ok</option>
                <option value="Neutral">Neutral</option>
                <option value="Frustrated">Frustrated</option>
                <option value="Stressed">Stressed</option>
            </select>
        </fieldset>
    `
}

export const JournalFormComponent = () => {
    render()
}