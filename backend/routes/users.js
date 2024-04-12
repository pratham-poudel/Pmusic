const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect("mongodb+srv://prathampoudel2:Kelo9yJstEh0DIhJ@pmusiccluster.q3kcn8j.mongodb.net/?retryWrites=true&w=majority&appName=pMusicCluster");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minLength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 5
  },
  recentlyplayed:  [{
    type: String,
  }],
  favourites:  [{
    type: String,
  }],
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

UserSchema.plugin(passportLocalMongoose); 
const User = mongoose.model('User', UserSchema);


module.exports = User;
