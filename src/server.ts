import express, { type Application, type Request, type Response } from "express"
const app:Application = express()
const port = 5000

app.use(express.text()) // plain text
app.use(express.json())// json format
app.use(express.urlencoded({extended:true})) // extended means it will take the nested object also

app.get('/', (req:Request, res:Response) => {
res.status(200).json({
    message:"Express Server",
    "Author":"Nishat Jahan"
})
})

// Post 

app.post("/",async(req:Request,res:Response)=>{
    // console.log( req.body) // undefined until use middleware
     const {name, course, password} =req.body
res.status(200).json({
    message:"Express Server Created",
    data:{
        name , course,
    }
})
})


app.listen(port, () => {
  console.log(`Express app listening on port ${port}`)
})