import { MoodFilter } from "./MoodFilter.js"

const eventHub = document.querySelector('#container')
/*
 You need to make a new HTML element with a class of
 `filters` in index.html
*/
const contentTarget = document.querySelector(".filters")

export const FilterBar = (allMoods) => {
    const render = () => {
        contentTarget.innerHTML = `
            ${MoodFilter(allMoods)}
        `
    }

    render()
}

// Initialize the mood chosen variable
let moodFilterChosen = []

// Broadcast a custom event that passes the value chosen
eventHub.addEventListener("change", e => {
    if (e.target.name === "moodFilter") {
        moodFilterChosen = e.target.value
        const customEvent = new CustomEvent("moodChosen", {
            detail: {
                moodValue: moodFilterChosen
            }
        })
        eventHub.dispatchEvent(customEvent)
    }
})