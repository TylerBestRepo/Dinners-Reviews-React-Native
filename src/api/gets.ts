import { FIREBASE_DB } from "../../FirebaseConfig";
import { collection, onSnapshot, query, Query, where } from "firebase/firestore";
import { IMembers, IHostedDinners, IReviews, IMysteryQuestion } from '../interfaces/index'

const membersRef = collection(FIREBASE_DB, "members");
const dinnersRef = collection(FIREBASE_DB, "hostedDinners");
const membersReviewRef = collection(FIREBASE_DB, 'ratings')
const mysteryQsRef = collection(FIREBASE_DB, 'mysteryQs')

export const getMembers = (): Promise<IMembers[]> => {
    return new Promise((resolve, reject) => {
        const localMembers: IMembers[] = [];
        onSnapshot(membersRef, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const member: IMembers = {
                    id: doc.id,
                    name: doc.data().name,
                    imgName: doc.data().imgName
                };
                localMembers.push(member);
            });
            resolve(localMembers);
        }, reject);
    });
};

export const getDinners = (): Promise<IHostedDinners[]> => {
    return new Promise((resolve, reject) => {
        const localHostedDinners: IHostedDinners[] = [];
        const currentDate = new Date();

        onSnapshot(dinnersRef, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const hostedDinner: IHostedDinners = {
                    id: doc.id,
                    date: doc.data().date.toDate(), // Assuming date is already a Date object
                    hostName: doc.data().hostName,
                    weekNumber: doc.data().weekNumber,
                    season: doc.data().season
                };
                // Check if the dinner date is in the future
                if (hostedDinner.date >= currentDate) {
                    localHostedDinners.push(hostedDinner);
                }
            });

            // Sort the dinners by date (newest first)
            localHostedDinners.sort((a, b) => a.date.getTime() - b.date.getTime());

            resolve(localHostedDinners);
        }, reject);
    });
};
export const getNextDinner = (): Promise<IHostedDinners> => {
    return new Promise((resolve, reject) => {
        const localHostedDinners: IHostedDinners[] = [];
        const currentDate = new Date();

        onSnapshot(dinnersRef, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const hostedDinner: IHostedDinners = {
                    id: doc.id,
                    date: doc.data().date.toDate(), // Assuming date is already a Date object
                    hostName: doc.data().hostName,
                    weekNumber: doc.data().weekNumber,
                    season: doc.data().season
                };
                // Check if the dinner date is in the future
                if (hostedDinner.date >= currentDate) {
                    localHostedDinners.push(hostedDinner);
                }
            });

            // Sort the dinners by date (newest first)
            localHostedDinners.sort((a, b) => a.date.getTime() - b.date.getTime());
            resolve(localHostedDinners[0]);
        }, reject);
    });
};
export const getMyReviews = (user: string): Promise<IReviews[]> => {
    return new Promise((resolve, reject) => {
        let userReviewQuery: Query;
        const localReviews: IReviews[] = [];

        userReviewQuery = query(membersReviewRef, where('name', '==', user));
        onSnapshot(userReviewQuery, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const review: IReviews = {
                    id: doc.id,
                    name: doc.data().name,
                    cook: doc.data().cook,
                    entreeRating: doc.data().entreeRating,
                    mainRating: doc.data().mainRating,
                    dessertRating: doc.data().dessertRating,
                    entertainmentRating: doc.data().entertainmentRating,
                    date: doc.data().date.toDate(),
                    weekNumber: doc.data().weekNumber,
                    season: doc.data().season,
                    writtenReview: doc.data().writtenReview,
                    chartInfo: [{
                        label: 'Entree',
                        frontColor: 'red',
                        value: doc.data().entreeRating,
                    },
                    {
                        label: 'Main',
                        frontColor: 'red',
                        value: doc.data().mainRating,
                    },
                    {
                        label: 'Dessert',
                        frontColor: 'red',
                        value: doc.data().dessertRating,
                    },
                    {
                        label: 'Entertainment',
                        frontColor: '#177AD5',
                        value: doc.data().entertainmentRating
                    }]
                };
                localReviews.push(review)
            });
            localReviews.sort((a, b) => a.date.getTime() - b.date.getTime());
            // Sort the dinners by date (newest first)
            resolve(localReviews);
        }, reject);
    });
};

export const getMysteryQ = (season: number, weekNumber: number): Promise<IMysteryQuestion> => {
    return new Promise((resolve, reject) => {
        let mysteryQQuery: Query;
        let question: IMysteryQuestion;
        mysteryQQuery = query(mysteryQsRef, where('seasonNumber', '==', season), where('weekNumber', '==', weekNumber));
        onSnapshot(mysteryQQuery, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                question = {
                    id: doc.id,
                    mysteryQuestion: doc.data().mysteryQuestion,
                    mysteryQuestionType: doc.data().mysteryQuestionType,
                    seasonNumber: doc.data().seasonNumber,
                    weekNumber: doc.data().weekNumber,
                    targetHost: doc.data().targetHost
                };
            });
            resolve(question);
        }, reject);
    });
};


