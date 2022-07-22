
import { useContext, useEffect } from "react"
import { deleteBook, getBooks } from "../firebase/firebase"
import { Bookscontext } from "../store/store"
import "./BookList.css"

function BookList()
{
 
  const {books,setBooks,editBookId,setEditAuthor,setEditName,setEditStatus,setEditBookId}=useContext(Bookscontext);
  const handleDelete=async(bookId,e)=>{
   
    if(editBookId==bookId)
    {

      setEditAuthor('')
      setEditName('')
      setEditStatus('')
      setEditBookId('')
    }
    deleteBook(bookId)
    const newBookList=await getBooks();
    setBooks(newBookList)
   
    
  }
  const handleEdit=async({author,name,status,bookId})=>{
    setEditAuthor(author)
    setEditName(name)
    setEditStatus(status)
    setEditBookId(bookId)
  }
  useEffect(()=>{
    const fetchBookList=async()=>{
      let booklist= await getBooks();
      setBooks(booklist);
    }
   fetchBookList()
  },[])


return (
  <>
  <h1>List of Books</h1>
<table>
  <tr>
    <th>Author</th>
    <th>Name</th>
    <th>Status</th>
  </tr>
  {
  books &&  books.length>0?
  books.map((book)=>{
  return <tr key={book.data.name}>
    <td>{book.data.author}</td>
    <td>{book.data.name}</td>
    <td>{book.data.status}</td>
    <td><button onClick={()=>handleEdit({author:book.data.author,name:book.data.name,status:book.data.status,bookId:book.id})} >Edit</button></td>
    <td><button id="delete" onClick={(e)=>handleDelete(book.id)}>Delete</button></td>
  </tr>
  }):
  !books?  
  <div>Books List Loading...</div>:<div>No book found</div>

}
</table>

</>

)

}
export default BookList


