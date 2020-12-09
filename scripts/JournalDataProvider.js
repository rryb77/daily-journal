//Setup the journal array
let journal = []

// Get entries from the API
export const getEntries = () => {
    return fetch("http://localhost:8088/entries") // Fetch from the API
        .then(response => response.json())  // Parse as JSON
        .then(
            entries => {
            //populate the journal array with the parsed data from the API
            journal = entries
        })
}

// Make use of the data that was collected by exporting it around where needed
export const useJournalEntries = () => journal.slice()