import { createContext, useState } from "react";

export const Bookscontext=createContext();

export const BooksProvider=({children})=>{
   let [books,setBooks]=useState(null);
   let [editAuthor,setEditAuthor]=useState('')
   let [editName,setEditName]=useState('')
   let [editStatus,setEditStatus]=useState('')
   let[editBookId,setEditBookId]=useState('')
      let contextValue={books,setBooks,editAuthor,setEditAuthor,editName,setEditName,editStatus,setEditStatus,editBookId,setEditBookId}
   return(
      <Bookscontext.Provider value={contextValue}>{children}</Bookscontext.Provider>
   )
}