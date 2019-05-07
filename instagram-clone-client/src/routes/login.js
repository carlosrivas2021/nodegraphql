import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import { graphql, compose } from 'react-apollo';

//Utils
import queries from '../utils/queries';

//Componentes
import Signin from './login/Signin';
import Signup from './login/Signup';
// import LostPassword from './login/LostPassword';

const styles={
    grid: {
        height: '100%',
        width: '900px',
        margin: '0 auto',
    },
    box:{
        backgroundColor: '#EEF6EC',
        border: '1px solid #e6e6e6',
        textAlign: 'center',
        marginBottom: '1em',
        padding: '1em',
    }
}

class Login extends React.Component{
    state = {
        showLogin:true,
        showRegister:false,
        showLostPassword:false,
        argsSignup: {},
        errorsSignup: [],
        argsSignin: {},
        errorsSignin: []
    }

    showRegister = (ev) => {
        ev.preventDefault();
        this.setState({
            showLogin: false,
            showRegister:true,
            showLostPassword: false,
        })
    }
    showLogin = (ev) => {
        ev.preventDefault();
        this.setState({
            showLogin: true,
            showRegister:false,
            showLostPassword: false,
        })
    }

    handleLogin = async (ev, args) => {
        console.log(args);
        const response = await this.props.login({
            variables: args
        })
        console.log('Graphql response: ', response);
        const {errors, success, token} = response.data.login;
        if(!success){
            this.setState({
                errorsSignin: errors
            })
        }else{
            localStorage.setItem('token', token);
            this.props.history.push("/");
        }
    }

    handleRegister = async (ev, args) => {
        console.log(args);
        const response = await this.props.createUser({
            variables: args
        })
        // console.log('Graphql response: ', response);
        const {errors, success} = response.data.createUser;
        if(!success){
            this.setState({
                errorsSignup: errors
            })
        }else{
            this.props.history.push("/")
        }
        
    }  
    
    handleChange = (ev, input) => {
        const argsSignup = this.state.argsSignup;
        argsSignup[input.name] = input.value
        this.setState({argsSignup})
    } 
    handleChangeSignin = (ev, input) => {
        const argsSignin = this.state.argsSignin;
        argsSignin[input.name] = input.value
        this.setState({argsSignin})
    } 

    render(){
        const { showLogin, showRegister, argsSignup, errorsSignup, argsSignin, errorsSignin } = this.state;

        return(
            <Grid columns={2} centered verticalAlign="middle" style={styles.grid}>
                <Grid.Row>
                    <Grid.Column>
                        <Image src="images/local.jpg" alt="phone" fluid/>
                    </Grid.Column>
                    <Grid.Column>
                        {showLogin && <Signin styles={styles} handleClick={this.showRegister} handleSubmit={this.handleLogin} handleChange={this.handleChangeSignin} args={argsSignin} errors={errorsSignin}/>}
                        {showRegister && <Signup styles={styles} handleClick={this.showLogin} handleSubmit={this.handleRegister} handleChange={this.handleChange} args={argsSignup} errors={errorsSignup}/>}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default compose(
    graphql(queries.mutation.login, {name: 'login'}),
    graphql(queries.mutation.createUser, {name: 'createUser'}),
)(Login);