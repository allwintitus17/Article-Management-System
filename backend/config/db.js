const mongoose=require('mongoose')

mongoose.connect('mongodb+srv://allwintitus491:9D1bTdB6V8TwnkeY@cluster0.bftih.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
    console.log('Database Connected Sucessfully')
}).catch((error)=>{
    console.error("Database connection Failed Sucessfully")
})