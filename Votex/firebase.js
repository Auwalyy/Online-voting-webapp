import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore"; // Import Firestore methods

const firebaseConfig = {
    apiKey: "AIzaSyB33OllYqsAWw3SYM7YdsdHhtVwJyDZ5XE",
    authDomain: "online-voting-system-b757c.firebaseapp.com",
    projectId: "online-voting-system-b757c",
    storageBucket: "online-voting-system-b757c.firebasestorage.app",
    messagingSenderId: "31035256048",
    appId: "1:31035256048:web:c7dddf1013685d6c476635",
    measurementId: "G-6QTH6NTYH5"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

// 1. Adding a user
const addUser = async() => {
    try {
        const docRef = await addDoc(collection(db, "users"), {
            email: "user@example.com",
            name: "John Doe",
            role: "voter", // or "admin"
            communityId: "community123",
            hasVoted: false
        });
        console.log("User added with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding user: ", e);
    }
};

// 2. Adding an election
const addElection = async() => {
    try {
        const docRef = await addDoc(collection(db, "elections"), {
            title: "Presidential Election 2025",
            description: "Choose the next president",
            startDate: new Date("2025-05-01T09:00:00"),
            endDate: new Date("2025-05-02T17:00:00"),
            status: "upcoming", // can be "upcoming", "ongoing", or "completed"
            communityId: "community123",
            isPublic: true,
            allowedVoterEmails: ["voter1@example.com", "voter2@example.com"]
        });
        console.log("Election added with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding election: ", e);
    }
};

// 3. Adding a candidate
const addCandidate = async() => {
    try {
        const docRef = await addDoc(collection(db, "candidates"), {
            electionId: "electionDocId123", // Replace with the actual election document ID
            name: "John Doe",
            description: "Experienced leader",
            photoUrl: "https://linktoimage.jpg",
            votes: 0
        });
        console.log("Candidate added with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding candidate: ", e);
    }
};

// 4. Adding a vote
const addVote = async() => {
    try {
        const docRef = await addDoc(collection(db, "votes"), {
            electionId: "electionDocId123", // Replace with the actual election document ID
            candidateId: "candidateDocId456", // Replace with the actual candidate document ID
            userId: "userDocId789", // Replace with the actual user document ID
            timestamp: serverTimestamp() // Automatically set the timestamp
        });
        console.log("Vote added with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding vote: ", e);
    }
};

// Calling functions (You can trigger these based on events like form submissions)
addUser();
addElection();
addCandidate();
addVote();

export { app, db, addUser, addElection, addCandidate, addVote };
export default app;