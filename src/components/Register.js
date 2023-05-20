import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const Register = () => {

    const [register, setregister] = useState(false);
    const navigate = useNavigate();

    let newUser = {
        username: "",
        password: ""
    }

    function submitHundlder(e) {
        e.preventDefault();
        //console.log(e);
        newUser.username = e.target.username.value;
        newUser.password = e.target.password.value;
        if (newUser.password === e.target.passwordConfirmation.value && newUser.password.length >= 8) {
            axios.post("http://localhost:8081/user/add", newUser).then(
                (response) => {
                    setregister(true);
                    console.log(response.data);
                    setInterval(() => {
                        navigate('/login')
                    }, 1000);
                }
            ).catch(
                (error) => {
                    console.log(error);
                    setregister(false);
                }
            )

        } else {
            setregister(false);
        }

    }

    return (<div className='mt-3' style={{
        border: "1px solid none",
        padding: "10px",
        borderRadius: "12px 0px 12px 0px",
        boxShadow: "0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19)"
    }}>
        <div>
            {
                (register) ?
                    <div className="alert alert-success" role="alert">
                        register secssusfly
                    </div>
                    :
                    <div className="alert alert-danger" role="alert">
                        register failed !
                    </div>
            }
        </div>
        <Form onSubmit={submitHundlder}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control name="username" type="text" placeholder="Enter username" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control pattern=".{8,}" name="password" type="password" placeholder="Password" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control pattern=".{8,}" name="passwordConfirmation" type="password" placeholder="Confirm Password" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </div>)
}