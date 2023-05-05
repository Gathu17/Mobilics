const router = require("express").Router()
const User = require('../models/User')
const data = require('../data/sample_data.json')


router.get("/income",async (req,res)=>{
   const users = await User.aggregate([
      {
         $addFields: { incomeInt: {$convert: {input: {$substr: [ "$income", 1, -1 ]}, to : 'double', onError: 1}} } // new field that contains the converted income value
       },
      {
         $match: {
           incomeInt: { $gt: 5 },
           $or: [
             { car: 'BMW' },
             { car: 'Mercedes' }
           ]
         }
       }
   ])
   console.log(users)
   res.send(users)
})

router.get("/phoneprice", async (req, res) => {

   try{
   const users = await User.aggregate([
      {
         $addFields: { phonepriceInt: {$convert: {input: '$phone_price', to : 'int', onError: 0}} } // new field that contains the converted income value
       },
      {
         $match: {
           gender: 'Male',
           phonepriceInt: { $gt: 10000 }
        
         }
      }
   ])

   res.send(users)
}catch(error) {
   console.log(error)
}
})
router.get("/users", async (req,res) =>{
   try{
      const users = await User.aggregate([
         {
            $project: {
               "phone_price": 1,
               "_id": -1
            }
         }
      ])
      res.send(users)
   }catch(err){
      console.log(err)
   }
   

   
})

router.get("/email", async (req,res)=> {
   try{
      const users = await User.aggregate([
         {
            $match: {
             last_name: /^M/,
              $expr: {
                $gt: [{ $strLenCP: '$quote' }, 15],
              },
            },
          },
         
      ])

      const newUsers =  users.filter((user)=>{
         const regex = new RegExp(`.*${user.last_name}.*`, 'i');
         return  regex.test(user.email)
      })
      
      res.send(newUsers)
   }catch(err){
      console.log(err)
   }
})

router.get("/carbrands", async (req,res)=>{
   const carBrands = ['BMW', 'Mercedes', 'Audi'];
   const emailRegex = /^\D*$/; // Matches any string that does not contain digits
   try{
      const users = await User.find({
         car: { $in: carBrands },
         email: { $regex: emailRegex },
      })
      res.send(users)
   }catch(e){
      console.log(e)
   }
})

module.exports = router