//Import modules
const express = require('express');
import { Request, Response } from 'express';
const bodyParser = require('body-parser');
const app = express();
import { PrismaClient, Prisma, BorrowDetails, Library, Students } from '@prisma/client';
import {ConvertBigIntObjects, ConvertBigIntObject} from '../bigIntConvert';
import {getBookInfo} from '../PrivateBookAPI/getBookInfo';
const prisma = new PrismaClient();
//Using bodyparser
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

//Maybie not needed???
app.get('/book', async (req: Request, res: Response) => {
    //Convert to number then to bigint
    let ISBN = BigInt(parseInt((req.body.isbn).toString()));
   
    //Call prismas findUnique method on library
    const books = await prisma.library.findUnique({
        where: {
            ISBN: ISBN,
        },
    })
    .then((book) => {
        console.log(book);
        //BigInt is not supported by json we have to convert to Number and then to object again... 🤬 
        let convertedBooks = ConvertBigIntObject(book);

        res.status(200).json(convertedBooks);
    })
    .catch((e) => {
        res.status(500).send(e.message);
    });
});

app.get('/books', async (req: Request, res: Response) => {
   
    //Call prismas findMany method on library
    const books = await prisma.library.findMany()

    .then((böcker) => {
        console.log(böcker);
        //BigInt is not supported by json we have to convert to Number and then to object again... 🤬 
        let convertedBooks = ConvertBigIntObjects(böcker);

        res.status(200).json(convertedBooks);
    })
    
    .catch((e) => {
        res.status(500).send(e.message);
    });
});

app.get('/students', async (req: Request, res: Response) => {
    //Call prismas findMany method on students
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

app.post('/updateStudent',(req: Request, res: Response) => {
    
    //Call prismas update method on students
    const updateUser = prisma.students.update({
        //By email
        where: {
            Email: req.body.email
        },
        //Lazy replace everything
        data: {
            FirstName: req.body.firstName,
            LastName: req.body.lastName,
            Email: req.body.email,
            PhoneNumber: req.body.phone,
        },
    })
    .then(() => {
        res.redirect('/');
    })
    .catch(() => {
        res.redirect('/');
    });

});

//Update book
app.post('/updateBook', async(req: Request, res: Response) => {
    //Convert to bigint
    let ISBN = BigInt(parseInt((req.body.isbn).toString()));
    let ISBN2 = BigInt(parseInt((req.body.isbn2).toString()));
    //Convert to Number
    let Quantity = parseInt((req.body.amount).toString());
    let isAvailable = false;

    //Determin isAvailable
    if(Quantity){
        isAvailable = true; 
    }
    else {
        isAvailable = false;
    }
    //pass in data
    const updateUser = await prisma.library.update({
        where: {
            ISBN: ISBN
        },
        //Lazy replace everything 
        data: {
            ISBN: ISBN2,
            ItemName: req.body.bookName,
            Author: req.body.author,
            Quantity: Quantity,
            IsAvailable: isAvailable,
        },
    })
    .then(() => {
        res.redirect('/');
    })
    .catch(() => {
        res.redirect('/');
    });

});

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
//         data: {borrowBook}
//     })

//     res.redirect('/');
// });

//Register book
app.post('/registerBook', async(req: Request, res: Response) => {
    let ISBN;
    let BookName;
    let Author;
    let Quantity;


    const url = `https://www.bokus.com/bok/${req.body.isbn}`;
    const gbi = await getBookInfo(url).then((books) => {
        prisma.library.create({
            data: {
                ISBN: BigInt(parseInt((books.data.isbn).toString())),
                BookName: books.data.title,
                Author: books.data.author,
                Quantity: 0,
                IsAvailable: false,
            }}).catch(error=>{
                console.log(error);
            })
        }).catch((e) => {
            res.json(e);
            // return e.message;
        });
    
      
    res.redirect('/');
});

//Register student
app.post('/registerStudent', async(req:Request, res: Response) => {

    let student = {
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Email: req.body.Email, 
        PhoneNumber: req.body.PhoneNumber,
    }
    
    console.log(student);

    const Student = await prisma.students.create({
        data: student,
      }) 

    res.redirect('/');
    });

//Delete student by email
app.post('/deleteStudent', async (req: Request, res: Response) => {
    console.log(req.body.email);

    const deleteStudent = await prisma.students.delete({
        where: {
            Email: req.body.email,
        },
    });

    res.redirect('/');
});

//Delete book by isbn
app.post('/deleteBook', async (req: Request, res: Response) => {
    let ISBN = BigInt(parseInt((req.body.isbn).toString()));

    const deleteBook = await prisma.library.delete({
        where: {
            ISBN: ISBN,
        },
    });

    res.redirect('/');
});

