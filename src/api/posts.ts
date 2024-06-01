import { FIREBASE_DB } from "../../FirebaseConfig";
import { collection, onSnapshot, query, Query, where, Timestamp, limit, orderBy, addDoc } from "firebase/firestore";
import { IMembers, IHostedDinners, IReviewInput, IMysteryQuestion, IReviewWeighting } from '../interfaces/index'

const membersRef = collection(FIREBASE_DB, "members");
const dinnersRef = collection(FIREBASE_DB, "hostedDinners");
const membersReviewRef = collection(FIREBASE_DB, 'ratings')
const mysteryQsRef = collection(FIREBASE_DB, 'mysteryQs')
const reviewWeightingRef = collection(FIREBASE_DB, 'weighting')


export const addReview = async (review: IReviewInput): Promise<void> => {
    try {
        await addDoc(membersReviewRef, {
            name: review.reviewer,
            cook: review.cook,
            entreeRating: review.entreeRating,
            mainRating: review.mainRating,
            dessertRating: review.dessertRating,
            entertainmentRating: review.entertainmentRating,
            date: new Date(),
            weekNumber: review.weekNumber,
            season: review.season,
            writtenReview: review.writtenReview,
        });
        console.log("Review added successfully!");
    } catch (error) {
        console.error("Error adding review: ", error);
    }
};
