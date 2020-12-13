export const profanityDialogGenerator = (conceptBaddies, entryBaddies) => {
    const dialogBox = document.querySelector('#profanityDialog')
    const conceptElement = document.querySelector('#awfulConceptWords')
    
    dialogBox.innerHTML = `
        <div><h2>Whoa there buddy!<h2></div>
        <div>No judgement here, but my boss told me we can't use what he calls "awful words". I really like my job so can you rephrase the following words:</div>
        <p><div>Concepts Covered:<div>
            ${
                conceptBaddies.map(
                    conceptItem => {
                        // const valueToBeInNewArray = officerObj.name
                        console.log(conceptItem)
                        return `${conceptItem}`
                    }
                )
            }
        <p><div>Journal Entry:</div>
        ${
            entryBaddies.map(
                entryItem => {
                    // const valueToBeInNewArray = officerObj.name
                    console.log(entryItem)
                    return `${entryItem}`
                }
            )
        }

        
    `

    // for (let word of conceptBaddies) {
    //     dialogBox.innerHTML += word
    // }
    
    dialogBox.showModal()
}