import { FIREBASE_DB } from "../../FirebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import { IMembers, IHostedDinners } from '../interfaces/index'

const membersRef = collection(FIREBASE_DB, "members");

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
        onSnapshot(membersRef, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const hostedDinner: IHostedDinners = {
                    id: doc.id,
						date: doc.data().date.toDate(),
						hostName: doc.data().hostName,
						weekNumber: doc.data().weekNumber,
						season: doc.data().season
                };
                localHostedDinners.push(hostedDinner);
            });
            resolve(localHostedDinners);
        }, reject);
    });
}
