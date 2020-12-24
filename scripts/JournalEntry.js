/*
 *  Purpose: To render a single journal entry as an
 *           HTML representation of the data
 */
export const JournalEntryComponent = (entry) => {
    return `
        <section id="entry--${entry.id}" class="journalEntry">
            
            <b>Concepts Covered:</b> ${entry.concept}<p>
            <b>Date:</b> ${entry.date}<p>
            <b>Instructor:</b> ${entry.instructor.first_name} ${entry.instructor.last_name}<p></p>
            <b>Journal Entry:</b><p>
            ${entry.entry}<p>
            <b>Mood:</b> ${entry.mood.label}
            
        </section>
    `
}