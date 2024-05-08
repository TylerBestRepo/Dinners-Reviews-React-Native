export interface IReviewInput {
    reviewer: string;
    cook: string;
    entreeRating: number;
    mainRating: number;
    dessertRating: number;
    entertainmentRating: number;
    writtenReview: string,
    mysteryQ?: string,
    mysteryQuestionType?: string,
    mysteryRating?: number,
    mysteryAnswer?: string
}