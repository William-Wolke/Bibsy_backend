// //Import modules
// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();
// import { PrismaClient, Prisma } from '@prisma/client';
// const prisma = new PrismaClient();

// app.use(bodyParser.urlencoded({ extended: true}));

// //Handlers

// //Listen 
// app.listen(3001, () => {
//     console.log("Listening on 3001");
// });

// app.get('/books', (req, res) => {
//     /*const books = prisma.books.findMany()
//     .then(() => {
//         res.redirect('/');
//     })
//     .catch(() => {
//         res.redirect('/');
//     });*/

// });

// app.get('/users', (req, res) => {
//     /*const members = prisma.members.findMany()
//     .then(() => {
//         res.redirect('/');
//     })
//     .catch(() => {
//         res.redirect('/');
//     });*/

// });

// app.post('/login',(req, res) => {
//     /*let libId = req.body.id;
//     let pass = req.body.pass;

//     const member = prisma.members.findUnique({
//         where: {
//             details: {
//                 id: libId,
//                 password: pass,
//             },
//         },
//     })
//     .then(() => {
//         res.redirect('/');
//     })
//     .catch(() => {
//         res.redirect('/');
//     });*/
    
// });

// app.post('/updateUser',(req, res) => {
    
//     //pass in data
//     const updateUser = prisma.users.update({
//         where: {
//             email: req.email
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
//     let librarianId = req.body.librarian;
//     let borrowerId = req.body.borrower;
    
//     let borrowBook = {
//         "isbn": isbn,
//         "ntiId": ntiId,
//         "librarianId": librarianId,
//         "borrowerId": borrowerId
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