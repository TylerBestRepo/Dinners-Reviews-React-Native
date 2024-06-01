export interface IReviewInput {
    reviewer: string;
    cook: string;
    entreeRating: number;
    mainRating: number;
    dessertRating: number;
    entertainmentRating: number;
    writtenReview: string;
    date?: Date;
    weekNumber: number;
    season: number;
    mysteryQ?: string;
    id?: string;
    mysteryQuestionType?: string;
    mysteryRating?: number;
    mysteryAnswer?: string;
}
