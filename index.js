const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT||5000;
app.use(cors());
app.use(express.json());
require('dotenv').config();

const { MongoClient, ServerApiVersion ,ObjectId} = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ronfa.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Connect Mongodb 

async function server(){

  try{
    await client.connect();
    const database=client.db('Med-Star-Database')
    const MedicineCollection = database.collection("Medicine");
    const DoctorCollection=database.collection('Doctor');
    const LabTestCollection =database.collection('Lab-Test');
    const AmbulanceCollection =database.collection('Ambulance');
    const BloodDonnerCollection= database.collection('Donner');
    const OrderCartCollection =database.collection('Order-Cart');
    const AdminCollection =database.collection('Admin');
    const UserCollection=database.collection('User');
    const OrderCollection=database.collection('New-Order');
    const UserReviewCollection=database.collection('Review');
const DoctorAppointmentCollection=database.collection('Doctor-Appointment')
    const PatientHistory=database.collection('PatientHistory');
   const NoticeCollection=database.collection('Notice')
    
    app.get("/doctor", async(req, res) => {
      console.log("doctor api hit");
      const searchKey=req.query.searchKey;
        console.log(searchKey)
      if(searchKey){
          const SearchMedicine=blood.filter(medicine=>(medicine.group.toLocaleLowerCase().includes(group)&&medicine.district.toLocaleLowerCase().includes(district)&&medicine.upazila.toLocaleLowerCase().includes(upazila))||(medicine.group.toLocaleLowerCase().includes(group)&&medicine.district.toLocaleLowerCase().includes(district))||(medicine.group.toLocaleLowerCase().includes(group)))
          
      }else{
        const cursor=DoctorCollection.find({});
        const result=await cursor.toArray();
        res.send(result);
      }
    });

    app.get('/doctor/:id',async(req,res)=>{
      console.log(req.params.id)
      DoctorCollection.findOne({_id:ObjectId(`${req.params.id}`)})
      .then(result=>{
        console.log(result)
        res.send(result);
      })
    
    })
    app.get("/new_appointment", async(req, res) => {
      const cursor=DoctorAppointmentCollection.find({});
      const result=await cursor.toArray();
      res.send(result);
    });


    app.get("/donner", async(req, res) => {
      console.log("medicine api hit")
      const group=req.query.group;
      const district=req.query.district;
      const  upazila=req.query.upazila;
    if (group) {
      const SearchMedicine=blood.filter(medicine=>(medicine.group.toLocaleLowerCase().includes(group)&&medicine.district.toLocaleLowerCase().includes(district)&&medicine.upazila.toLocaleLowerCase().includes(upazila))||(medicine.group.toLocaleLowerCase().includes(group)&&medicine.district.toLocaleLowerCase().includes(district))||(medicine.group.toLocaleLowerCase().includes(group)))

    } else {
      const cursor=BloodDonnerCollection.find({});
      const result=await cursor.toArray();
      res.send(result);
    }
  });


    app.get("/medicine", async(req, res) => {
      console.log("medicine api hit")
      const searchKey=req.query.searchKey;
    if (searchKey) {
      const SearchMedicine = users.filter((medicine) =>
        medicine.name.toLocaleLowerCase().includes(searchKey)
      )
    } else {
      const cursor=MedicineCollection.find({});
      const result=await cursor.toArray();
      res.send(result);
    }
  });

    app.get("/ambulance", async(req, res) => {
      const cursor=AmbulanceCollection.find({});
      const result=await cursor.toArray();
      res.send(result);
    });


    app.get("/labTest", async(req, res) => {
      console.log("labTest api hit");
      const searchKey=req.query.searchKey;
    if (searchKey) {
      console.log(searchKey)
      const SearchMedicine = users.filter((medicine) =>
        medicine.name.toLocaleLowerCase().includes(searchKey)
      )
    } else {
      const cursor=LabTestCollection.find({});
      const result=await cursor.toArray();
      res.send(result);
    }
    });
  
    app.get('/new_order',async(req,res)=>{
      const cursor=OrderCollection.find({});
      const result=await cursor.toArray();
      res.send(result);
    })
    app.get('/my-cart',async(req,res)=>{
      const cursor=OrderCartCollection.find({});
      const result=await cursor.toArray();
      res.send(result);
    })
    //Authentication Api
app.get("/users", async(req, res) => {
  const cursor=UserCollection.find({});
  const result=await cursor.toArray();
  res.send(result);
});
app.get("/user/:email", async(req, res) => {
  const cursor=UserCollection.find({email:req.params.email});
  const result=await cursor.toArray();
  res.send(result[0])
});


app.get('/my-cart/:email',async(req,res)=>{
  const cursor=OrderCartCollection.find({email:req.params.email});
  const result=await cursor.toArray();
  
  console.log(result)
  res.send(result)

})
// Delete Method
app.delete('/my-cart/deleteItem/:id',(req,res)=>{
  console.log("add_to_Cart api hit",req.params.id);
  OrderCartCollection.deleteOne({_id:req.params.id})
  .then(result=>{
    console.log(result)
    res.send(result);
  })
})

app.delete('/my-cart/delete/:email',(req,res)=>{
  console.log("add_to_Cart api hit",req.params.id);
  OrderCartCollection.deleteMany({email:req.params.email})
  .then(result=>{
    console.log(result)
    res.send(result);
  })
})
//Patch Method
app.patch('/my-cart/updateQuantity/:id',(req,res)=>{
  console.log("quantity api hit",req.params.id);
  OrderCartCollection.updateOne({_id:req.params.id},{
    $set:{
      quantity:req.body.quantity
    }
  })
  .then(result=>{
    console.log(result)
    res.send(result);
  })
})

app.patch('/my_profile/:email',(req,res)=>{
  console.log("my_profile api hit",req.params.email);
  UserCollection.updateOne({email:req.params.email},{
    $set:{
      first_name:req.body.first_name,
      last_name:req.body.last_name,
      age:req.body.age,
      address:req.address,
      mobile_no:req.body.mobile_no,
    }
  })
  .then(result=>{
    console.log(result)
    res.send(result);
  })
})
//Post Method


app.post("/user", async(req, res) => {
  console.log('users api hit')

      const result =await UserCollection.insertOne(req.body)
      console.log(result)
      res.json(result);
});
app.post('/new_order',async(req,res)=>{
      console.log('new_order api hit')
      const result =await OrderCollection.insertOne(req.body)
      console.log(result)
      res.json(result);
})
 
app.post('/my-cart',(req,res)=>{
  console.log("add_to_Cart api hit");
  OrderCartCollection.insertOne(req.body)
  .then(result=>{
    console.log(result)
    res.send(result);
  })
})

app.post('/new_appointment',(req,res)=>{
  console.log("new_appointment api hit");
  DoctorAppointmentCollection.insertOne(req.body)
  .then(result=>{
    console.log(result)
    res.send(result);
  })
})

                  // User Dashboard Api
//Get Method
app.get("/my_order", async(req, res) => {
  const cursor=OrderCollection.find({});
  const result=await cursor.toArray();
  
  console.log(result)
  res.send(result)

});
app.get('/my_order/:email',async(req,res)=>{
  const cursor=OrderCollection.find({email:req.params.email});
  const result=await cursor.toArray();
  
  console.log(result)
  res.send(result)

})

app.get('/doctorHistory/:email',async(req,res)=>{
  const cursor=PatientHistory.find({email:req.params.email});
  const result=await cursor.toArray();
  
  console.log(result)
  res.send(result)

})

app.get('/user_notice/:email',async(req,res)=>{
  const cursor=NoticeCollection.find({});
  const result=await cursor.toArray();
  
  console.log(result)
  res.send(result)

})

// Post Method

app.post("/new_donner", async(req, res) => {
  console.log('users api hit')
  const result =await BloodDonnerCollection.insertOne(req.body)
  console.log(result)
  res.json(result);
});
app.post("/profile", (req, res) => {
  console.log(req.body);
  res.json(req.body);
});
app.post("/user_review", async(req, res) => {
  console.log('users api hit')

      const result =await UserReviewCollection.insertOne(req.body)
      console.log(result)
      res.json(result);
});
// Admin Dashboard Api


    app.post('/admin',async(req,res)=>{

      const result =await AdminCollection.insertOne(req.body)
      res.json(result);
    })
    
    app.post("/add_new_donner", async(req, res) => {
      console.log('add_new_donner api hit')
      const result =await BloodDonnerCollection.insertOne(req.body)
      console.log(result)
      res.json(result);
        }); 
      
    app.post("/add_medicine", async(req, res) => {
      console.log('add medicine api hit')
      const result =await MedicineCollection.insertOne(req.body)
      res.json(result);
          });
        
          app.post('/add_doctor',(req,res)=>{
            console.log("medicine post api hit");
            DoctorCollection.insertOne(req.body)
            .then(result=>{
              console.log(result)
              res.send(result)
            })
          })
      
          app.post('/add_labTest',(req,res)=>{
            console.log("lab api hit");
            LabTestCollection.insertMany(req.body)
            .then(result=>{
              console.log(result)
              res.send(result);
            })
          })
      
          app.post('/add_ambulance',(req,res)=>{
            AmbulanceCollection.insertOne(req.body)
            .then(result=>{
              console.log(result)
              res.send(result);
            })
          })
         
  }finally{
    // await client.close();
  }
}
server().catch(console.dir)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})