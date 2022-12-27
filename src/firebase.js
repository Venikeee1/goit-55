import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCM-gupMVE3yfSPYRlhsbDLu7Df6wgpXg8',
  authDomain: 'education-7de81.firebaseapp.com',
  projectId: 'education-7de81',
  storageBucket: 'education-7de81.appspot.com',
  messagingSenderId: '785770927786',
  appId: '1:785770927786:web:70f3d46aa808b34962e2d3',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const getCars = async () => {
  const carsRef = collection(db, 'cars');
  const carsSnapshot = await getDocs(carsRef);

  const cars = carsSnapshot.docs.map((doc) => doc.data());
};

getCars();
