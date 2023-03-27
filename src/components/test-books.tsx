import { useEffect, useState } from "react";
import { Book } from "../state/book";
import { BookFilters } from "../state/bookfilters";
import booksQuery from "../state/book.query";
import booksService from "../state/book.service";
const books$ = booksQuery.selectAll();
export default function TestBooks() 
{
    const[bookList, setBookList] = useState<Array<Book>>([]);
    const[selects, setSelects] = useState<string>('title');
    const[value, setValue] = useState('');
    const[currentPage,setCurrentPage]= useState(0);
    const filteredBooks = (): Book[] =>{
        if(value.length === 0 )
        {
            return bookList.slice(currentPage,currentPage + 5);
        }            
        const filtered = bookList.filter(b => b[selects as keyof BookFilters].includes(value));
        return filtered.slice(currentPage,currentPage + 5);
    }
    const nextPage = () => {
        if(currentPage + 5 < bookList.length)
            setCurrentPage(currentPage + 5);

    }

    const prevPage = () => {
        if(currentPage >0)
            setCurrentPage(currentPage - 5);
    }

    useEffect(() => {
        booksService.getBooks();
        books$.subscribe((list) => setBookList(list));
    }, [books$]);
    return (
        <div className="container">
            <div className="mt-5">
                <select className="btn btn-dark dropdown-toggle"  value={selects} onChange={e => setSelects(e.target.value)}>
                <option value={"title"}>Title</option>
                <option value={"firstName"}>First Name</option>
                <option value={"lastName"}>Last Name</option>
                <option value={"type"}>Type</option>
                <option value={"isbn"}>ISBN</option>
                <option value={"category"}>Category</option>
                </select>
            </div>
            
            <hr/>
            <input className="input-group-text" type="text" value={value} onChange={e => setValue(e.target.value)}></input>
            <hr/>
            {/*<button className="btn btn-warning" type="button" onClick={() => booksService.getBooksByField(selects, value)}>Search Book</button>*/}
            <h3>Book List</h3>
            <hr/>

            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Total Copies</th>
                        <th>Copies in use</th>
                        <th>Type</th>
                        <th>ISBN</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredBooks().length > 0 && filteredBooks().map((item,index) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                            <td>{item.totalCopies}</td>
                            <td>{item.copiesInUse}</td>
                            <td>{item.type}</td>
                            <td>{item.isbn}</td>
                            <td>{item.category}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <hr/>
            <div className="m-0 row justify-content-center">
            <div className="col-auto text-center">
            <button className="btn btn-primary" onClick={prevPage}>
                Preview
            </button>
            &nbsp;
            &nbsp;
            <button className="btn btn-primary" onClick={ nextPage }>
                Next
            </button>
            </div>
            
            </div>
        </div>
    )
}