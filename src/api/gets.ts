import { FIREBASE_DB } from "../../FirebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import { IMembers, IHostedDinners } from '../interfaces/index'

const membersRef = collection(FIREBASE_DB, "members");
const dinnersRef = collection(FIREBASE_DB, "hostedDinners");

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


