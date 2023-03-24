import booksStore, { BooksState, BooksStore } from "./books.store";
export class BooksService {
    async getBooks(){
        booksStore.setLoading(true);
        fetch("https://localhost:44345/api/Book")
        .then((response) => response.json())
        .then((response) => {
            booksStore.add(response);
            booksStore.setLoading(false);
        })
        .catch((error) => booksStore.setError(error));
    }
    async getBooksByField(field:string, value: string){
        booksStore.setLoading(true);
        fetch(`https://localhost:44345/api/Book/Search?field=${field}&&value=${value}`)
        .then((response) => response.json())
        .then((response) => {
            booksStore.add(response);
            booksStore.setLoading(false);
        })
        .catch((error) => booksStore.setError(error));
    }
}
const booksService:BooksService = new BooksService();
export default booksService;
