import { PrismaClient, Prisma, BorrowDetails, Library, Students } from '@prisma/client';

type NumberLibrary = {
    ISBN: Number;
    Publisher: string;
    Title: String;
    Author: String;
    Language: string;
}

export const ConvertBigIntObjects = (books:Library[]) => {
    //Library type with isbn as number instead of bigint
    let bookArray:NumberLibrary[] = [];

    books.map((book) => {
        //Decunstruct and parse object
        let ISBN = parseInt((book.ISBN).toString());
        let Title = book.Title;
        let Author = book.Author;
        let Publisher = book.Publisher;
        let Language = book.Language;

        //Assembel object again
        let bookInfo = {
            ISBN: ISBN,
            Title: Title,
            Author: Author,
            Publisher: Publisher,
            Language: Language,
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
        let ISBN = parseInt((book.ISBN).toString());
        let Title = book.Title;
        let Author = book.Author;
        let Publisher = book.Publisher
        let Language = book.Language;

        //Assembel object again
        let bookInfo = {
            ISBN: ISBN,
            Title: Title,
            Author: Author,
            Publisher: Publisher,
            Language: Language,
        }
        
        return bookInfo;
}