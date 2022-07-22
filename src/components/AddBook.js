import { useState,useContext, useEffect } from "react";
import {Bookscontext} from "../store/store"
import {addBook,getBooks} from "../firebase/firebase"
let defaultBookFields={
    author:'',
    name:'',
    status:''
}

function AddBook()
{

    let {setBooks,editAuthor,editName,editStatus,editBookId,setEditStatus}=useContext(Bookscontext)
    useEffect(()=>{
        if(editStatus!='')
{
    setBookFields({author:editAuthor,name:editName,status:editStatus})
}
else{
    setBookFields({author:'',name:'',status:''})
}

    },[editName,editAuthor,editStatus])
let [bookField,setBookFields]=useState(defaultBookFields);
let [activeStatus,setActiveStatus]=useState('');
let [adding,setAdding]=useState(false);
 

 const handleChange=(e)=>{
    const {id,value}= e.target
    setBookFields({...bookField,[id]:value})
 }
    const handleSubmit=async(e)=>{
        setAdding(true)
        e.preventDefault()
        if(bookField.author!='' && bookField.name!='' && bookField.status!='')
        {
     
     let newBook=   await addBook(bookField.author,bookField.name,bookField.status,editBookId);
     const newBookList= await getBooks();
     setBooks(newBookList)
     setBookFields({author:'',name:'',status:''})
        setActiveStatus('');
        setEditStatus('')
        setAdding(false)
        }
        else{
            alert("Please fill all the required fields")
        }
    }
const handleRefresh=async()=>{
let allBooks=await getBooks()
setBooks(allBooks);
}
    return (
        <form onSubmit={handleSubmit}>
        <div className='books-container'>
            <div >
            <label htmlFor='author'>Author: </label>
            <input id='author' value={bookField.author}  onChange={handleChange} />
            </div>
            <div>
            <label htmlFor='name'>Name: </label>
            <input id='name' value={bookField.name}  onChange={handleChange} />
            </div>
            <div>
            <label htmlFor="status" >Choose the status of book:</label>
            <div>
                <button id="status" type="button" onClick={(e)=>{
                    handleChange(e)
                    setActiveStatus('Available')
                    }} style={{ backgroundColor:(activeStatus || editStatus) =='Available'?"gray":""}} value="Available">Available</button>
                <button id="status" type="button" onClick={(e)=>{
                    handleChange(e)
                    
                    setActiveStatus('Not Available')
                    }}  style={{ backgroundColor:(activeStatus || editStatus) =='Not Available'?"gray":""}} value="Not Available">Not Available</button>
            </div>
           
            </div>

            <div>
                <button style={{backgroundColor:adding?"gray":""}} id="add-update" >{adding?"Adding/Updating book details":"Add book/Update book"}</button>
            </div>
            </div>
            </form>
 )
 }

 export default AddBook;