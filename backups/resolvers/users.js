import bcrypt from 'bcrypt';
import auth from '../auth';
import {isAuthenticatedResolver} from '../permissions';

const formatErrors = (error, otherErrors)=>{
    const errors=error.errors;
    let objErrors = [];
    
    
    if(errors){
     
        Object.entries(errors).map(error=>{
            const {path, message} = error[1];
            objErrors.push({path,message})
        })
    
        objErrors = objErrors.concat(otherErrors)
        console.log(objErrors)
        return objErrors
    }else if(otherErrors.length){
        return otherErrors
    }
    const unknownError ={}
    switch (error.code) {
        case 11000:
            unknownError.path = "username"
            unknownError.message = "El numbre de usuario ya existe"
            break;
        default:
            unknownError.path = "Desconocida"
            unknownError.message = error.message
            break;
    }
    return [unknownError]

    
}

export default{
    Query:{
        allUsers: 
        isAuthenticatedResolver.createResolver(
            (parent, args, {models}) => models.User.find()
        ),
        getUser: (parent, args, {models}) => models.User.findOne(args)
    },
    Mutation:{
        login: async (parent, {email, password},{models:{User}, SECRET})=> auth.login(email, password, User, SECRET),
        createUser: async (parent, {password,...args}, {models}) => {
            const otherErrors = []
            try{
                if(password.length<8){
                    otherErrors.push({path:'password', message:'password debe ser mayor a 8 caracteres'})
                }
                const hashPassword = await bcrypt.hash(password, 10);

                if(otherErrors.length>0){
                    throw otherErrors;
                }
                
                const user = await models.User.create({...args, password: hashPassword})
                
                return {
                    success: user && user._id,
                    errors: []
                };
            }catch(error){
                return {
                    success: false,
                    errors: formatErrors(error, otherErrors)
                }
            }
        }
    }
}