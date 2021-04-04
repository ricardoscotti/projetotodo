import mongoose from 'mongoose';

class Database{

    constructor() {
        this.mongo();
    }

    mongo() {
        this.mongoConnection = mongoose.connect(
            "mongodb+srv://ricardoscotti:ricardoscotti@cluster0.vxfy6.mongodb.net/teste?retryWrites=true&w=majority", 
            {
            useNewUrlParser: true,
            useFindAndModify: true
        }
        );
    }
} 

export default new Database();  