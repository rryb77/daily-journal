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

