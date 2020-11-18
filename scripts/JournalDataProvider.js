/*
 *   Journal data provider for Daily Journal application
 *
 *      Holds the raw data about each entry and exports
 *      functions that other modules can use to filter
 *      the entries for different purposes.
 */

// This is the original data.
const journal = [
    {
        id: 1,
        date: "11/04/2020",
        concept: "HTML & CSS",
        entry: "We talked about HTML components and how to make grid layouts with Flexbox in CSS.",
        mood: "Ok"
    },
    {
        id: 2,
        date: "11/13/2020",
        concept: "Teamwork & Git/Github",
        entry: "We started our first group project to get used to working in teams while also getting familiar with Git/Github. We're creating a small travel site!",
        mood: "Happy"
    },
    {
        id: 3,
        date: "11/18/2020",
        concept: "Debugging",
        entry: "We discussed the importance of using debugging/dev tools when you get errors or unexpected results in the browser.",
        mood: "Ok"
    }
]

/*
    You export a function that provides a version of the
    raw data in the format that you want
*/
export const useJournalEntries = () => {
    const sortedByDate = journal.sort(
        (currentEntry, nextEntry) =>
            Date.parse(currentEntry.date) - Date.parse(nextEntry.date)
    )
    return sortedByDate
}