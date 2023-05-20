import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

export const Login = () => {

    //const [user, setUser] = useState({});
    const [token, setToken] = useState(0);
    const navigate = useNavigate();
    let loginInfos = useRef({});

    const submitHundler = (e) => {
        e.preventDefault();
        loginInfos.username = e.target.username.value;
        loginInfos.password = e.target.password.value;
        axios.post("http://localhost:8081/user/auth", loginInfos).then(
            (response) => {
                console.log(response.data);
                setToken(response.data);
            }
        ).catch(
            (error) => {
                console.log(error);
                setToken(0);
            }
        )
    }

    useEffect(() => {
        if (token === 1) {
            setInterval(navigate(`/user/${loginInfos.username}`), 2000);
        }
    }, [token, navigate, loginInfos]);



    return (<div className='mt-3' style={{
        border: "1px solid none",
        padding: "10px",
        borderRadius: "12px 0px 12px 0px",
        boxShadow: "0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19)"
    }}>
        {
            (token === 1) ?
                <div className="alert alert-success" role="alert">
                    login secssusfly
                </div>
                :
                <div className="alert alert-danger" role="alert">
                    login failed !
                </div>
        }
        <Form onSubmit={submitHundler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control name="username" type="text" placeholder="Enter Username" />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button className='m-2' variant="primary" type="submit">
                Submit
            </Button>
            <Button className='m-2' variant="danger" type="reset">
                reset
            </Button>
        </Form>
    </div>)
}