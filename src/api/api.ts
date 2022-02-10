// //Import modules
const express = require('express');
import { Request, Response } from 'express';
const bodyParser = require('body-parser');
const app = express();
import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();
import JSONbig from 'json-bigint';
app.use(bodyParser.urlencoded({ extended: true}));

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
app.get('/books', async (req: Request, res: Response) => {
    console.log("hej");
   
    const books = await prisma.library.findMany()

    .then((böcker) => {
        console.log(böcker);
        //BigInt is not supported by json we have to convert to Number and then to object again... 🤬 
        const ISBN = parseInt((böcker[0].ISBN).toString());
        const BookName = böcker[0].BookName;
        const Author = böcker[0].Author;
        const IsAvailable = böcker[0].IsAvailable;
        const Quantity = (böcker[0].Quantity);
        //Assembel object again
        const bookinfo = {
            ISBN: ISBN,
            BookName: BookName,
            Author: Author,
            IsAvailable: IsAvailable,
            Quantity: Quantity
        }
        res.status(200).json(bookinfo);
    })
    .catch((e) => {
        res.status(500).send(e.message);
    });
});

app.get('/students', (req, res) => {
    const members = prisma.students.findMany()
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
//     let isbn = req.body.isbn;
//     let ntiId = req.body.ntiId;
//     let bookName = req.body.bookName;
//     let author = req.body.author;
//     let isAvailable = req.body.isAvailable;
//     let librarianId = req.body.librarian;
//     let studentId = req.body.borrower;
    
//     let borrowBook = {
//         ISBN: isbn,
//         BookName: bookName,
//         Author: author,
//         IsAvailable: isAvailable,

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

//     res.redirect('/');
// });

// app.post('/registerUser',(req, res) => {
//     let id = req.body.id;
//     let firstName = req.body.firstName;
//     let lastName = req.body.lastName;
//     let email = req.body.email;
//     let pass = req.body.pass;
    

//     res.redirect('/');
// });

// app.post('/deleteUser',(req, res) => {
    

//     res.redirect('/');
// });

// app.post('/deleteBook',(req, res) => {
    

//     res.redirect('/');
// });