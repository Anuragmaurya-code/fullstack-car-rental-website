const express =require('express')
const mongoose = require('mongoose');
const app=express()
const cors = require('cors');



app.use(express.json())
app.use(cors())


mongoose.connect('mongodb+srv://AnuragMaurya:hzFgBQrcfT1dTyGJ@anuragapi.ugdrwau.mongodb.net/?retryWrites=true&w=majority').then(()=>{
    console.log("Database connected successfully")
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


const carBookingSchema = new mongoose.Schema({
      city_mpg: Number,
      class: String,
      combination_mpg: Number,
      cylinders: Number,
      displacement: Number,
      drive: String,
      fuel_type: String,
      highway_mpg: Number,
      make: String,
    model: String,
    transmission: String,
    year: Number,
    price: Number,
    fromDate: String,
    toDate: String,
    totalPrice: Number,
    userId: String
  });
  
const CarBooking = mongoose.model('CarBooking', carBookingSchema);

app.post('/carBooked',async(req,res)=>{
    const {fromDate,toDate,totalPrice,car,userId}=req.body
    const data={...car,toDate,fromDate,totalPrice,userId}
    const newBooking = new CarBooking(data);
    await newBooking.save();
    res.status(200).send("Booking saved successfully");
})
const data=[{
    city_mpg: 26,
    class: 'small sport utility vehicle',
    combination_mpg: 27,
    cylinders: 4,
    displacement: 1.5,
    drive: 'fwd',
    fuel_type: 'gas',
    highway_mpg: 29,
    make: 'mitsubishi',
    model: 'eclipse cross es 2wd',
    transmission: 'a',
    year: 2022,
    price: 370
  },
  {
    city_mpg: 19,
    class: 'small sport utility vehicle',
    combination_mpg: 22,
    cylinders: 6,
    displacement: 3.5,
    drive: 'fwd',
    fuel_type: 'gas',
    highway_mpg: 26,
    make: 'acura',
    model: 'mdx fwd',
    transmission: 'a',
    year: 2022,
    price: 300
  }]
app.get('/bookings',async(req,res)=>{
    const data=await  CarBooking.find({userId:req.query.userId})
    console.log("data: ",data)
    res.status(200).send(data)
})
app.listen(8000,()=>{
    console.log("running on 8000")
})