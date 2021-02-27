import React, {Component} from 'react';
import {Button, Form, Input, message} from 'antd';
import axios from "axios";
import queryString from "query-string";
import {G_API_URL, G_URL,G_COOKIE_NAME} from '../../constants/constants';
import Navbar from "../../components/header/Navbar";
import {encrypt} from '../../utils/encryption.util';
import { __setCookie,check_login} from '../../utils/cookie.util';
import 'antd/dist/antd.css'


class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    componentDidMount() {
        if(check_login()){
            window.location.href = G_URL + 'todo';
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // Set Button Loading
                this.setState({loading: true});
                // Encrypt user password and get Hex and Salt values
                values['pswd'] = encrypt(values['password']);

                const config = {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                };

                axios
                    .post(G_API_URL + "user/login", queryString.stringify(values), config)
                    .then(response => {
                        const {data} = response;
                        if (data.status === 1) {
                            // Set Loading False
                            this.setState({loading: false});
                            message.success(data.message)
                            let userToken = data.token;
                            if (userToken !== undefined) {
                                __setCookie(G_COOKIE_NAME, userToken, 1, "month");
                                setTimeout(() => {
                                    window.location.href = G_URL + 'todo';
                                }, 200)
                            }
                        } else {
                            this.setState({loading: false});
                            message.error(data.message)
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });

            }
        })
    }

    render() {

        const {getFieldDecorator} = this.props.form;
        return (
            <>
                <Navbar/>
                <div className="login-page-container c-height f-d f-vt f-v-c f-h-c lr-pad-d lr-pad-m">
                    <div className="login-block-container">
                        <h1 className="h1-heading">Welcome Back</h1>
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <div className="form-block">
                                <Form.Item label="Email">
                                    {getFieldDecorator('email', {
                                        rules: [{
                                            required: true,
                                            message: 'Email cannot be empty!'
                                        }],
                                    })(
                                        <Input type="email" placeholder="Enter Email"/>
                                    )}
                                </Form.Item>
                            </div>

                            <div className="form-block">
                                <Form.Item label="Password">
                                    {getFieldDecorator('password', {
                                        rules: [
                                            {required: true, message: 'Password cannot be empty!'},
                                            {min: 6, message: 'Password must be at least 6 characters.'}
                                        ],
                                    })(
                                        <Input.Password
                                            placeholder="Enter password"
                                            onChange={(e) => {
                                                (e.target.value).length > 0 ? this.setState({passLabel: true}) : this.setState({passLabel: false})
                                            }}
                                        />
                                    )}
                                </Form.Item>
                            </div>
                            <Button
                                className="login-form-btn default-btn filled-blue"
                                type="primary"
                                htmlType="submit"
                                loading={this.state.loading}
                            >
                                Log in
                            </Button>
                        </Form>
                        <div className="additional-action-container">
                            <div className="create-new-account">New here? <a
                                className="create-account-anchor c-pointer"
                                href={`/signup`}>Create an Account</a>
                            </div>
                        </div>
                    </div>
                </div>

                <style jsx={'true'}>
                    {`
                      .login-form-btn {
                        width: 100%;
                        margin-top: 2rem;
                      }
                    `}
                </style>
            </>
        );
    }
}

const Login = Form.create({name: ""})(LoginForm);
export default Login;

