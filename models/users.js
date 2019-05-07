import mongoose from 'mongoose';
import validate from 'mongoose-validator';


const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "El campo de usuario es requerido"],
        validate: [
            validate({
                validator: 'isLength',
                arguments: [6,8],
                message: 'El nombre de usuario debe contener entre {ARGS[0]} y {ARGS[1]}'
            }),
            validate({
                validator: 'isAlphanumeric',
                message: 'El nombre de usuario debe ser alfanumerico'
            }),
        ]
    },
    password: { 
        type: String, 
        bcrypt: true, 
        validate: validate({ 
            validator: 'isLength', 
            arguments: [8], 
            message: 'La contraseña debe contener mas de {ARGS[0]} caracteres.' 
        }), 
    },
    fullname: String,
    desc: String,
    bio: String,
    email: {
        type: String,
        unique: true,
        validate: validate({
            validator: 'isEmail',
            message: 'Introduce un email valido'
        })
    },
    thumbnail: String,
    posts: {
        type: [],
        default: []
    },
    following: {
        type: [],
        default: []
    },
    followers: {
        type: [],
        default: []
    }
})

userSchema.plugin(require('mongoose-bcrypt', { rounds: 10 }));

const userModel = mongoose.model('User', userSchema);

export default userModel;