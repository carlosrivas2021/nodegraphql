import bcrypt from 'bcrypt';
import auth from '../auth';
import { isAuthenticatedResolver } from '../permissions';

const formatErrors = (error)=>{
    const errors = error.errors;
    const objErrors = [];

    if(errors){
        Object.entries(errors).map(error=>{
            const { path, message } = error[1];
            objErrors.push({path, message});
        })
        return objErrors;
        
    }

    const unknownError = {};
    // console.log(error.message);
    
    switch (error.code) {
        case 11000:
            if(error.message.indexOf('username')!=-1){
                unknownError.path = 'username';
                unknownError.message = 'El nombre de usuario ya existe';
            }
            if(error.message.indexOf('email')!=-1){
                unknownError.path = 'email';
                unknownError.message = 'El email ya existe';
            }

            
            break;
    
        default:
            unknownError.path = 'desconocido';
            unknownError.message = error.message;
            break;
    }

    return [unknownError];
}

export default {
    Query:{
        allUsers: isAuthenticatedResolver.createResolver(
            (parent, args, { models }) => models.User.find()
        ),
        getUser:  (parent, args, { models }) => models.User.findOne(args),
        me:  (parent, args, { models, user }) => models.User.findById({ _id: user }),

    },
    Mutation:{
        login: async (parent, { email, password }, { models:{User} }) => auth.login(email, password, User),
        createUser: async (parent, args, { models }) => {
            //return models.User.create(args)
            console.log(args);
            try{
                // const hashPassword = await bcrypt.hash(password, 10);
                const user = await models.User.create(args);
                return {
                    success: user && user._id,
                    errors: []
                };
            }catch(error){
                // console.log(error);
                return {
                    success: false,
                    errors: formatErrors(error)
                };
            }
        }
    }
}