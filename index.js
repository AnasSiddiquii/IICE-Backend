const dotenv = require('dotenv')
dotenv.config({path: './config.env'})
const PORT = process.env.PORT
require('./db/config')
const bcrypt = require('bcryptjs')

const express = require('express')
const app = express()
const cors = require('cors')

const User = require('./db/User')
const University = require('./db/University')
const Course = require('./db/Course')
const Specialisation = require('./db/Specialisation')
const Session = require('./db/Session')
const FeeStructure = require('./db/FeeStructure')
const EMITenure = require('./db/EMITenure')
const Student = require('./db/Student')
const Franchise = require('./db/Franchise')
const Referral = require('./db/Referral')
const Detail = require('./db/Detail')

app.use(express.json())
app.use(cors())

// homepage
app.get('/', (req, resp)  =>  {
    resp.send(`
        <html>
            <head>
                <style>
                    body {display: flex; justify-content: center; align-items: center; margin: 0;}
                    h1 {background-color: black; border-radius: 50%; padding: 50px; box-shadow: 0px 0px 30px 10px gray;}
                    a {text-decoration: none; color: #5cb85c;}
                </style>
            </head>
            <body>
                <h1><a href="https://iice.foundation">IICE Foundation</a></h1>
            </body>
        </html>
    `);
});

/////////////////////////////////////////
const multer = require("multer");
const File = require('./db/File');

const Storage = multer.diskStorage({
    destination:'uploads',
    filename:(req,file,cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.png' )
        // cb(null,file.originalname)
    }
})

const upload = multer({storage:Storage})

app.post("/img", upload.single('image'),  async  (req, resp)  =>  {
    const user = new File({img:req.file.filename,name:req.body.name});
    const result = await user.save();
    resp.send(result)
})

app.get("/img", async (req,resp) => {
    const data = await File.find()
    resp.send(data)
})

app.delete('/img/:id', async (req,resp) => {
    const result = await File.deleteOne()
    resp.send(result)
})
/////////////////////////////////////////

// admin login
app.post('/signup', async (req,resp) => {
    const { name, email, password, cpassword, post } = req.body
    
    if(!name || !email || !password || !cpassword || !post){
        resp.status(400).json({ error: 'Please Fill All Fields' })
    }
    else{
        const userExists = await User.findOne({ email: email })
        
        if(userExists){
            resp.status(400).json({ error: 'Email Already Exists' })
        }
        else if(password != cpassword){
            resp.status(400).json({ error: 'Password Do Not Match' })
        }
        else{
            const user = new User({ name, email, password, cpassword, post })
            await user.save()
            resp.status(201).json({ message: 'Registered Successfully' })
        }
    }
})

app.post('/login', async (req,resp) => {
    const { email, password } = req.body
    
    if(!email || !password){
        resp.status(400).json({ error: 'Please Fill All Fields' })
    }
    else{
        const userExists = await User.findOne({ email: email })

        if(userExists){
            const match = await bcrypt.compare(password, userExists.password)
                        
            if(!match){
                resp.status(400).json({ error: 'Invalid Credientials'})
            }
            else{
                resp.status(202).json({ message: 'Login Successful' })
            }
        }
        else{
            resp.status(400).json({ error: 'Invalid Credientials'})
        }
    }
})

app.get( '/users', async (req,resp) => {
    const user = await User.find()
    if(user.length>0){
        resp.send(user)
    }
    else{
        resp.send({result:'no user found'})
    }
})

// student login
app.post('/std', async (req,resp) => {
    const result = await Student.findOne(req.body).select(['name','email','level','post'])
    if(result){
        resp.send(result)
    }
    else{
        resp.send({result:'no user found'})
    }
})



// Universities

app.get('/universities', async (req,resp) => {
    const university = await University.find()
    if(university.length>0){
        resp.send(university)
    }
    else{
        resp.send({result:'no university found'})
    }
})

app.post('/adduniversity', async (req,resp) => {
    const { name, logo, state } = req.body
    
    if(!name || !logo || !state){
        resp.status(400).json({ error: 'Please Fill All Fields' })
    }
    else{
        const universityExists = await University.findOne({ name: name, state: state })

        if(universityExists){
            resp.status(400).json({ error: 'University Already Exists' })
        }
        else{
            const university = new University({ name, logo, state })
            await university.save()
            resp.status(201).json({ message: 'Registered Successfully' })
        }
    }
})

app.delete('/deleteuniversity/:id', async (req,resp) => {
    const result = await University.deleteOne({_id:req.params.id})
    resp.send(result)
})

// pre-filled data
app.get('/updateuniversity/:id', async (req,resp) => {
    const university = await University.findOne({_id:req.params.id})
    if(university){
        resp.send(university)
    }
    else{
        resp.send({result:'no university found'})
    }
})

app.put('/updateuniversity/:id', async (req,resp) => {
    const result = await University.updateOne(
        {_id:req.params.id},
        {$set:req.body}
    )
    resp.send(result)
})

app.get('/searchuniversity/:key', async (req,resp) => {
    const university = await University.find({
        '$or':[
            {name:{$regex:req.params.key}},
            {state:{$regex:req.params.key}}
        ]
    })
    if(university.length>0){
        resp.send(university)
    }
    else{
        resp.send({result:'no university found'})
    }
})



// Courses

app.get('/courses', async (req,resp) => {
    const course = await Course.find()
    if(course.length>0){
        resp.send(course)
    }
    else{
        resp.send({result:'no course found'})
    }
})

app.post('/addcourse', async (req,resp) => {
    const { fname, sname } = req.body

    if(!fname || !sname){
        resp.status(400).json({ error: 'Please Fill All Fields' })
    }
    else{
        const courseExists = await Course.findOne({ fname: fname, sname: sname })

        if(courseExists){
            resp.status(400).json({ error: 'Course Already Exists' })
        }
        else{
            const course = new Course({ fname, sname })
            await course.save()
            resp.status(201).json({ message: 'Registered Successfully' })
        }
    }
})

app.delete('/deletecourse/:id', async (req,resp) => {
    const result = await Course.deleteOne({_id:req.params.id})
    resp.send(result)
})

// pre-filled data
app.get('/updatecourse/:id', async (req,resp) => {
    const course = await Course.findOne({_id:req.params.id})
    if(course){
        resp.send(course)
    }
    else{
        resp.send({result:'no course found'})
    }
})

app.put('/updatecourse/:id', async (req,resp) => {
    const result = await Course.updateOne(
        {_id:req.params.id},
        {$set:req.body}
    )
    resp.send(result)
})

app.get('/searchcourse/:key', async (req,resp) => {
    const course = await Course.find({
        '$or':[
            {fname:{$regex:req.params.key}},
            {sname:{$regex:req.params.key}},
        ]
    })
    if(course.length>0){
        resp.send(course)
    }
    else{
        resp.send({result:'no course found'})
    }
})



// Specialisations

app.get('/specialisations', async (req,resp) => {
    const specialisation = await Specialisation.find()
    if(specialisation.length>0){
        resp.send(specialisation)
    }
    else{
        resp.send({result:'no specialisation found'})
    }
})

app.post('/addspecialisation', async (req,resp) => {
    const { fname, sname } = req.body

    if(!fname || !sname){
        resp.status(400).json({ error: 'Please Fill All Fields' })
    }
    else{
        const specialisationExists = await Specialisation.findOne({ fname: fname, sname: sname })

        if(specialisationExists){
            resp.status(400).json({ error: 'Specialisation Already Exists' })
        }
        else{
            const specialisation = new Specialisation({ fname, sname })
            await specialisation.save()
            resp.status(201).json({ message: 'Registered Successfully' })
        }
    }
})

app.delete('/deletespecialisation/:id', async (req,resp) => {
    const result = await Specialisation.deleteOne({_id:req.params.id})
    resp.send(result)
})

// pre-filled data
app.get('/updatespecialisation/:id', async (req,resp) => {
    const specialisation = await Specialisation.findOne({_id:req.params.id})
    if(specialisation){
        resp.send(specialisation)
    }
    else{
        resp.send({result:'no specialisation found'})
    }
})

app.put('/updatespecialisation/:id', async (req,resp) => {
    const result = await Specialisation.updateOne(
        {_id:req.params.id},
        {$set:req.body}
    )
    resp.send(result)
})

app.get('/searchspecialisation/:key', async (req,resp) => {
    const specialisation = await Specialisation.find({
        '$or':[
            {fname:{$regex:req.params.key}},
            {sname:{$regex:req.params.key}},
        ]
    })
    if(specialisation.length>0){
        resp.send(specialisation)
    }
    else{
        resp.send({result:'no specialisation found'})
    }
})



// Session

app.get('/sessions', async (req,resp) => {
    const session = await Session.find()
    if(session.length>0){
        resp.send(session)
    }
    else{
        resp.send({result:'no session found'})
    }
})

app.post('/addsession', async (req,resp) => {
    const { start, end } = req.body

    if(!start || !end){
        resp.status(400).json({ error: 'Please Fill All Fields' })
    }
    else{
        const sessionExists = await Session.findOne({ start: start, end: end })

        if(sessionExists){
            resp.status(400).json({ error: 'Session Already Exists' })
        }
        else{
            const session = new Session({ start, end })
            await session.save()
            resp.status(201).json({ message: 'Registered Successfully' })
        }
    }
})

app.delete('/deletesession/:id', async (req,resp) => {
    const result = await Session.deleteOne({_id:req.params.id})
    resp.send(result)
})


// pre-filled data
app.get('/updatesession/:id', async (req,resp) => {
    const session = await Session.findOne({_id:req.params.id})
    if(session){
        resp.send(session)
    }
    else{
        resp.send({result:'no session found'})
    }
})

app.put('/updatesession/:id', async (req,resp) => {
    const result = await Session.updateOne(
        {_id:req.params.id},
        {$set:req.body}
    )
    resp.send(result)
})



// EMITenures

app.get('/emitenures', async (req,resp) => {
    const emitenure = await EMITenure.find()
    if(emitenure.length>0){
        resp.send(emitenure)
    }
    else{
        resp.send({result:'no emitenure found'})
    }
})

app.post('/addemitenure', async (req,resp) => {
    const { month } = req.body

    if(!month){
        resp.status(400).json({ error: 'Please Fill All Fields' })
    }
    else{
        const emitenureExists = await EMITenure.findOne({ month: month })

        if(emitenureExists){
            resp.status(400).json({ error: 'EMI Tenure Already Exists' })
        }
        else{
            if(month>0 && month<100){
                const emitenure = new EMITenure({ month })
                await emitenure.save()
                resp.status(201).json({ message: 'Registered Successfully' })
            }
            else{
                resp.status(400).json({ error: 'Invalid Input' })
            }
        }
    }
})

app.delete('/deleteemitenure/:id', async (req,resp) => {
    const result = await EMITenure.deleteOne({_id:req.params.id})
    resp.send(result)
})


// pre-filled data
app.get('/updateemitenure/:id', async (req,resp) => {
    const emitenure = await EMITenure.findOne({_id:req.params.id})
    if(emitenure){
        resp.send(emitenure)
    }
    else{
        resp.send({result:'no emitenure found'})
    }
})

app.put('/updateemitenure/:id', async (req,resp) => {
    const result = await EMITenure.updateOne(
        {_id:req.params.id},
        {$set:req.body}
    )
    resp.send(result)
})



// FeeStructure

app.get('/feestructure', async (req,resp) => {
    const feestructure = await FeeStructure.find()
    if(feestructure.length>0){
        resp.send(feestructure)
    }
    else{
        resp.send({result:'no feestructure found'})
    }
})
///////////////////////////////////////////////////////////////////////////////////////
app.post('/addfeestructure', async (req,resp) => {
    const { uname, cname, sname, month1, month3, month6, month9, month12 } = req.body

    if(!uname || !cname || !sname || !month1 || !month3 || !month6 || !month9 || !month12){
        resp.status(400).json({ error: 'Please Fill All Fields' })
    }
    else{
        const feestructureExists = await FeeStructure.findOne({ uname: uname, cname: cname, sname: sname })

        if(feestructureExists){
            resp.status(400).json({ error: 'Fee Structure Already Exists' })
        }
        else{
            const feestructure = new FeeStructure({ uname, cname, sname, month1, month3, month6, month9, month12 })
            await feestructure.save()
            resp.status(201).json({ message: 'Registered Successfully' })
        }
    }
})
/////////////////////////////////////////////////////////////////////////////////////////////////////
app.delete('/deletefeestructure/:id', async (req,resp) => {
    const result = await FeeStructure.deleteOne({_id:req.params.id})
    resp.send(result)
})

// pre-filled data
app.get('/updatefeestructure/:id', async (req,resp) => {
    const feestructure = await FeeStructure.findOne({_id:req.params.id})
    if(feestructure){
        resp.send(feestructure)
    }
    else{
        resp.send({result:'no feestructure found'})
    }
})

app.put('/updatefeestructure/:id', async (req,resp) => {
    const result = await FeeStructure.updateOne(
        {_id:req.params.id},
        {$set:req.body}
    )
    resp.send(result)
})

app.get('/searchfeestructure/:key', async (req,resp) => {
    const feestructure = await FeeStructure.find({
        '$or':[
            {uname:{$regex:req.params.key}},
            {cname:{$regex:req.params.key}},
            {cname:{$regex:req.params.key}},
            {month1:{$regex:req.params.key}},
            {month3:{$regex:req.params.key}},
            {month6:{$regex:req.params.key}},
            {month9:{$regex:req.params.key}},
            {month12:{$regex:req.params.key}}
        ]
    })
    if(feestructure.length>0){
        resp.send(feestructure)
    }
    else{
        resp.send({result:'no feestructure found'})
    }
})



// Students

app.get('/students', async (req,resp) => {
    const student = await Student.find()
    if(student.length>0){
        resp.send(student)
    }
    else{
        resp.send({result:'no student found'})
    }
})

app.post('/addstudent', async (req,resp) => {
    const { name, father, mother, dob, email, contact, altContact, idProof, address, photo, level, password, post } = req.body

    if(!name || !father || !mother || !dob || !email || !contact || !altContact || !idProof || !address || !photo || !level || !password || !post){
        resp.status(400).json({ error: 'Please Fill All Fields' })
    }
    else {
        const studentExists = await Student.findOne({ email: email })

        if (studentExists) {
            resp.status(400).json({ error: 'Email Already Exists' })
        }
        else {
            const student = new Student({ name, father, mother, dob, email, contact, altContact, idProof, address, photo, level, password, post })
            await student.save()
            resp.status(201).json({ message: 'Registered Successfully' })
        }
    }
})

app.delete('/deletestudent/:id', async (req,resp) => {
    const result = await Student.deleteOne({_id:req.params.id})
    resp.send(result)
})

// pre-filled data
app.get('/updatestudent/:id', async (req,resp) => {
    const student = await Student.findOne({_id:req.params.id})
    if(student){
        resp.send(student)
    }
    else{
        resp.send({result:'no student found'})
    }
})

app.put('/updatestudent/:id', async (req,resp) => {
    const result = await Student.updateOne(
        {_id:req.params.id},
        {$set:req.body}
    )
    resp.send(result)
})

app.get('/searchstudent/:key', async (req,resp) => {
    const student = await Student.find({
        '$or':[
            {name:{$regex:req.params.key}},
            {father:{$regex:req.params.key}},
            {mother:{$regex:req.params.key}},
            {email:{$regex:req.params.key}},
            {contact:{$regex:req.params.key}},
            {altContact:{$regex:req.params.key}},
            {address:{$regex:req.params.key}}
        ]
    })
    if(student.length>0){
        resp.send(student)
    }
    else{
        resp.send({result:'no student found'})
    }
})



// Franchises

app.get('/franchises', async (req,resp) => {
    const franchise = await Franchise.find()
    if(franchise.length>0){
        resp.send(franchise)
    }
    else{
        resp.send({result:'no franchise found'})
    }
})

app.post('/addfranchise', async (req,resp) => {
    const { fname, cname, ctype, address, email, contact, altContact, idProof, account, level } = req.body

    if(!fname || !cname || !ctype || !address || !email || !contact || !altContact || !idProof || !account || !level){
        resp.status(400).json({ error: 'Please Fill All Fields' })
    }
    else{
        const franchiseExists = await Franchise.findOne({ email: email })

        if(franchiseExists){
            resp.status(400).json({ error: 'Email Already Exists' })
        }
        else{
            const franchise = new Franchise({ fname, cname, ctype, address, email, contact, altContact, idProof, account, level })
            await franchise.save()
            resp.status(201).json({ message: 'Registered Successfully' })
        }
    }
})

app.delete('/deletefranchise/:id', async (req,resp) => {
    const result = await Franchise.deleteOne({_id:req.params.id})
    resp.send(result)
})

// pre-filled data
app.get('/updatefranchise/:id', async (req,resp) => {
    const franchise = await Franchise.findOne({_id:req.params.id})
    if(franchise){
        resp.send(franchise)
    }
    else{
        resp.send({result:'no franchise found'})
    }
})

app.put('/updatefranchise/:id', async (req,resp) => {
    const result = await Franchise.updateOne(
        {_id:req.params.id},
        {$set:req.body}
    )
    resp.send(result)
})

app.get('/searchfranchise/:key', async (req,resp) => {
    const franchise = await Franchise.find({
        '$or':[
            {fname:{$regex:req.params.key}},
            {cname:{$regex:req.params.key}},
            {ctype:{$regex:req.params.key}},
            {address:{$regex:req.params.key}},
            {email:{$regex:req.params.key}},
            {contact:{$regex:req.params.key}},
            {altContact:{$regex:req.params.key}},
            {account:{$regex:req.params.key}}
        ]
    })
    if(franchise.length>0){
        resp.send(franchise)
    }
    else{
        resp.send({result:'no franchise found'})
    }
})



// Referral

// pre-filled data
app.get('/updatereferral/:id', async (req,resp) => {
    const referral = await Referral.findOne({_id:req.params.id})
    if(referral){
        resp.send(referral)
    }
    else{
        resp.send({result:'no referral found'})
    }
})

app.put('/updatereferral/:id', async (req,resp) => {
    const result = await Referral.updateOne(
        {_id:req.params.id},
        {$set:req.body}
    )
    resp.send(result)
})



// Details

app.get('/details', async (req,resp) => {
    const detail = await Detail.find()
    if(detail.length>0){
        resp.send(detail)
    }
    else{
        resp.send({result:'no detail found'})
    }
})

app.post('/adddetail', async (req,resp) => {
    const { studentName, courseName, specialisationName, universityName, sessionYear, emiTenure, emiAmount } = req.body

    if(!studentName || !courseName || !specialisationName || !universityName || !sessionYear || !emiTenure || !emiAmount){
        resp.status(400).json({ error: 'Please Fill All Fields' })
    }
    else{
        // const detailExists = await Detail.findOne({ studentName: studentName })

        // if(detailExists){
        //     resp.status(400).json({ error: 'Student Already Exists' })
        // }
        // else{
            const detail = new Detail({ studentName, courseName, specialisationName, universityName, sessionYear, emiTenure, emiAmount })
            await detail.save()
            resp.status(201).json({ message: 'Registered Successfully' })
        // }
    }
})

app.delete('/deletedetail/:id', async (req,resp) => {
    const result = await Detail.deleteOne({_id:req.params.id})
    resp.send(result)
})

app.get('/searchdetail/:key', async (req,resp) => {
    const detail = await Detail.find({
        '$or':[
            {studentName:{$regex:req.params.key}},
            {courseName:{$regex:req.params.key}},
            {specialisationName:{$regex:req.params.key}},
            {universityName:{$regex:req.params.key}},
            {sessionYear:{$regex:req.params.key}},
            {emiTenure:{$regex:req.params.key}},
            {emiAmount:{$regex:req.params.key}}
        ]
    })
    if(detail.length>0){
        resp.send(detail)
    }
    else{
        resp.send({result:'no detail found'})
    }
})


app.listen(PORT,() => {
    console.log(' ')
    console.log('You can now view backend in the browser.')
    console.log(' ')
    console.log(`  http://localhost:${PORT}`)
    console.log(`  http://localhost:${PORT}`)
    console.log(' ')
    console.log('Compiled successfully!')
    console.log('Compiled successfully!')
    console.log(' ')
})