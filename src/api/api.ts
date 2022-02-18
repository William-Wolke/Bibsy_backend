
// //Import modules
import { 
    Request, 
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
    ConvertBigIntObject
} from '../bigIntConvert';
import cors from 'cors';
import { PrismaClient, Prisma, BorrowDetails, Library, Students } from '@prisma/client';
import { ConvertBigIntObjects, ConvertBigIntObject } from '../bigIntConvert';
//import { getBookInfo } from '../PrivateBookAPI/getBookInfo';
import bCrypt from 'bcryptjs';
const prisma = new PrismaClient();
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const nodePort = 2398;
let bodyparsee = bodyParser.urlencoded({ extended: false});
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
            PassWord: true
        }
    }).then((response) => {
        const tester:any =(response.PassWord)
        if (!tester==ggpassword) {
            return true
            console.log("Password is incorrect")
        }
        console.log("Password is correct")
        return false; 
    })
} 

//Types
// type NumberLibrary = {
//     ISBN: Number;
//     BookName: String;
//     Author: String;
//     IsAvailable: Boolean;
//     Quantity: Number;
// }

//Handlers

//Listen 
app.listen(nodePort, () => {
    console.log("Listening on: " + nodePort);
});

app.post('/login',bodyparsee, async (req, res) => {
    res.json(req.body)
   
    let password = await FetchPass(req.body.id,req.body.pass)
    
    .then((response => {
  
       // console.log(response);
       
    }))


    // let userName = (req.body.id);
    // let passWord = (req.body.pass);
  });
// type bookinf={
//     ISBN:number|undefined;
//     BookName:string|undefined;
//     Author:string|undefined;
//     IsAvailable:boolean|undefined;
//     Quantity:number|undefined;
// }

//Returns singular book for viewing its details
// app.get('/book', async (req: Request, res: Response) => {
//     console.log("hej");
//     let numIsbn = Number(req.body.isbn);
//     let bigIntIsbn = BigInt(numIsbn);
   
//     const books = await prisma.library.findUnique({
//         where: {
//             ISBN: bigIntIsbn
//         }
//     })
//     .then((book) => {
//         console.log(book);
//         //BigInt is not supported by json we have to convert to Number and then to object again... 🤬 
//         let convertedBooks = ConvertBigIntObject(book);


//         res.status(200).json(convertedBooks);
//     })
//     .catch((e) => {
//         res.status(500).send(e.message);
//     });
// });
//Returns singular book for viewing its details
// app.get('/books', async (req: Request, res: Response) => {
//     console.log("hej");
//     let datum: Date = new Date();
//     let month = new Date().getMonth() + 1;
//     console.log(datum.getFullYear() + "/" + month + "/" +  datum.getDate());
   
//     const books = await prisma.library.findMany()

//     .then((böcker) => {
//         console.log(böcker);
//         //BigInt is not supported by json we have to convert to Number and then to object again... 🤬 
//         let convertedBooks = ConvertBigIntObjects(böcker);

//         res.status(200).json(convertedBooks);
//     })
//     .catch((e) => {
//         res.status(500).send(e.message);
//     });
// });

//Returns singular staff for viewing its details
app.get('/staff/:ID', async (req: Request, res: Response) => {

    //Convert to number
    let PID = (req.params.PID).toString();
   
    //Call prismas findUnique method on library
    const staff = await prisma.staff.findUnique({
        //Find unique staff member where ID = passed ID from params
        where: {
            PID: PID,
        },
    })
    .then((staff) => {

        //Send back respons from db
        res.status(200).json(staff);

        console.log(staff);
    })
    .catch((e) => {
        res.status(500).send(e.message);
    });
});

//Returns singular staffs permissions for viewing its details
app.get('/staffPermissions/:PID', async (req: Request, res: Response) => {
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
app.get('/student/:PID', async (req: Request, res: Response) => {
    //Convert to number
    let PID = (req.params.PID).toString();
   
    //Call prismas findUnique method on library
    const student = await prisma.students.findUnique({
        where: {
            //Find unique student member where ID = passed ID from params
            PID: PID,
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

// app.get('/students', async (req, res) => {
//     const members = await prisma.students.findMany()
//     .then((members) => {
//         res.status(200).send(members);
//     })
//     .catch((e) => {
//         res.status(500).send(e.message);
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
//             Email: req.body.email,
//             PhoneNumber: req.body.phone,
//         },
//     })
//     .then(() => {
//         res.redirect('/');
//     })
//     .catch(() => {
//         res.redirect('/');
//     });

app.post('/updateStaff',async (req: Request, res: Response) => {
    console.log("Update staff");
    //Call prismas update method on students
    const updateUser = await prisma.staff.update({
        //By email
        where: {
            PID: req.body.PID
        },
        //Lazy replace everything
        data: {
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Email: req.body.Email,
            PhoneNumber: req.body.PhoneNumber,
        },
    })
    .then(() => {
        console.log("Updaterade staff");
        res.status(200);
    })
    .catch(() => {
        res.status(500);
    });

});

app.post('/updateStudent', async (req: Request, res: Response) => {
    
    //Call prismas update method on students
    const updateUser = await prisma.students.update({
        //By email
        where: {
            PID: req.body.PID,
        },
        //Lazy replace everything
        data: {
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Email: req.body.Email,
            PhoneNumber: req.body.PhoneNumber,
        },
    })
    .then(() => {
        res.status(200);

    })
    .catch(() => {
        res.status(500);
    });

});

app.post('/updatePermissions', async (req: Request, res: Response) => {
    
    //Call prismas update method on students
    const updateUser = await prisma.permissions.update({
        //By email
        where: {
            PID: req.body.PID
        },
        //Lazy replace everything
        data: {
            AccessToLibrary: req.body.accessToLibrary,
            AccessToResturant: req.body.accessToRestaurant,
            AccessToUser: req.body.accessToUser,
            AccessToServer: req.body.accessToServer,
        },
    })
    .then(() => {
        res.status(200);
    })
    .catch(() => {
        res.status(500);
    });

// app.post('/updateBook',(req, res) => {
//     let ISBN = BigInt(parseInt((req.body.isbn).toString()));
//     let ISBN2 = BigInt(parseInt((req.body.isbn2).toString()));
//     let Quantity = parseInt((req.body.amount).toString());
//     let isAvailable = false;

//     if(Quantity){
//         isAvailable = true; 
//     }
//     else {
//         isAvailable = false;
//     }
//     //pass in data
//     const updateUser = prisma.library.update({
//         where: {
//             ISBN: ISBN
//         },
//         data: {
//             ISBN: ISBN2,
//             BookName: req.body.bookName,
//             Author: req.body.author,
//             Quantity: Quantity,
//             IsAvailable: isAvailable,
//         },
//     })
//     .then(() => {
//         res.redirect('/');
//     })
//     .catch(() => {
//         res.redirect('/');
//     });

//Update book
app.post('/updateBook', async (req: Request, res: Response) => {
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
//         data: {borrowBook}
//     })

//     res.redirect('/');
// });

// app.post('/registerBook', async(req, res) => {
//     let ISBN = BigInt(parseInt((req.body.isbn).toString()));
//     let Quantity = parseInt((req.body.amount).toString());
//     let isAvailable = false;

//     if(Quantity){
//         isAvailable = true; 
//     }
//     else {
//         isAvailable = false;
//     }

//     let book = {
//         ISBN: ISBN,
//         BookName: req.body.title,
//         Author: req.body.author,
//         IsAvailable: isAvailable,
//         Quantity: Quantity,

//     }
//     console.log(book);

//     const Book = await prisma.library.create({
//         data: book,
//       }) 

//     res.redirect('/');
// });

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

