const filterText = (isTheTextBad) => {
    
    // Define bad words below
    let badWords = ["idiot", "meanie", "stupidhead", "L7 weenie", "moron", "stinkbrain"]

    // Find any bad words defined above using the filter method
    let foundBadWords = isTheTextBad.filter(bad => badWords.includes(bad))
    
    // If any words were found then...
    if (foundBadWords.length > 0) {
        // Return a new object with the data
        return {
            isItBad: true,
            badWordsList: foundBadWords
        }
    } else {
        return {
            isItBad: false,
            badWordsList: "N/A"
        }
    }
}

export const getUserTextFiltered = (conceptText, entryText) => {
    // Set them to lowercase so it's easier to filter
    let conceptFilter = conceptText.toLowerCase();
    let entryFilter = entryText.toLowerCase();

    // Split all the words by spaces so they can be filtered
    let splitConcept = conceptFilter.split(" ");
    let splitEntry = entryFilter.split(" ");
   
    // Assign a variable to the objects returned from the filterText function
    let conceptWordsTyped = filterText(splitConcept);
    let entryWordsTyped = filterText(splitEntry);

    return {
        conceptWordsTyped,
        entryWordsTyped
    }
}