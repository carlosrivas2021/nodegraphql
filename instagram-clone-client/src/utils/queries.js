import gql from 'graphql-tag';

export default {
    query:{

    },
    mutation:{
        login: gql `
        mutation($email: String!, $password: String!){
            login(email: $email, password: $password){
              success
              token
              errors{
                path
                message
              }
            }
          }
        `,
        createUser: gql `
            mutation($username: String!, $password: String!, $fullname: String!, $email: String!){
                createUser(username: $username, password: $password,fullname: $fullname, email: $email){
                    success
                    errors{
                        path
                        message
                    }
                }
            }
        ` ,
        singleUpload: gql `
            mutation($file: Upload!) {
                singleUpload(file:$file){
                    id
                    path
                    filename
                    mimetype
                    encoding
                }
            }
        `,
        createPost: gql `
            mutation($post: iPost){
                createPost(post: $post){
                    success
                    errors{
                        path
                        message
                    }
                }
            }
        `
    },
}