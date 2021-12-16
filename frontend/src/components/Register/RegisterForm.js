import React, { useState, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { executeAddUser } from '../../modules/register'

function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [shouldShowErrorModal, setShouldShowErrorModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const ageRef = useRef(-1);
  const genderRef = useRef("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const age = parseInt(ageRef.current.value);
    const gender = genderRef.current.value;
    dispatch(executeAddUser({
      username,
      password,
      age,
      gender,
    }, navigate))
  }

  return (
    <Form className={"mt-3"} onSubmit={handleSubmit}>
      <Row className="">
        <Col md={6} xs={12} lg={4}>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control autoComplete={"on"} required={true} type="Username" placeholder="Enter Desired Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </Form.Group>
        </Col>

        <Col md={6} xs={12} lg={4}>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control autoComplete={"on"} required={true} type="password" placeholder="Enter Desired Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
        </Col>

        <Col xs={"auto"}>
          <Form.Group controlId="formGridGender">
            <Form.Label>Gender</Form.Label>
            <Form.Select defaultValue="Choose..." ref={genderRef}>
              <option value="">N/A</option>
              <option value="M">M</option>
              <option value="F">F</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col xs={"auto"}>
          <Form.Group controlId="formGridAge">
            <Form.Label>Age</Form.Label>
            <Form.Control autoComplete={"on"} required={true} type={"number"} min="1" max="100" ref={ageRef} />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col xs={12} md={"auto"}>
          <Button variant="primary" type="submit" className="mt-3 w-100">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default RegisterForm;