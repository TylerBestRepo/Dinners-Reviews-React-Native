import { Stack } from "expo-router";
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDLx-gMyR3c9KW5-y5wvhD20FkTaaF3k10",
    authDomain: "dinner-reviews.firebaseapp.com",
    databaseURL: "https://dinner-reviews-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "dinner-reviews",
    storageBucket: "dinner-reviews.appspot.com",
    messagingSenderId: "18080028640",
    appId: "1:18080028640:web:478f1d78e00aeb6d9cbd85",
    measurementId: "G-EJXPLPT8L3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const client = new ApolloClient({
    uri: 'https://rangae.stepzen.net/api/intent-squirrel/__graphql',
    cache: new InMemoryCache(),
    headers: {
        Authorization:
            'apikey rangae::stepzen.io+1000::bfa26edbd59e30d334bb857d95c4278ef4ed1595a16d5bfb874fb5f972fafcbe'
    }
});

const RootLayout = () => {
    return (
        <ApolloProvider client={client}>
            <Stack 
            screenOptions={{headerShown: false}}/>
        </ApolloProvider>
    );
}

export default RootLayout;
