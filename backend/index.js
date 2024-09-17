const express=require('express')
const app=express()
const PORT=5000
require('./config/db.js')
const cors=require('cors')




app.use(express.urlencoded({extended:false}))
app.use(cors())
app.use(express.json());

app.use('/api/users',require('./routers/users'))


app.use('/api/articles',require('./routers/articles'))


app.listen(PORT,()=>{
    console.log(`Server Started on Port ${PORT}`)
})