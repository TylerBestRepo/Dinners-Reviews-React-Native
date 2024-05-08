enum FieldStrings {
    entreeRating = 'Entree Rating',
    mainRating = 'Main Rating',
    dessertRating = 'Dessert Rating',
    entertainmentRating = 'Entertainment Rating',
    // Add more field strings and their converted values as needed
    writtenReview = 'Written Review',
    mysteryQuestion = 'Mystery Question'
}

// Define the converter function
export function convertFieldString(field: string): string {
    return FieldStrings[field] || field; // Return the converted string or the original string if not found
}
