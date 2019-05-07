import React from 'react';
import { Divider, Form, Button, Icon, Message } from 'semantic-ui-react';
import _find from 'lodash/find';

export default ({styles, handleClick, handleSubmit, handleChange, args, errors}) => {
    
    
    

    return (
        <div>
            <div style={styles.box}>
            <img src='images/logo.png' alt='logo'/>
            <h4>Registrate para ver fotos y videos de tus amigos.</h4>
            <Form onSubmit={(ev)=>handleSubmit(ev,args)}>
            <Button type='submit' color='facebook'>
                        <Icon name='facebook' /> Iniciar sesión con Facebook
                    </Button>
            <Divider horizontal> o </Divider>
            
                <Form.Field>
                    <Form.Input name='email' onChange={handleChange} placeholder='Email' icon={!errors.length?null:_find(errors, {path:'email'})?<Icon name="remove circle outline" color='red' size='large' />:<Icon name="check circle outline" color='green' />} />
                </Form.Field>
                <Form.Field>
                    <Form.Input name='fullname' onChange={handleChange} placeholder='Nombre completo'  />
                </Form.Field>
                <Form.Field>
                    <Form.Input name='username' onChange={handleChange} placeholder='Nombre de usuario' icon={!errors.length?null:_find(errors, {path:'username'})?<Icon name="remove circle outline" color='red' size='large' />:<Icon name="check circle outline" color='green' />} />
                </Form.Field>
                <Form.Field>
                    <Form.Input name='password' onChange={handleChange} type='password' placeholder='Password' icon={!errors.length?null:_find(errors, {path:'password'})?<Icon name="remove circle outline" color='red' size='large' />:<Icon name="check circle outline" color='green' />} />
                </Form.Field>
                <Button type='submit' disabled={!args.email || !args.username || !args.fullname || !args.password} primary fluid>Registrar</Button>
                {
                    errors.length?<Message negative header="Los siguientes errores" list={errors.map(error=>`[${error.path}] ${error.message}`)} />:null
                }

            </Form>
            </div>
            <div style={styles.box}>
            ¿Tienes una cuenta? <a href="" onClick={handleClick} >Inicia sesión</a>
            </div>
        </div>
    )
}