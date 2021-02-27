import React, {Component} from "react";
import {Button, Form, Input, message} from "antd";
import 'antd/dist/antd.css'
import Navbar from "../../components/header/Navbar";
import {encrypt} from '../../utils/encryption.util';
import axios from "axios";
import {G_API_URL, G_URL} from "../../constants/constants";
import queryString from "query-string";

class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
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

                axios.post(G_API_URL + "user/signup", queryString.stringify(values), config)
                    .then(response => {
                        if (response.data.status === 1) {
                            // Set Loading False
                            this.setState({loading: false});
                            message.success(response.data.message)
                            setTimeout(()=>{
                                window.location.href = G_URL;
                            },200)
                        } else {
                            this.setState({loading: false});
                            message.error(response.data.message)
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
                <div className='signup-form-container  c-height f-d f-vt f-v-c f-h-c lr-pad-d lr-pad-m'>
                    <h1 className="h1-heading">Signup to WunderList</h1>

                    <Form className="signup-form" onSubmit={this.handleSubmit}>
                        <div className="form-block">
                            <Form.Item label="Name">
                                {getFieldDecorator('name', {
                                    rules: [{
                                        required: true,
                                        message: 'Name cannot be empty!'
                                    }],
                                })(
                                    <Input type="text" autoComplete="off" placeholder="Enter Name"/>
                                )}
                            </Form.Item>
                        </div>
                        <div className="form-block">
                            <Form.Item label="Email">
                                {getFieldDecorator('email', {
                                    rules: [{
                                        required: true,
                                        message: 'Email cannot be empty!'
                                    }],
                                })(
                                    <Input type="email" autoComplete="off" placeholder="Enter Email"/>
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
                                        autoComplete="off"
                                        placeholder="Enter password"
                                        onChange={(e) => {
                                            (e.target.value).length > 0 ? this.setState({passLabel: true}) : this.setState({passLabel: false})
                                        }}
                                    />
                                )}
                            </Form.Item>
                        </div>
                        <Button
                            className="signup-form-btn default-btn filled-blue"
                            type="primary"
                            htmlType="submit"
                            loading={this.state.loading}
                        >
                            Signup
                        </Button>
                    </Form>
                </div>
                <style jsx={'true'}>
                    {`
                      .signup-form-btn {
                        width: 100%;
                        margin-top: 2rem;
                      }
                    `}
                </style>
            </>
        )
    }
}

const Signup = Form.create({name: ""})(SignupForm);
export default Signup;