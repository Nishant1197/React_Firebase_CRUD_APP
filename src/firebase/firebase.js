import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs,getDoc,  doc, deleteDoc,updateDoc  } from "firebase/firestore"; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: <YOURAPIKEY>,
  authDomain: <YOURAUTHDOAMIN>,
  projectId: <YOURPROJECTID>,
  storageBucket: <YOURSTORAGEBUCKET>,
  messagingSenderId: <YOURMESSAGINGSENDERID>,
  appId: <YOURAPPID>
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const addBook=async (author,name,status,editBookId)=>{
 if(editBookId!='')
 {
  const bookRef=doc(db,'books',editBookId)
      try{
        await updateDoc(bookRef, {
          author,
          name,
          status
            });
          }
          catch(err)
          {
            console.log("Error updating document: ", err);
          
      }
    
 }
    
   else{
      try{
    
        const docRef = await addDoc(collection(db, "books"),
         {
          author,
          name,
          status
        });
        console.log("Document written with ID: ", docRef);
       
}
catch(e)
{
    alert("Error adding document: ", e);
}


   }
}


export const getBooks=async()=>{
    const querySnapshot = await getDocs(collection(db, "books"));
    let array=[];
    querySnapshot.forEach((doc) => {
    let data={id:doc.id,data:doc.data()}
    array.push(data)
    })
   return array;
}

export const deleteBook=async(bookId)=>{
  await deleteDoc(doc(db, "books", bookId));
}


export const editBook=async(book,author,name,status)=>{
  const bookRef = doc(db, "cities",book);
  await updateDoc(bookRef, {
author,
name,
status
  });
}