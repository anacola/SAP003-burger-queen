// import * as firebase from 'firebase';
import firebase from 'firebase';
import 'firebase/firestore'


const config = {
        apiKey: "AIzaSyAxcaVeu_v4qf-tXRdvO_B1YSMHCn8Z2wk",
        authDomain: "burger-queen-72eb4.firebaseapp.com",
        databaseURL: "https://burger-queen-72eb4.firebaseio.com",
        projectId: "burger-queen-72eb4",
        storageBucket: "burger-queen-72eb4.appspot.com",
        messagingSenderId: "456759148471",
        appId: "1:456759148471:web:e83cb9860c718a9d523232",
        measurementId: "G-PH1M4224QT"
};

const firebaseApp = firebase.initializeApp(config);
const firestore = firebaseApp.firestore();

export default firestore