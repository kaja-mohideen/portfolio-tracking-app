import React, { useState } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment, TransitionablePortal } from 'semantic-ui-react';
import logo from './km-square-logo.png';

import { login } from './LoginController';

const LoginForm = () => {
    const [userName, setUserName] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [loginState, setLoginState] = useState(0);

    return (
        <Grid textAlign='center' style={{ height: '100vh', width: '100vw', background:'#f0f0f0' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <TransitionablePortal open={loginState == 1} transition={{ animation: 'scale', duration: 500 }}>
                    <Segment align='center' style={{ position: 'fixed', top: '20%', left: '50%', transform: 'translateX(-50%)', zIndex: 1000 }}>
                        <Message
                            header={`Welcome ${userName}...`}
                            content='Please wait while we load your homescreen...'
                        />
                    </Segment>
                </TransitionablePortal>
                <Image src={logo} size="small" centered/> 
                <Header as='h2' color='black' textAlign='center'>
                    Login to your account
                </Header>
                <Form size='large'>
                    <Segment stacked>
                        <Form.Input 
                            fluid 
                            icon='user'
                            iconPosition='left' 
                            placeholder='Username'
                            onChange={(e) => {
                                setUserName(e.target.value);
                                setLoginState(0);
                            }} 
                        />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                        />
    
                        <Button
                            primary 
                            fluid 
                            size='large' 
                            loading={submitting}
                            disabled={submitting}
                            onClick={() => {
                                setSubmitting(true);
                                setLoginState(0);
                                login(userName)
                                    .then((result) => {
                                        if (result) {
                                            setLoginState(1);
                                        } else {
                                            setLoginState(2);
                                        }
                                    })
                                    .catch(() => {
                                        setLoginState(2);
                                    })
                                    .finally(() => {
                                        setSubmitting(false);
                                    });
                                
                        }}>
                            Login
                        </Button>
                        <Message negative hidden={loginState != 2}>Login failed!</Message>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    );
};

export default LoginForm;