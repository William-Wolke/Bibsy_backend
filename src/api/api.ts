// //Import modules
const express = require('express');
import { Request, Response } from 'express';
const bodyParser = require('body-parser');
const app = express();
import { PrismaClient, Prisma, BorrowDetails, Library, Students } from '@prisma/client';
const prisma = new PrismaClient();
app.use(bodyParser.urlencoded({ extended: true}));

//Types

type NumberLibrary = {
    ISBN: Number;
    BookName: String;
    Author: String;
    IsAvailable: Boolean;
    Quantity: Number;
}

//Handlers

//Listen 
app.listen(3001, () => {
    console.log("Listening on 3001");
});
// type bookinf={
//     ISBN:number|undefined;
//     BookName:string|undefined;
//     Author:string|undefined;
//     IsAvailable:boolean|undefined;
//     Quantity:number|undefined;
// }
app.get('/book', async (req: Request, res: Response) => {
    console.log("hej");
    let numIsbn = Number(req.body.isbn);
    let bigIntIsbn = BigInt(numIsbn);
   
    const books = await prisma.library.findUnique({
        where: {
            ISBN: bigIntIsbn
        }
    })
    .then((book) => {
        console.log(book);
        //BigInt is not supported by json we have to convert to Number and then to object again... 🤬 
        let convertedBooks = convertBigIntObject(book);

        res.status(200).json(convertedBooks);
    })
    .catch((e) => {
        res.status(500).send(e.message);
    });
});

app.get('/books', async (req: Request, res: Response) => {
    console.log("hej");
    let datum: Date = new Date();
    let month = new Date().getMonth() + 1;
    console.log(datum.getFullYear() + "/" + month + "/" +  datum.getDate());
   
    const books = await prisma.library.findMany()

    .then((böcker) => {
        console.log(böcker);
        //BigInt is not supported by json we have to convert to Number and then to object again... 🤬 
        let convertedBooks = convertBigIntObjects(böcker);

        res.status(200).json(convertedBooks);
    })
    .catch((e) => {
        res.status(500).send(e.message);
    });
});

app.get('/students', async (req, res) => {
    const members = await prisma.students.findMany()
    .then((members) => {
        res.status(200).send(members);
    })
    .catch((e) => {
        res.status(500).send(e.message);
    });

});

// app.post('/login',(req, res) => {
//     let libId = req.body.id;
//     let pass = req.body.pass;

//     const member = prisma.staff.findUnique({
//         where: {
//             ID: libId,
//             password: pass,
//         },
//     })
//     .then(() => {
//         res.redirect('/');
//     })
//     .catch(() => {
//         res.redirect('/');
//     });
// });

// app.post('/updateStudent',(req, res) => {
    
//     //pass in data
//     const updateUser = prisma.students.update({
//         where: {
//             Email: req.body.email
//         },
//         data: {
//             FirstName: req.body.firstName,
//             LastName: req.body.lastName,
            
//         }
//     })
//     .then(() => {
//         res.redirect('/');
//     })
//     .catch(() => {
//         res.redirect('/');
//     });

// });

// app.post('/updateBook',(req, res) => {
//     //pass in data
//     const updateUser = prisma.books.update({
//         where: {
//             isbn: req.email
//         },
//         data: {
//             name: req.name
//         }
//     })
//     .then(() => {
//         res.redirect('/');
//     })
//     .catch(() => {
//         res.redirect('/');
//     });

// });

// app.post('/borrow',(req, res) => {
//     let ntiId = req.body.ntiId;
//     let staffId = req.body.staff;
//     let studentId = req.body.borrower;
//     let datum: Date = new Date();

//     let borrowBook = {
//         ntiID: ntiId,
//         staffID: staffId,
//         studentID: studentId,
//         borrowedDate: datum,
//     }

//     const borrow = prisma.borrowDetails.create({
//         data: borrowBook
//     })

//     res.redirect('/');
// });

// app.post('/registerBook',(req, res) => {
//     let isbn = req.body.isbn;
//     let author = req.body.author;
//     let published = req.body.published;
//     let title = req.body.title;
//     let amount = req.body.amount;
//     let price = req.body.price;
//     let type = req.body.type;
//     let company = req.body.company;
//     let registeredDate = new Date();
//     let book = {bookName}

//     res.redirect('/');
// });

app.post('/registerStudent', async(req:Request, res:Response) => {
    let FirstName = req.body.FirstName;
    
    let LastName = req.body.LastName;
    let Email = req.body.Email;
    let PhoneNumber = req.body.PhoneNumber;

    let student = {
        FirstName: FirstName,
        LastName: LastName,
        Email: Email,
        PhoneNumber: PhoneNumber,
    }
    
    console.log(student);

    const Student = await prisma.students.create({
        data: student,
      }) 

    res.redirect('/');
    });

// app.post('/deleteStudent',(req, res) => {
    

//     res.redirect('/');
// });

// app.post('/deleteBook',(req, res) => {
    

//     res.redirect('/');
// });

const convertBigIntObjects = (books:Library[]) => {
    //Library type with isbn as number instead of bigint
    let bookArray:NumberLibrary[] = [];

    books.map((book) => {
        //Decunstruct and parse object
        let ISBN = parseInt((books[0].ISBN).toString());
        let BookName = books[0].BookName;
        let Author = books[0].Author;
        let IsAvailable = books[0].IsAvailable;
        let Quantity = (books[0].Quantity);

        //Assembel object again
        let bookInfo = {
            ISBN: ISBN,
            BookName: BookName,
            Author: Author,
            IsAvailable: IsAvailable,
            Quantity: Quantity
        }
        //Push to array
        bookArray.push(bookInfo);
    })   

        
        return bookArray;
}

const convertBigIntObject = (book:Library) => {
    //Library type with isbn as number instead of bigint
    let newBook:NumberLibrary;
    
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