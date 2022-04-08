import React, { useState, useCallback, } from 'react';
import { useRegisterUsername } from '../hooks';
import { Button, Modal, Form } from 'react-bootstrap';

function RegisterModal() {
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [isEmpty, setIsEmpty] = useState(false);

  const handleClose = useCallback(() => {
    setUsername('');
    setError(false);
    setIsEmpty(false);
    setShow(false);
  }, []);

  const handleShow = () => setShow(true);

  const handleRegister = useCallback(async (username) => {
    const isUserNameEmpty = username.length === 0;
    if (isUserNameEmpty) {
      setIsEmpty(true);
      if (error) {
        setError(false);
      }
    }
    if (!isUserNameEmpty) {
      setLoading(true);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const registerResponse = await useRegisterUsername(username);
      if (!registerResponse) {
        setError(true);
        if (isEmpty) {
          setIsEmpty(false);
        }
      }
      setLoading(false);
      if (registerResponse) {
        setShow(false);
      }
    }
  }, [error, isEmpty]);

  return (
    <>
      <Button variant="light" onClick={handleShow}>
        Register
      </Button>

      <Modal show={show} onExiting={handleClose} onHide={handleClose}>
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
          {isEmpty && (
            <p className="text-danger" style={{ fontSize: 'medium' }}>
              Username is empty. Please try again.
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
            onClick={() => handleRegister(String(username))}
          >
            {loading ? '...loading' : 'Submit'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RegisterModal;
