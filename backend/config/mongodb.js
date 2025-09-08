import mongoose from "mongoose";

const connectDB = async () => {
    
try {
    //console.log(process.env.MONGODB_URI);
    
    mongoose.connection.on('connected', () => console.log("Database Connected"))
    await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`)

    
} catch (error) {
    console.log(error.message);
    
}
    
}

export default connectDB