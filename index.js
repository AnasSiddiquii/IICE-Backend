const express = require('express')
const cors = require('cors')
require('./db/config')
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
const app = express()

app.use(express.json())
app.use(cors())


// admin login
app.post('/signup',async(req,resp)=>{
    let user = new User(req.body)
    let result = await user.save()
    result = result.toObject()
    delete result.password
    resp.send(result)
})

app.post('/login',async(req,resp)=>{
    let result = await User.findOne(req.body).select(['-password'])
    if(result){
        resp.send(result)
    }
    else{
        resp.send({result:'no user found'})
    }
})

// app.get('/users',async(req,resp)=>{
//     let user = await User.find()
//     if(user.length>0){
//         resp.send(user)
//     }
//     else{
//         resp.send({result:'no user found'})
//     }
// })

// student login
app.post('/std',async(req,resp)=>{
    let result = await Student.findOne(req.body).select(['-address', '-contact', '-altContact', '-dob', '-father', '-mother', '-idProof', '-photo', '-password'])
    if(result){
        resp.send(result)
    }
    else{
        resp.send({result:'no user found'})
    }
})


// Universities

app.get('/universities',async(req,resp)=>{
    let university = await University.find()
    if(university.length>0){
        resp.send(university)
    }
    else{
        resp.send({result:'no university found'})
    }
})

// avoid dublicate data
app.post('/universities',async(req,resp)=>{
    let result = await University.findOne(req.body)
    if(result){
        resp.send(result)
    }
    else{
        resp.send({result:'no university found'})
    }
})

app.post('/adduniversity',async(req,resp)=>{
    let university = new University(req.body)
    let result = await university.save()
    resp.send(result)
})

app.delete('/deleteuniversity/:id',async(req,resp)=>{
    let result = await University.deleteOne({_id:req.params.id})
    resp.send(result)
})

// pre-filled data
app.get('/updateuniversity/:id',async(req,resp)=>{
    let university = await University.findOne({_id:req.params.id})
    if(university){
        resp.send(university)
    }
    else{
        resp.send({result:'no university found'})
    }
})

app.put('/updateuniversity/:id',async(req,resp)=>{
    let result = await University.updateOne(
        {_id:req.params.id},
        {$set:req.body}
    )
    resp.send(result)
})

app.get('/searchuniversity/:key',async(req,resp)=>{
    let university = await University.find({
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

app.get('/courses',async(req,resp)=>{
    let course = await Course.find()
    if(course.length>0){
        resp.send(course)
    }
    else{
        resp.send({result:'no course found'})
    }
})

// avoid dublicate data
app.post('/courses',async(req,resp)=>{
    let result = await Course.findOne(req.body)
    if(result){
        resp.send(result)
    }
    else{
        resp.send({result:'no course found'})
    }
})

app.post('/addcourse',async(req,resp)=>{
    let course = new Course(req.body)
    let result = await course.save()
    resp.send(result)
})

app.delete('/deletecourse/:id',async(req,resp)=>{
    let result = await Course.deleteOne({_id:req.params.id})
    resp.send(result)
})

// pre-filled data
app.get('/updatecourse/:id',async(req,resp)=>{
    let course = await Course.findOne({_id:req.params.id})
    if(course){
        resp.send(course)
    }
    else{
        resp.send({result:'no course found'})
    }
})

app.put('/updatecourse/:id',async(req,resp)=>{
    let result = await Course.updateOne(
        {_id:req.params.id},
        {$set:req.body}
    )
    resp.send(result)
})

app.get('/searchcourse/:key',async(req,resp)=>{
    let course = await Course.find({
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

app.get('/specialisations',async(req,resp)=>{
    let specialisation = await Specialisation.find()
    if(specialisation.length>0){
        resp.send(specialisation)
    }
    else{
        resp.send({result:'no specialisation found'})
    }
})

// avoid dublicate data
app.post('/specialisations',async(req,resp)=>{
    let result = await Specialisation.findOne(req.body)
    if(result){
        resp.send(result)
    }
    else{
        resp.send({result:'no specialisation found'})
    }
})

app.post('/addspecialisation',async(req,resp)=>{
    let specialisation = new Specialisation(req.body)
    let result = await specialisation.save()
    resp.send(result)
})

app.delete('/deletespecialisation/:id',async(req,resp)=>{
    let result = await Specialisation.deleteOne({_id:req.params.id})
    resp.send(result)
})

// pre-filled data
app.get('/updatespecialisation/:id',async(req,resp)=>{
    let specialisation = await Specialisation.findOne({_id:req.params.id})
    if(specialisation){
        resp.send(specialisation)
    }
    else{
        resp.send({result:'no specialisation found'})
    }
})

app.put('/updatespecialisation/:id',async(req,resp)=>{
    let result = await Specialisation.updateOne(
        {_id:req.params.id},
        {$set:req.body}
    )
    resp.send(result)
})

app.get('/searchspecialisation/:key',async(req,resp)=>{
    let specialisation = await Specialisation.find({
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

app.get('/sessions',async(req,resp)=>{
    let session = await Session.find()
    if(session.length>0){
        resp.send(session)
    }
    else{
        resp.send({result:'no session found'})
    }
})

// avoid dublicate data
app.post('/sessions',async(req,resp)=>{
    let result = await Session.findOne(req.body)
    if(result){
        resp.send(result)
    }
    else{
        resp.send({result:'no session found'})
    }
})

app.post('/addsession',async(req,resp)=>{
    let session = new Session(req.body)
    let result = await session.save()
    resp.send(result)
})

app.delete('/deletesession/:id',async(req,resp)=>{
    let result = await Session.deleteOne({_id:req.params.id})
    resp.send(result)
})


// pre-filled data
app.get('/updatesession/:id',async(req,resp)=>{
    let session = await Session.findOne({_id:req.params.id})
    if(session){
        resp.send(session)
    }
    else{
        resp.send({result:'no session found'})
    }
})

app.put('/updatesession/:id',async(req,resp)=>{
    let result = await Session.updateOne(
        {_id:req.params.id},
        {$set:req.body}
    )
    resp.send(result)
})



// EMITenures

app.get('/emitenures',async(req,resp)=>{
    let emitenure = await EMITenure.find()
    if(emitenure.length>0){
        resp.send(emitenure)
    }
    else{
        resp.send({result:'no emitenure found'})
    }
})

// avoid dublicate data
app.post('/emitenures',async(req,resp)=>{
    let result = await EMITenure.findOne(req.body)
    if(result){
        resp.send(result)
    }
    else{
        resp.send({result:'no emitenure found'})
    }
})

app.post('/addemitenure',async(req,resp)=>{
    let emitenure = new EMITenure(req.body)
    let result = await emitenure.save()
    resp.send(result)
})

app.delete('/deleteemitenure/:id',async(req,resp)=>{
    let result = await EMITenure.deleteOne({_id:req.params.id})
    resp.send(result)
})


// pre-filled data
app.get('/updateemitenure/:id',async(req,resp)=>{
    let emitenure = await EMITenure.findOne({_id:req.params.id})
    if(emitenure){
        resp.send(emitenure)
    }
    else{
        resp.send({result:'no emitenure found'})
    }
})

app.put('/updateemitenure/:id',async(req,resp)=>{
    let result = await EMITenure.updateOne(
        {_id:req.params.id},
        {$set:req.body}
    )
    resp.send(result)
})



// FeeStructure

app.get('/feestructure',async(req,resp)=>{
    let feestructure = await FeeStructure.find()
    if(feestructure.length>0){
        resp.send(feestructure)
    }
    else{
        resp.send({result:'no feestructure found'})
    }
})

// avoid dublicate data
app.post('/feestructure',async(req,resp)=>{
    let result = await FeeStructure.findOne(req.body)
    if(result){
        resp.send(result)
    }
    else{
        resp.send({result:'no feestructure found'})
    }
})

app.post('/addfeestructure',async(req,resp)=>{
    let feestructure = new FeeStructure(req.body)
    let result = await feestructure.save()
    resp.send(result)
})

app.delete('/deletefeestructure/:id',async(req,resp)=>{
    let result = await FeeStructure.deleteOne({_id:req.params.id})
    resp.send(result)
})

// pre-filled data
app.get('/updatefeestructure/:id',async(req,resp)=>{
    let feestructure = await FeeStructure.findOne({_id:req.params.id})
    if(feestructure){
        resp.send(feestructure)
    }
    else{
        resp.send({result:'no feestructure found'})
    }
})

app.put('/updatefeestructure/:id',async(req,resp)=>{
    let result = await FeeStructure.updateOne(
        {_id:req.params.id},
        {$set:req.body}
    )
    resp.send(result)
})

app.get('/searchfeestructure/:key',async(req,resp)=>{
    let feestructure = await FeeStructure.find({
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

app.get('/students',async(req,resp)=>{
    let student = await Student.find()
    if(student.length>0){
        resp.send(student)
    }
    else{
        resp.send({result:'no student found'})
    }
})

// avoid dublicate data
app.post('/students',async(req,resp)=>{
    let result = await Student.findOne(req.body)
    if(result){
        resp.send(result)
    }
    else{
        resp.send({result:'no student found'})
    }
})

app.post('/addstudent',async(req,resp)=>{
    let student = new Student(req.body)
    let result = await student.save()
    result = result.toObject()
    delete result.password
    resp.send(result)
})

app.delete('/deletestudent/:id',async(req,resp)=>{
    let result = await Student.deleteOne({_id:req.params.id})
    resp.send(result)
})

// pre-filled data
app.get('/updatestudent/:id',async(req,resp)=>{
    let student = await Student.findOne({_id:req.params.id})
    if(student){
        resp.send(student)
    }
    else{
        resp.send({result:'no student found'})
    }
})

app.put('/updatestudent/:id',async(req,resp)=>{
    let result = await Student.updateOne(
        {_id:req.params.id},
        {$set:req.body}
    )
    resp.send(result)
})

app.get('/searchstudent/:key',async(req,resp)=>{
    let student = await Student.find({
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

app.get('/franchises',async(req,resp)=>{
    let franchise = await Franchise.find()
    if(franchise.length>0){
        resp.send(franchise)
    }
    else{
        resp.send({result:'no franchise found'})
    }
})

// avoid dublicate data
app.post('/franchises',async(req,resp)=>{
    let result = await Franchise.findOne(req.body)
    if(result){
        resp.send(result)
    }
    else{
        resp.send({result:'no franchise found'})
    }
})

app.post('/addfranchise',async(req,resp)=>{
    let franchise = new Franchise(req.body)
    let result = await franchise.save()
    resp.send(result)
})

app.delete('/deletefranchise/:id',async(req,resp)=>{
    let result = await Franchise.deleteOne({_id:req.params.id})
    resp.send(result)
})

// pre-filled data
app.get('/updatefranchise/:id',async(req,resp)=>{
    let franchise = await Franchise.findOne({_id:req.params.id})
    if(franchise){
        resp.send(franchise)
    }
    else{
        resp.send({result:'no franchise found'})
    }
})

app.put('/updatefranchise/:id',async(req,resp)=>{
    let result = await Franchise.updateOne(
        {_id:req.params.id},
        {$set:req.body}
    )
    resp.send(result)
})

app.get('/searchfranchise/:key',async(req,resp)=>{
    let franchise = await Franchise.find({
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

// for 1st time (when no data)
// app.post('/referral',async(req,resp)=>{
//     let referral = new Referral(req.body)
//     let result = await referral.save()
//     resp.send(result)
// })

// pre-filled data
app.get('/updatereferral/:id',async(req,resp)=>{
    let referral = await Referral.findOne({_id:req.params.id})
    if(referral){
        resp.send(referral)
    }
    else{
        resp.send({result:'no referral found'})
    }
})

app.put('/updatereferral/:id',async(req,resp)=>{
    let result = await Referral.updateOne(
        {_id:req.params.id},
        {$set:req.body}
    )
    resp.send(result)
})



// Details

app.get('/details',async(req,resp)=>{
    let detail = await Detail.find()
    if(detail.length>0){
        resp.send(detail)
    }
    else{
        resp.send({result:'no detail found'})
    }
})

// avoid dublicate data
app.post('/details',async(req,resp)=>{
    let result = await Detail.findOne(req.body)
    if(result){
        resp.send(result)
    }
    else{
        resp.send({result:'no detail found'})
    }
})


app.post('/adddetail',async(req,resp)=>{
    let detail = new Detail(req.body)
    let result = await detail.save()
    resp.send(result)
})

app.delete('/deletedetail/:id',async(req,resp)=>{
    let result = await Detail.deleteOne({_id:req.params.id})
    resp.send(result)
})

app.get('/searchdetail/:key',async(req,resp)=>{
    let detail = await Detail.find({
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


app.listen(5000,()=>{
    console.log(' ')
    console.log('Compiled successfully!')
    console.log(' ')
    console.log('You can now view backend in the browser.')
    console.log(' ')
    console.log('  http://localhost:5000')
    console.log(' ')
    console.log('Compiled successfully!')
    console.log('Compiled successfully!')
    console.log('Compiled successfully!')
})