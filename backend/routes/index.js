var express = require('express');
var router = express.Router();
const userModel = require('./users')
const passport = require('passport');
const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));
const SongSchema = require('./songs')
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ppoudel_be23@thapar.edu',
    pass: 'uodt buei zzhe cvaq',
  },
});

// Define a function to send email
async function sendEmail(to, subject, html) {

  try {
    // Compose the email
    const mailOptions = {
      from: 'ppoudel_be23@thapar.edu',
      to: to,
      subject: subject,
      html: html,

    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

/* GET home page. */
router.post('/register', async function (req, res) {
  var userdata = new userModel({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,


  });

  userModel.register(userdata, req.body.password).then(function (registereduser) {
    passport.authenticate("local")(req, res, function () {

      res.redirect('/profile');
    })

  })
  await sendEmail(userdata.email, 'Succesfully Registered', `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Succesfull</title>
    <style>
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin: 0;
        padding: 20px;
        background-color: #f8f8f8;
        text-align: center;
      }
      .container {
        background-color: #ffffff;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      .logo {
        max-width: 100%;
        margin-bottom: 20px;
      }
      h1 {
        color: #333333;
        font-size: 28px;
        margin-bottom: 10px;
      }
      p {
        color: #666666;
        font-size: 16px;
        line-height: 1.5;
        margin-bottom: 15px;
      }
      .credentials {
        font-weight: bold;
      }
      .login-button {
        display: inline-block;
        background-color: #007BFF;
        color: #ffffff;
        text-decoration: none;
        padding: 10px 20px;
        border-radius: 5px;
        margin-top: 20px;
      }
      .login-button:hover {
        background-color: #0056b3;
      }
      .signature {
        color: #333333;
        font-weight: bold;
        margin-top: 20px;
      }
      .footer {
        margin-top: 30px;
        font-size: 14px;
      }
    </style>
  </head>
  <body>
  
    <div class="container">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png" alt="Music Logo" class="logo">
  
      <h1>Welcome to our Music Website, ${userdata.username}!</h1>
  
      <p>Congratulations! You have successfully registered on our website. You can now log in with the following credentials:</p>
  
      <p class="credentials">Username: ${userdata.username}<br>Password: ${userdata.password}</p>
  
      <p>Please keep your login credentials secure. You can log in by visiting our website:</p>
  
      <a href='http://localhost:3000/login' class="login-button">Log In Now</a>
  
      <p class="footer">Thank you for joining our music community. We look forward to providing you with the best music experience.</p>
  
      <p class="signature">Best Regards,<br>Pratham Poudel</p>
    </div>
  
  </body>
  </html>
  

    `);

});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send('Unauthorized');
}


router.get("/profile", isLoggedIn, async function (req, res, next) {
  const userdata = await userModel.findOne({ username: req.session.passport.user });
  console.log(userdata)
  res.status(200).send({ userdata })
});

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.status(200).json({ message: 'Logged out' });
  });
});

router.post("/login", function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return res.status(500).send("Internal Server Error");
    }
    if (!user) {
      return res.status(401).send("Unauthorized");
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      console.log(user);
      const userdata = user;
      res.status(200).send({ userdata })
    });
  })(req, res, next);
});
router.post("/profile/edit/:id", async function (req, res) {
  const id = req.params.id;

  try {
    // Find the user by ID
    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user data
    user.username = req.body.username;
    user.email = req.body.email;

    // Save the updated user document
    const userdata = await user.save();

    // Respond with the updated user data
    res.status(200).json(userdata);
  } catch (error) {
    console.error('Error editing user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


const upload = require('./multer')
router.post('/upload', upload.single('file'), async function (req, res) {
  if (req.file) {
    console.log('Uploaded: ', req.file);
    const user = await userModel.findOne({ username: req.session.passport.user });
    const song = new SongSchema({
      songName: req.body.songName,
      description: req.body.description,
      fileName: req.file.filename,
      user: user
    });
    await user.songs.push(song._id);
    await song.save();
    await user.save();


    res.status(200).send('File uploaded successfully.');
  } else {

    res.status(400).send('Error uploading file.');
  }
});
router.get('/viewsongs', isLoggedIn, async function (req, res) {
  const user = await userModel.findOne({ username: req.session.passport.user }).populate('songs');
  res.send(user.songs);
});
const path = require('path');
const fs = require('fs-extra')
router.get('/playsong/:fileName', async function (req, res) {
  const filePath = path.join(__dirname, 'uploads', req.params.fileName);

  try {
    // Check if the file exists
    if (fs.existsSync(filePath)) {
      // Set headers to indicate audio content
      res.setHeader('Content-Type', 'audio/mpeg');
      // Set Content-Disposition to inline to prevent download prompt
      res.setHeader('Content-Disposition', 'inline');

      // Create a readable stream from the file and pipe it to the response
      const stream = fs.createReadStream(filePath);
      stream.pipe(res);
    } else {
      // If the file doesn't exist, send a 404 response
      res.status(404).send('File not found');
    }
  } catch (error) {
    console.error('Error streaming file:', error);
    res.status(500).send('Internal Server Error');
  }
});
router.get('/getuser', isLoggedIn, async function (req, res) {
  const user = await userModel.findOne({ username: req.session.passport.user });
  console.log(user)
  res.status(200).send(user);
});

router.post('/recentlyplayed', isLoggedIn, async function (req, res) {
  const user = await userModel.findOne({ username: req.session.passport.user });
  console.log(req.body.vidId)
  
  if (req.body.vidId && !user.recentlyplayed.includes(req.body.vidId)) {
      user.recentlyplayed.push(req.body.vidId);
      await user.save();
  }
});


router.get('/recentlyplayed', isLoggedIn, async function (req, res) {
  const user = await userModel.findOne({ username: req.session.passport.user });
  res.status(200).send(user.recentlyplayed);
  
});

router.post('/favourites', isLoggedIn, async function (req, res) {
  const user = await userModel.findOne({ username: req.session.passport.user });
  console.log(req.body.vidId)
  
  if (req.body.vidId && !user.favourites.includes(req.body.vidId)) {
      user.favourites.push(req.body.vidId);
      await user.save();
  }
  res.status(200).send(user.favourites);
});


router.get('/favourites', isLoggedIn, async function (req, res) {
  const user = await userModel.findOne({ username: req.session.passport.user });
  res.status(200).send(user.favourites)
  
});





module.exports = router;
