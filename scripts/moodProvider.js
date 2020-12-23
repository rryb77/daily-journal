let moods = [];

// Get moods from the API
export const getMoods = () => {
    return fetch("http://localhost:8088/entries?_expand=mood") // Fetch from the API
        .then(response => response.json())  // Parse as JSON
        .then(
            mood => {
            //populate the journal array with the parsed data from the API
            moods = mood
        })
};

// Make use of the data that was collected by exporting it around where needed
export const useMoods = () => moods.slice();