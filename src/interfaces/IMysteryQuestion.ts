export interface IMysteryQuestion {
    id?: string,
    mysteryQuestion: string,
    mysteryQuestionType: string,
    targetHost: string | null,
    weekNumber: number | null,
    seasonNumber: number
}

