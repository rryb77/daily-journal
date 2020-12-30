export const profanityDialogGenerator = (conceptBaddies, entryBaddies) => {
    const dialogBox = document.querySelector('#profanityDialog')
    
    dialogBox.innerHTML = `
        <div><h2>Whoa there buddy!<h2></div>
        <div>This is a family friendly website. Please change or remove the following words:</div>
        <p><div>Concepts Covered:<div>
            ${
                conceptBaddies.map(
                    conceptItem => {
                        return `${conceptItem}`
                    }
                )
            }
        <p><div>Journal Entry:</div>
        ${
            entryBaddies.map(
                entryItem => {
                    return `${entryItem}`
                }
            )
        }

        
    `
    // Show the dialog to alert the user
    dialogBox.showModal()
}