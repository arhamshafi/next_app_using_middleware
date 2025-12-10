const { default: mongoose } = require("mongoose");

const TodoSchema = new mongoose.Schema({
    title : {
        type : String ,
        required : true
    }
})
// yhan sy countinue krna 