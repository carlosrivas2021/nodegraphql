import React from 'react';
import { Divider, Form, Button, Icon, Message } from 'semantic-ui-react';
import _find from 'lodash/find';

export default ({styles, handleClick, handleSubmit, handleChange, args, errors}) => {
    return (
        <div>
            <div style={styles.box}>
                <img src='images/logo3.png' alt='logo' />
                <Form onSubmit={(ev) => handleSubmit(ev, args)}>
                    <Form.Field>
                        <Form.Input name="email" onChange={handleChange} placeholder='email o nombre de usuario' icon={!errors.length?null:_find(errors,{path:'email'})?<Icon name="remove circle" color='red' size='large' />:<Icon name="check circle" color='green' size='large' />}/>
                    </Form.Field>
                    <Form.Field>
                        <Form.Input name="password" onChange={handleChange} type='password' placeholder='password' icon={!errors.length?null:_find(errors,{path:'password'})?<Icon name="remove circle" color='red' size='large' />:<Icon name="check circle" color='green' size='large' />} />
                    </Form.Field>
                    <Button 
                        type="submit" 
                        primary 
                        fluid
                        disabled={!args.email || !args.password}
                    >Iniciar sesión</Button>
                    <Divider horizontal> o </Divider>
                    <Button color="facebook">
                        <Icon name="facebook" /> Iniciar sesión con facebook
                    </Button>
                    {
                        errors.length?<Message negative header="Los siguientes errores;" list={errors.map(error=>`[${error.path}] ${error.message}`)} />:null
                    }
                </Form>
                
            </div>
            <div style={styles.box}>
                ¿No tienes una cuenta? <a href="" onClick={handleClick}>Regístrate</a>
            </div>
        </div>
    )
}