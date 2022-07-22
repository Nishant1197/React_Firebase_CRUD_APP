import React, { useContext, useState } from 'react'
import { addBook,getBooks,deleteBook,editBook } from '../firebase/firebase';
import { Bookscontext } from '../store/store';
import AddBook from './AddBook'
import BookList from './BookList';
import "./Home.css"


function Home() {
           return     <div>

              <h1>Library of Firestore</h1>
             <AddBook/>
             <BookList/>
             </div>
}


export default Home