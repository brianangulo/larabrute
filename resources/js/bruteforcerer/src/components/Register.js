import React, { useState, useCallback } from 'react';
import { useRegister } from '../hooks';
import { Button, Modal, Form } from 'react-bootstrap';

function RegisterModal() {
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');

  const handleClose = () => {
    setUsername('');
    setError(false);
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const handleRegister = useCallback(async (username) => {
    setLoading(true);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const dataResponse = await useRegister(username);
    if (!dataResponse) {
      setError(true);
    }
    setLoading(false);
  }, []);

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
            onChange={(event) => setUsername(event.target.value)}
          />
          {error && (
            <p className="text-danger" style={{ fontSize: 'medium' }}>
              Username is taken or error occurred. Please try again.
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            disabled={loading}
            variant="primary"
            onClick={() => handleRegister(username)}
          >
            {loading ? '...loading' : 'Submit'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RegisterModal;
