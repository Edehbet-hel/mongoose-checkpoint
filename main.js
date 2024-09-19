import dotenv from 'dotenv'
import connectDB from './db/db.js'
import express from 'express'
import User from './models/userModel.js'
const app = express()
dotenv.config()
connectDB()
app.get('/add/:name/:age', async(req, res)=>{
    const {name, age } = req.params
    const result = await User.create({name:name, age:age})
    console.log(result);
    res.send(result)
})

app.listen(3002, ()=>{
    console.log('Server is running on port 3002')
    
})
//Question 1
app.get('/singlerecords',async(req,res)=>{
    try{

   
    const user = new User(
        {
            name:" Kasimu",
            age:20,
            favoriteFood:["beans","fried plantain","soda"]
        }
    )
    const User = await User.save()
    console.log(User)
    res.json(User)
}catch(error){
console.log('not saved', error)    
}
})
// Question 2



const people = [
    {
      name: "Blessing",
      age: 21,
      favoriteFood: ["hamburger", "meat pie", "orange juice"]
    },
    {
      name: "Zara",
      age: 18,
      favoriteFood: ["chocolate-bread", "jollof rice", "chicken"]
    },
    {
      name: "Bethel",
      age: 20,
      favoriteFood: ["spaghetti", "beans", "macaroni"]
    },
    {
      name: "Bright",
      age: 24,
      favoriteFood: ["pizza", "sushi", "instant noodles"]
    }
  ];
  
  app.get('/multipleRecords', async (req, res) => {
    try {
      const results = await User.create(people);
      console.log(results);
      res.json(results);
    } catch (error) {
      console.log('Not saved', error);
    }
  });
  

// Question 3
app.get('/findByName/:name', async (req, res) => {
    try {
      const name = req.params.name;
      const people = await User.find({ name: name });
      
      console.log(people);
      res.json(people);
    } catch (error) {
      console.log('Error finding people by name:', error);
    }
  });
// Question 4
app.get('/findOneByFood/:food', async (req, res) => {
    try {
      const food = req.params.food;
      const person = await User.findOne({ favoriteFood: food });
      
      console.log(person);
      res.json(person);
    } catch (error) {
      console.log('Error finding person by food:', error);
    }
  });

  // Question 5
  app.get('/findById/:id', async (req, res) => {
    try {
      const personId = req.params.id;
      const person = await User.findById(personId);
      
      console.log(person);
      res.json(person);
    } catch (error) {
      console.log('Error finding person by ID:', error);
    }
  });
// Question 6
app.put('/findEditThenSave/:id', async (req, res) => {
    try {
      const personId = req.params.id;
      const person = await User.findById(personId);
      
      if (!person) {
        return res.status(404).json({ error: 'Person not found' });
      }
  
      person.favoriteFood.push('hamburger');
      const updatedPerson = await person.save();
  
      console.log(updatedPerson);
      res.json(updatedPerson);
    } catch (error) {
      console.log('Error updating person:', error);
    }
  });
// Question 7  
app.put('/findAndUpdate/:name', async (req, res) => {
    try {
      const personName = req.params.name;
      const updatedPerson = await User.findOneAndUpdate(
        { name: personName },
        { age: 20 },
        { new: true }
      );
  
      console.log(updatedPerson);
      res.json(updatedPerson);
    } catch (error) {
      console.log('Error updating person:', error);
    }
  });
//Question 8
app.delete('/deleteById/:id', async (req, res) => {
    try {
      const personId = req.params.id;
      const deletedPerson = await User.findByIdAndRemove(personId);
  
      console.log(deletedPerson);
      res.json(deletedPerson);
    } catch (error) {
      console.log('Error deleting person:', error);
    }
  });
// Question 9
app.delete('/deleteMany/:name', async (req, res) => {
    try {
      const name = req.params.name;
      const result = await User.remove({ name: name });
  
      console.log(result);
      res.json(result);
    } catch (error) {
      console.log('Error deleting people:', error);
    }
  });
// Question 10
app.get('/searchQuery', async (req, res) => {
    try {
      const people = await User.find({ favoriteFood: 'chicken pie' })
        .sort({ name: 1 })
        .limit(2)
        .select('-age')
        
  
      console.log(people);
      res.json(people);
    } catch (error) {
      console.log('Error in query:', error);
    }
  });
  app.listen(3002, ()=>{
    console.log('server is running on port 3002')
})
  

