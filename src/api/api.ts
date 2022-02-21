
//Import modules
import { 
    Request, 
    response, 
    Response 
} from 'express';

import { 
    PrismaClient, 
    Prisma, 
    BorrowDetails, 
    Library, 
    Students 
} from '@prisma/client';

import {
    ConvertBigIntObjects, 
    ConvertBigIntObject,
    ConvertBigIntTemplate
} from '../bigIntConvert';
import {
    SHA256,
    core
} from 'crypto-js';
import cors from 'cors';
const prisma = new PrismaClient();
const bodyParser = require('body-parser');
const MD5 = require('md5');
const express = require('express');
const app = express();
const nodePort = 3001;
let bodyparsee = bodyParser.urlencoded({ extended: false});
import axios from 'axios';


app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json())
app.use(cors({
    accept:'*',
    method:'POST, GET'
}));

async function FetchPass(userName,ggpassword) {
    const query = await prisma.login.findUnique({
        where:{
            UserName: userName,
        },
        select:{
            PassWord: true,
        }
    }).then((response) => {
        // console.log(response)
        const tester =String(response.PassWord);
        const incomingPassword = String(ggpassword);
      
        if(tester !== incomingPassword) return false;
        return true;

    }).catch(err => {
        // console.error(err);
        return (`User '${userName}' doesn't Exist Check your spelling and try again`);
        
    })
     return query;
}

//Types
type NumberLibrary = {
    ISBN:           Number; 
    BookName:       String;
    Author:         String;
    IsAvailable:    Boolean;
    Quantity:       Number;
}

//Handlers

//Listen 
app.listen(nodePort, () => {
    console.log("Listening on: " + nodePort);
});

app.post('/login',bodyparsee, async (req, res) => {
    let username = req.body.id;
    let Hash = MD5(req.body.pass);

    let dejan = () => {
        return FetchPass(username, Hash)
        .then((response) => {
            if(response){
            console.log(response)   
            return ('/dashboard')
            }
        })
        // .then((response) => {
        //     console.log(response)
        // })
    }
    await dejan().then((response) => {
        res.redirect('http://192.168.198.25:2398' + response)
    })
});
// type bookinf={
//     ISBN:number|undefined;
//     BookName:string|undefined;
//     Author:string|undefined; 
//     IsAvailable:boolean|undefined;
//     Quantity:number|undefined;
// }

//Returns singular book for viewing its details
app.get('/book:ISBN', async (req: Request, res: Response) => {
    console.log("hej");
    let numIsbn = Number(req.params.ISBN);
    let bigIntIsbn = BigInt(numIsbn);
   
    const books = await prisma.library.findUnique({
        where: {
            ISBN: bigIntIsbn
        }
    })
    .then((book) => {
        console.log(book);
        //BigInt is not supported by json we have to convert to Number and then to object again... 🤬 
        let convertedBooks = ConvertBigIntObject(book);


        res.status(200).json(convertedBooks);
    })
    .catch((err) => {
        res.status(500).send(err.message);
    });
});

//Returns singular book for viewing its details
app.get('/bookTemplate/:ISBN', async (req: Request, res: Response) => {
    console.log("hej");
    let numIsbn = Number(req.params.ISBN);
    let bigIntIsbn = BigInt(numIsbn);
   
    const template = await prisma.template.findUnique({
        where: {
            ID: bigIntIsbn,
        },
    })
    .then((template) => {
        console.log(template);
        //BigInt is not supported by json we have to convert to Number and then to object again... 🤬 
        let convertedTemplate = ConvertBigIntTemplate(template);

        res.status(200).send(convertedTemplate);
    })
    .catch((e) => {
        res.status(500).send(e.message);
    });
});


app.get('/staff/:ID', async (req: Request, res: Response) => {
    //Convert to number
    let ID = parseInt((req.params.ID).toString());
   
    //Call prismas findUnique method on library
    const staff = await prisma.staff.findUnique({
        //Find unique staff member where ID = passed ID from params
        where: {
            ID: ID,
        },
    })
    .then((staff) => {
        console.log(staff);

        //Send back respons from db
        res.status(200).json(staff);
    })
    .catch((e) => {
        res.status(500).send(e.message);
    });
});

//Returns singular book for viewing its details
app.get('/staffPermissions', async (req: Request, res: Response) => {
    //Convert to number
    let PID = (req.params.PID).toString();
   
    //Call prismas findUnique method on library
    const staff = await prisma.permissions.findUnique({
        //Find unique staff member where ID = passed ID from params
        where: {
            PID: PID,
        },
    })
    .then((staff) => {
        console.log(staff);

        //Send back respons from db
        res.status(200).json(staff);
    })
    .catch((e) => {
        res.status(500).send(e.message);
    });
});

//Returns singular book for viewing its details
app.get('/student/:ID', async (req: Request, res: Response) => {
    //Convert to number
    let ID = parseInt((req.body.isbn).toString());
   
    //Call prismas findUnique method on library
    const student = await prisma.students.findUnique({
        where: {
            //Find unique student member where ID = passed ID from params
            ID: ID,
        },
    })
    .then((student) => {
        console.log(student);

        //Send back respons from db
        res.status(200).json(student);
    })
    .catch((e) => {
        res.status(500).send(e.message);
    });
});

//Returns singular book for viewing its details
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
    const students = await prisma.students.findMany()
    .then((students) => {
        res.status(200).send(students);
    })
    .catch((e) => {
        res.status(500).send(e.message);
    });
});

app.get('/staff', async (req: Request, res: Response) => {
    //Call prismas findMany method on students
    const staff = await prisma.staff.findMany()
    .then((staff) => {
        console.log(staff);
        res.status(200).send(staff);
    })
    .catch((e) => {
        res.status(500).send(e.message);
    });
});

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
        },
    })
    .then(() => {
        res.redirect('/');
    })
    .catch(() => {
        res.redirect('/');
    });
});

app.post('/borrow',(req, res) => {
    let ntiId = req.body.ntiId;
    let staffId = req.body.staff;
    let studentId = req.body.borrower;
    let datum: Date = new Date();

    let borrowBook: BorrowDetails = {
        NTI_ID: ntiId,
        Staff_ID: staffId,
        Student_ID: studentId,
        Date: datum,
    }

    const borrow = prisma.borrowDetails.create({
        data: borrowBook,
    })
    .then(() => {
        res.status(200);
    })
    .catch((err) => {
        console.error(err);
        res.status(500);
    });
});

app.post('/registerBook', async(req: Request, res: Response) => {
    
    let ISBN = BigInt(parseInt((req.body.isbn).toString()));

    let book = {
        ISBN: ISBN,
        Title: req.body.title,
        ItemName: req.body.title,
        Author: req.body.author,
        NTI_s_ID: req.body.id,
        Publisher: req.body.publisher,
        Language: req.body.lang,
        Cover: req.body.coverLink,
        Description: req.body.desc,
        Pages: req.body.pages,
        Publish_Date: req.body.date,
    };
    if(!res){
        console.log(res);
        res.status(500);
    }
    else{
        const Book = await prisma.library.create({
            data: book,
        })
        res.status(200);
    }
});

// app.post('/registerStudent', async(req:Request, res:Response) => {

//     let student = {
//         FirstName: req.body.FirstName,
//         LastName: req.body.LastName,
//         Email: req.body.Email,

//Register book
// app.post('/registerBook', async(req: Request, res: Response) => {
//     let ISBN;
//     let BookName;
//     let Author;
//     let Quantity;


//     const url = `https://www.bokus.com/bok/${req.body.isbn}`;
//     const gbi = await getBookInfo(url).then((books) => {
//         prisma.library.create({
//             data: {
//                 ISBN: BigInt(parseInt((books.data.isbn).toString())),
//                 BookName: books.data.title,
//                 Author: books.data.author,
//                 Quantity: 0,
//                 IsAvailable: false,
//             }})
//             .catch(error=>{
//                 console.log(error);
//             })
//         }).catch((e) => {
//             res.json(e);
//             // return e.message;
//         });
    
      
//     res.redirect('/');
// });

//Register student
// app.post('/registerStudent', async(req:Request, res: Response) => {

//     let student = {
//         FirstName: req.body.FirstName,
//         LastName: req.body.LastName,
//         Email: req.body.Email, 
//         PhoneNumber: req.body.PhoneNumber,
//     }
    
//     console.log(student);

//     const Student = await prisma.students.create({
//         data: student,
//       }) 

//     res.redirect('/');
//     });

// app.post('/deleteStudent', async (req, res) => {
//     console.log(req.body.email);


//     const deleteStudent = await prisma.students.delete({
//         where: {
//             Email: req.body.email,
//         },
//     });

//     res.redirect('/');
// });

//Delete book by isbn
// app.post('/deleteBook', async (req, res) => {
//     let ISBN = BigInt(parseInt((req.body.isbn).toString()));
//     const deleteBook = await prisma.library.delete({
//         where: {
//             ISBN: ISBN,
//         },
//     });

//     res.redirect('/');
// });