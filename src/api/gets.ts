import { FIREBASE_DB } from "../../FirebaseConfig";
import { collection, onSnapshot, query, Query, where, Timestamp, limit, orderBy } from "firebase/firestore";
import { IMembers, IHostedDinners, IReviews, IMysteryQuestion, IReviewWeighting } from '../interfaces/index'

const membersRef = collection(FIREBASE_DB, "members");
const dinnersRef = collection(FIREBASE_DB, "hostedDinners");
const membersReviewRef = collection(FIREBASE_DB, 'ratings')
const mysteryQsRef = collection(FIREBASE_DB, 'mysteryQs')
const reviewWeightingRef = collection(FIREBASE_DB, 'weighting')


export const getMembers = (): Promise<IMembers[]> => {
    return new Promise((resolve, reject) => {
        const localMembers: IMembers[] = [];
        onSnapshot(membersRef, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const member: IMembers = {
                    id: doc.id,
                    name: doc.data().name,
                    imgName: doc.data().imgName,
                    email: doc.data().email
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
export const getTodaysDinner = (): Promise<IHostedDinners> => {
    const today = new Date(); // Get the current date
    today.setHours(0, 0, 0, 0); // Set time to midnight for accurate comparison
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    let todayDinnerQuery = query(dinnersRef, where('date', '>=', Timestamp.fromDate(today)), where('date', '<=', Timestamp.fromDate(tomorrow)), limit(1));
    
    return new Promise((resolve, reject) => {
        const localHostedDinners: IHostedDinners[] = [];
        onSnapshot(todayDinnerQuery, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const hostedDinner: IHostedDinners = {
                    id: doc.id,
                    date: doc.data().date.toDate(), // Assuming date is already a Date object
                    hostName: doc.data().hostName,
                    weekNumber: doc.data().weekNumber,
                    season: doc.data().season
                };
                // Check if the dinner date is in the future
                localHostedDinners.push(hostedDinner);
            });
            
            // Sort the dinners by date (newest first)
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
export const getWeighting = (): Promise<IReviewWeighting> => {
    return new Promise((resolve, reject) => {
        let weightingVals: IReviewWeighting;
        onSnapshot(reviewWeightingRef, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const weighting: IReviewWeighting = {
                    id: doc.id,
                    entreeWeighting: doc.data().entreeWeighting,
                    mainWeighting: doc.data().mainWeighting,
                    dessertWeighting: doc.data().dessertWeighting,
                    entertainmentWeighting: doc.data().entertainmentWeighting

                };
                weightingVals = weighting;
            });
            resolve(weightingVals);
        }, reject);
    });
};




