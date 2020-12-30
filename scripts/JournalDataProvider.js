// eventHub initialized for the dispatchStateChageEvent
const eventHub = document.querySelector('#container');

//Setup the journal array
let journal = [];

// Get entries from the API
export const getEntries = () => {
    return fetch("http://localhost:8088/entries?_expand=mood&_expand=instructor") // Fetch from the API
        .then(response => response.json())  // Parse as JSON
        .then(
            entries => {
            //populate the journal array with the parsed data from the API
            journal = entries
        })
};

// Make use of the data that was collected by exporting it around where needed
export const useJournalEntries = () => journal.slice();

// Broadcast that the app state has changed because a new item was added to the array, re-render the DOM
export const dispatchStateChangeEvent = () => {
    eventHub.dispatchEvent(new CustomEvent("journalStateChanged"));
}

// Save new journal entries to the JSON server DB
export const saveJournalEntry = (newJournalEntry) => {
    // Use `fetch` with the POST method to add your entry to your API
    fetch("http://localhost:8088/entries", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newJournalEntry)
    })
        .then(getEntries)  // <-- Get all journal entries
        .then(dispatchStateChangeEvent)  // <-- Broadcast the state change event
};

// Delete entries from the JSON DB, remove from the DOM by re-rendering the new list
export const deleteEntry = entryId => {
    return fetch(`http://localhost:8088/entries/${entryId}`, {
        method: "DELETE"
    })
        .then(getEntries) // Grab the updated list of entries
        .then(dispatchStateChangeEvent) // Dispatch the state change event to re-render the DOM
}