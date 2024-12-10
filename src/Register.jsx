import React, { useState, useEffect } from 'react';  
import { useNavigate } from 'react-router-dom';  
import axios from 'axios';  
import "bootstrap/dist/css/bootstrap.css";  
import Container from 'react-bootstrap/Container';  
import Navbar from 'react-bootstrap/Navbar';  
import Form from 'react-bootstrap/Form';  
import Row from 'react-bootstrap/Row';  
import Col from 'react-bootstrap/Col';  
import Button from 'react-bootstrap/Button';  
import { API_ENDPOINT } from './Api';  

function Register() {  
    const navigate = useNavigate();  
    const [username, setUsername] = useState('');  
    const [password, setPassword] = useState('');  
    const [confirmPassword, setConfirmPassword] = useState('');  
    const [error, setError] = useState('');  
    const [success, setSuccess] = useState('');  

    // Check if the user is already logged in (token exists)  
    useEffect(() => {  
        const token = localStorage.getItem('token');  
        if (token) {  
            navigate("/dashboard");  
        }  
    }, [navigate]);  

    const handleSubmit = async (e) => {  
        e.preventDefault();  

        if (password !== confirmPassword) {  
            setError("Passwords do not match.");  
            return;  
        }  

        try {  
            const response = await axios.post(`${API_ENDPOINT}/auth/register`, {  
                username,  
                password  
            });  

            if (response.data.success) {  
                setSuccess('Registration successful! You can now log in.');  
                setError('');  
                setTimeout(() => {   
                    navigate("/login");  
                }, 2000);  
            } else {  
                setError('Registration failed. Please try again.');  
            }  
        } catch (err) {  
            if (err.response && err.response.status === 409) {  
                setError('Username already exists');  
            } else {  
                setError('An error occurred during registration.');  
            }  
            console.error('Registration error:', err);  
        }  
    };  

    return (  
        <div style={{  
            backgroundImage: 'url(/bg.avif)', // Use the same background image as in Login  
            backgroundSize: 'cover',  
            backgroundPosition: 'center',  
            height: '100vh',  
            display: 'flex',  
            alignItems: 'center',  
            justifyContent: 'center',  
            color: '#5c4d3f',  
        }}>  
            <Container>  
                <Row className="justify-content-md-center">  
                    <Col md={6}>  
                        <div className="card" style={{  
                            backgroundColor: '#fef9e7', // Light color matching logo theme  
                            borderRadius: '15px',  
                            border: '2px solid #5c4d3f',  
                            padding: '30px',  
                            boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',  
                        }}>  
                            <center>   
                                <img  
                                    src="/img/log.png"  
                                    alt="Scent Aura"  
                                    style={{  
                                        width: '120px',  
                                        height: '120px',  
                                        marginBottom: '20px',  
                                    }}  
                                />  
                            </center>  

                            <h2 style={{  
                                color: '#5c4d3f',  
                                fontWeight: 'bold',   
                                textAlign: 'center',   
                                marginBottom: '20px'  
                            }}>  
                                REGISTER  
                            </h2>  

                            <div className="card-body">  
                                <Form onSubmit={handleSubmit}>  
                                    <Form.Group controlId="formUsername">  
                                        <Form.Label style={{ color: '#5c4d3f' }}>Username:</Form.Label>  
                                        <Form.Control  
                                            type="text"  
                                            placeholder="Enter Username"  
                                            value={username}  
                                            onChange={(e) => setUsername(e.target.value)}  
                                            required  
                                            style={{ borderRadius: '5px' }} // Rounded inputs  
                                        />  
                                    </Form.Group>  
                                    <br />  

                                    <Form.Group controlId="formPassword">  
                                        <Form.Label style={{ color: '#5c4d3f' }}>Password:</Form.Label>  
                                        <Form.Control  
                                            type="password"  
                                            placeholder="Enter Password"  
                                            value={password}  
                                            onChange={(e) => setPassword(e.target.value)}  
                                            required  
                                            style={{ borderRadius: '5px' }}   
                                        />  
                                    </Form.Group>  

                                    <br />  
                                    <Form.Group controlId="formConfirmPassword">  
                                        <Form.Label style={{ color: '#5c4d3f' }}>Confirm Password:</Form.Label>  
                                        <Form.Control  
                                            type="password"  
                                            placeholder="Confirm Password"  
                                            value={confirmPassword}  
                                            onChange={(e) => setConfirmPassword(e.target.value)}  
                                            required  
                                            style={{ borderRadius: '5px' }}   
                                        />  
                                    </Form.Group>  

                                    <div style={{ marginTop: '10px', marginBottom: '20px' }}>  
                                        {error && <p style={{ color: 'red' }}>{error}</p>}  
                                        {success && <p style={{ color: 'green' }}>{success}</p>}  
                                    </div>  

                                    <Button  
                                        variant='success'  
                                        type="submit"  
                                        style={{ width: '100%', borderRadius: '5px' }}   
                                    >  
                                        Register Now  
                                    </Button>  
                                </Form>  
                            </div>  
                        </div>  
                    </Col>  
                </Row>  
            </Container>  
        </div>  
    );  
}  

export default Register;