export interface IReviews {
    id: string,
    name: string,
    cook: string,
    entreeRating: number,
    mainRating: number,
    dessertRating: number,
    entertainmentRating: number,
    date: Date,
    season: number,
    weekNumber: number,
    writtenReview: string,
    mysteryQ?: string,
    mysteryQuestionType?: string,
    mysteryRating?: number,
    mysteryAnswer?: string,
    chartInfo?: ChartInfoItem[]; // Define the type of chartInfo here
}

type ChartInfoItem = {
    label: string;
    frontColor: string;
    value: number;
};