/*
 *  Purpose:
 *    To render as many journal entry components as
 *    there are items in the collection exposed by the
 *    data provider component
 */
import { deleteEntry, getEntries, useJournalEntries } from "./JournalDataProvider.js"
import { JournalEntryComponent } from "./JournalEntry.js"
const eventHub = document.querySelector('#container')

// DOM reference to where all entries will be rendered
const entryLog = document.querySelector("#entryLog")



eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("editEntry--")) {
        const [notUsed, entryId] = clickEvent.target.id.split("--")

        /*
            Let all other components know that the user chose
            to edit an entry, and attach data to the message
            so that any listeners know which entry should be
            edited.
        */
        const message = new CustomEvent("editEntryClicked", {
            detail: {
                entryId: entryId
            }
        })
        eventHub.dispatchEvent(message)
    }
})

// Render the list of entries to the DOM
export const EntryListComponent = () => {
    // get the data first then use useJournalEntries to get a slice of it to render the data
    getEntries().then(() => {
        const entries = useJournalEntries()
        render(entries)
    })
}

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("deleteEntry--")) {
        const [prefix, id] = clickEvent.target.id.split("--")

       deleteEntry(id)
    }
})

//send it to the DOM
const render = entryCollection => {
    //clear out the DOM for this area to avoid potential appending issues later
    entryLog.innerHTML = ""
    
    for (const entry of entryCollection) {
        //Pass it through JournalEntryComponent to format it to HTML
        const entryHTML = JournalEntryComponent(entry)
        //Now put it on the DOM
        entryLog.innerHTML += entryHTML
    }
}
eventHub.addEventListener("journalStateChanged", () => {
    EntryListComponent();
    console.log('The Journal State Changed')
})

// Event listener for the moodChosen event broadcasted from filterBar.js
eventHub.addEventListener("moodChosen", e => {
    
    // Filter the entries by the chosen mood value
    if (e.detail.moodValue != 0) {
        getEntries().then(() => {
            let moodSelection = e.detail.moodValue
            let appStateEntries = useJournalEntries()
            const matchingEntries = appStateEntries.filter(entry => entry.moodId === parseInt(moodSelection))
            render(matchingEntries)
        })
    // Clear the filter and list all entries
    } else {
        EntryListComponent()
    }
})