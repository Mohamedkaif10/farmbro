// server.js

const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');  
// MongoDB setup
app.use(cors());
async function connectDb() {
    try {
      await mongoose.connect('mongodb+srv://mdkaif:xx2B66OqVL4sbSrd@kaif.o7igbqj.mongodb.net/', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('MongoDB connected successfully');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      process.exit(1);
    }
  }
  
  connectDb();

const farmer = mongoose.model('farmer', new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  crop: String,
  landSize: Number,
  region:String
}));
const Scheme = mongoose.model('schemes', new mongoose.Schema({
    name: String,
    region: String,
    audio: String,
    desc:String
    // Add other scheme-specific fields here
  }));

app.use(bodyParser.json());

const jwtSecret = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY5OTk5MTc2MywiaWF0IjoxNjk5OTkxNzYzfQ.rGAIikCLdCcAoIBTzRohE2rnmZFwsoh2PUbBIixQ71E';


app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('Request Body:', req.body);
  console.log('Username:', username);
  console.log('Password:', password);
  try {
   
    const user = await farmer.findOne({ username: username });

    
    if (user && user.password === password) {
      
      const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });

      
      res.json({ token });
    } else {
     
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


app.get('/api/user', async (req, res) => {
    const token = req.headers.authorization;
  
    if (token) {
      jwt.verify(token, jwtSecret, async (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Invalid token' });
        } else {
          try {
            // Fetch user data based on decoded userId
            const user = await farmer.findOne({ _id: decoded.userId });
            console.log('User:', user);
            if (user) {
              // User found, send the user's name in the response
              console.log(user.name)
              res.json({ message: 'User data fetched successfully', user: { name: user.name }});
            } else {
              // User not found (this should not happen if tokens are valid)
              res.status(404).json({ message: 'User not found' });
            }
          } catch (error) {
            // Handle database query error
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
          }
        }
      });
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  });
  
  app.post('/api/farmer', async (req, res) => {
    const token = req.headers.authorization;
  
    if (token) {
      jwt.verify(token, jwtSecret, async (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Invalid token' });
        } else {
          try {
            // Extract information from the request body
            const { crop, landSize } = req.body;
  
            // Validate input (you can add more validation logic as needed)
            if (!crop || !landSize) {
              return res.status(400).json({ message: 'Missing required fields' });
            }
  
            // Update the user's document with farmer information
            const user = await farmer.findOneAndUpdate(
              {  _id: decoded.userId },
              { $set: { crop, landSize } },
              { new: true }
            );
  
            if (user) {
              res.json({ message: 'Farmer information saved successfully', user });
            } else {
              res.status(404).json({ message: 'User not found' });
            }
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
          }
        }
      });
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  });

  app.put('/api/farmer/update', async (req, res) => {
    const token = req.headers.authorization;
  
    if (token) {
      jwt.verify(token, jwtSecret, async (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Invalid token' });
        } else {
          try {
            // Extract information from the request body
            const { crop, landSize } = req.body;
  
            // Validate input (you can add more validation logic as needed)
            if (!crop && !landSize) {
              return res.status(400).json({ message: 'No fields to update' });
            }
  
            // Update the user's document with farmer information
            const updatedUser = await farmer.findOneAndUpdate(
              { _id: decoded.userId },
              { $set: { crop, landSize } },
              { new: true }
            );
  
            if (updatedUser) {
              res.json({ message: 'Farmer information updated successfully', user: updatedUser });
            } else {
              res.status(404).json({ message: 'User not found' });
            }
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
          }
        }
      });
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  });


  app.put('/api/user/location', async (req, res) => {
    const token = req.headers.authorization;
  
    if (token) {
      jwt.verify(token, jwtSecret, async (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Invalid token' });
        } else {
          try {
            const { region } = req.body;
  
            // Update the user's location
            const updatedUser = await farmer.findOneAndUpdate(
              { _id: decoded.userId },
              {
                region
              },
              { new: true }
            );
  
            if (updatedUser) {
              // Determine the new name based on the region (modify this logic accordingly)
              let updatedName = updatedUser.name;
  
              if (region === 'Telangana') {
                updatedName = 'స్వాగతం రైతు';
              } else if (region === 'Kerala') {
                updatedName = 'സ്വാഗതം കർഷകൻ';
              }
              else if(region === 'Uttar Pradesh'){
                updatedName = 'स्वागत है किसान';
              }
  
              // Update the user's name
              await farmer.updateOne({ _id: decoded.userId }, { name: updatedName });
  
              res.json({ message: 'User location and name updated successfully', user: updatedUser });
            } else {
              res.status(404).json({ message: 'User not found' });
            }
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
          }
        }
      });
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  });
  


  app.get('/api/schemes', async (req, res) => {
    try {
      const token = req.headers.authorization;
  
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      jwt.verify(token, jwtSecret, async (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Invalid token' });
        }
  
        try {
          const user = await farmer.findById(decoded.userId);
  
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
  
          const schemeses = await Scheme.find({ region: user.region });
  
          res.json({ schemeses });
        } catch (error) {
          console.error('Error fetching schemes:', error);
          res.status(500).json({ message: 'Internal Server Error' });
        }
      });
    } catch (error) {
      console.error('Error fetching schemes:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });


  // server.js

// ... (your existing code)

app.get('/api/schemes/:schemeId/details', async (req, res) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    jwt.verify(token, jwtSecret, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      } else {
        try {
          // Fetch user data based on decoded userId
          const user = await farmer.findOne({ _id: decoded.userId });
  
          if (user) {
            // Fetch the specific scheme based on schemeId and user's region
            const scheme = await Scheme.findOne({ _id: req.params.schemeId, region: user.region });
  
            if (scheme) {
              // Send scheme details in the JSON response
              const schemeDetails = {
                name: scheme.name,
                region: scheme.region,
                desc: scheme.desc,
              };
              res.json({ schemeDetails });
            } else {
              // Scheme not found for the user's region
              res.status(404).json({ message: 'Scheme not found' });
              console.log(err)
            }
          } else {
            // User not found (this should not happen if tokens are valid)
            res.status(404).json({ message: 'User not found' });
          }
        } catch (error) {
          // Handle database query error
          console.error(error);
          res.status(500).json({ message: 'Internal Server Error' });
        }
      }
    });
  });
  
  app.get('/api/schemes/:schemeId/audio', async (req, res) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    jwt.verify(token, jwtSecret, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      } else {
        try {
          // Fetch user data based on decoded userId
          const user = await farmer.findOne({ _id: decoded.userId });
  
          if (user) {
            // Fetch the specific scheme based on schemeId and user's region
            const scheme = await Scheme.findOne({ _id: req.params.schemeId, region: user.region });
  
            if (scheme) {
              // Set the appropriate content type for audio
              res.setHeader('Content-Type', 'audio/mpeg'); // Update based on your audio format
  
              // Send the base64 encoded audio data in the response
              const audioBuffer = Buffer.from(scheme.audio, 'base64');
              res.write(audioBuffer);
  
              // End the audio response
              res.end();
            } else {
              // Scheme not found for the user's region
              res.status(404).json({ message: 'Scheme not found' });
            }
          } else {
            // User not found (this should not happen if tokens are valid)
            res.status(404).json({ message: 'User not found' });
          }
        } catch (error) {
          // Handle database query error
          console.error(error);
          res.status(500).json({ message: 'Internal Server Error' });
        }
      }
    });
  });
  
  
  
  
const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));