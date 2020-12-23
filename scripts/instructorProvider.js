let instructors = [];

export const getInstructors = () => {
    return fetch("http://localhost:8088/instructors") // Fetch from the API
        .then(response => response.json())  // Parse as JSON
        .then(
            instructorList => {
            
            instructors = instructorList
        })
};

// Make use of the data that was collected by exporting it around where needed
export const useInstructors = () => instructors.slice();