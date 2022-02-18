import { PrismaClient, Prisma, BorrowDetails, Library, Students } from '@prisma/client';

type NumberLibrary = {
    ISBN: Number;
    BookName: String;
    Author: String;
}

export const ConvertBigIntObjects = (books:Library[]) => {
    //Library type with isbn as number instead of bigint
    let bookArray:NumberLibrary[] = [];

    books.map((book) => {
        //Decunstruct and parse object
        let ISBN = parseInt((books[0].ISBN).toString());
        let BookName = books[0].ItemName;
        let Author = books[0].Author;

        //Assembel object again
        let bookInfo = {
            ISBN: ISBN,
            BookName: BookName,
            Author: Author,
        }
        //Push to array
        bookArray.push(bookInfo);
    })    
        return bookArray;
}

export const ConvertBigIntObject = (book:Library) => {
    //Library type with isbn as number instead of bigint
    let newBook: NumberLibrary;
    
        //Decunstruct and parse object
        let ISBN = parseInt((book[0].ISBN).toString());
        let BookName = book[0].BookName;
        let Author = book[0].Author;
        let IsAvailable = book[0].IsAvailable;
        let Quantity = (book[0].Quantity);

        //Assembel object again
        let bookInfo = {
            ISBN: ISBN,
            BookName: BookName,
            Author: Author,
            IsAvailable: IsAvailable,
            Quantity: Quantity
        }
        
        return bookInfo;
}