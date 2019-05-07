import gql from 'graphql-tag';

export default {
    query:{

    },
    mutation:{
        login: gql `
        mutation($email:String!,$password:String!){
            login(email: $email,password: $password) {
              success
              errors{
                path
                message
              }
              token
            }
          }
        `,
        createUser: gql `
        mutation($username: String!, $password: String!, $fullname: String!, $email: String!){
            createUser(username: $username, email: $email, password: $password, fullname: $fullname){
                success,
                errors{
                  path,
                  message
                }
              }
          }
        `
    },
    // subscription:{},
}