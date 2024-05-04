enum FieldStrings {
    entreeRating = 'Entertainment Rating',
    mainRating = 'Main Rating',
    dessertRating = 'Dessert Rating',
    entertainmentRating = 'Entertainment Rating',
    // Add more field strings and their converted values as needed
}

// Define the converter function
export function convertFieldString(field: keyof typeof FieldStrings): string {
    return FieldStrings[field] || field; // Return the converted string or the original string if not found
}
