import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

function RegisterModal() {
    const [show, setShow] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');

    const handleClose = () => {
        setUsername('');
        setError(false);
        setShow(false)
    };
    const handleShow = () => setShow(true);

    const handleRegister = async (username, score = '0') => {
        try {
            setLoading(true)
            const endpoint = "api/register"
            const requestInit = {
                method: "POST",
                body: JSON.stringify({ username: username, score: score }),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            }
            const response = await fetch(endpoint, requestInit);
            const json = (response.status !== 200) ? (await response.json()) : false;
            if (json) {
                setError(true)
            }
            setLoading(false);
            if (!json) {
                handleClose();
            }
        } catch (error) {
            console.error(error)
            setLoading(false)
            setError(error)
        }
    };

    return (
        <>
            <Button variant="light" onClick={handleShow}>
                Register
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter Username</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control
                        type="username"
                        placeholder="i.e doritos"
                        value={username}
                        onChange={event => setUsername(event.target.value)} />
                    {error && <p className="text-danger" style={{ fontSize: 'medium' }}>
                        Username is probably taken or random error occurred. Please try again.</p>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button disabled={loading} variant="primary" onClick={() => handleRegister(username)}>
                        {loading ? '...loading' : 'Submit'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default RegisterModal;
