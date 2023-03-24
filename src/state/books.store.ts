import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Book } from './book';
export interface BooksState extends EntityState<Book, number>{
    filter:string;
}
@StoreConfig({ name:'books' })
export class BooksStore extends EntityStore<BooksState>{
    constructor(){
        super({filter: 'ALL'})
    }
}
const bookStore:BooksStore = new BooksStore();
export default bookStore;