/**
 * Created by rob on 4/06/17.
 */
const mongoose = require('mongoose');
const schema = mongoose.Schema;
const secret = 'abcdefg';
const crypto = require('crypto');

const userSchema =schema({

    username : {
        type : mongoose.Schema.Types.String,
        unique : true,
        required : true,
    },
    password : {
        type : mongoose.Schema.Types.String,
        required : true
    },
    channels : [
        {
            type: mongoose.Schema.Types.String
        }
    ],
});

userSchema.methods.checkPassword = function(pass){
    // let hashedPassword = crypto.createHmac('sha256', secret)
    //     .update(pass)
    //     .digest('hex');
    //
    // console.log(hashedPassword);
    // console.log(this.username);
    // console.log(this.password);
    //
    // return this.password === hashedPassword;

    console.log(this.password);
    return true;
};

module.exports = mongoose.model('User',userSchema);