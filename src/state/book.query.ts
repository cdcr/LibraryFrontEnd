import { QueryEntity } from '@datorama/akita';
import booksStore, {BooksStore, BooksState} from './books.store';
export class BooksQuery extends QueryEntity<BooksState>{
    constructor(protected book: BooksStore) {
        super(book);
    }
}
const booksQuery:BooksQuery = new BooksQuery(booksStore);
export default booksQuery;