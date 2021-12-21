import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import RegisterForm from './RegisterForm';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {getBodyMsg} from '../../helpers/helpers';

function Register(props) {
    const registrationResult = useSelector((state) => state.register.registrationResult);
    const [shouldShowErrorModal, setShouldShowErrorModal] = useState(false);

    useEffect(() => {
        if (registrationResult?.error) return setShouldShowErrorModal(true);
        setShouldShowErrorModal(false);
    }, [registrationResult]);


    return (
        <>
            <section className="">
                <Alert className="my-3" show={shouldShowErrorModal} variant="danger"
                       onClose={() => setShouldShowErrorModal(false)} dismissible>
                    <Container fluid className={"px-0 mb-0"}>
                        <Row>
                            <Col>
                                <Alert.Heading className={"text-decoration-underline d-inline"}>
                                    Error
                                </Alert.Heading>
                                :&nbsp;
                                <div className={"mt-3"}>
                                    <strong className={"text-decoration-underline"}>Type</strong>: <em>{registrationResult.error ? registrationResult.error : "Server responded with error."}</em>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                    <Container fluid className={"px-0 my-0"}>
                        <Row>
                            <Col>
                                <p>
                                    <strong className={"text-decoration-underline"}>Details</strong>:&nbsp;
                                    <em>
                                        <span dangerouslySetInnerHTML={{
                                            __html: getBodyMsg(registrationResult.message ? registrationResult.message : 'Unable to retrieve error message...')
                                        }}></span>
                                    </em>
                                </p>
                            </Col>
                        </Row>
                    </Container>

                </Alert>
                <h2 className="mt-3 fw-bolder">Register</h2>
                <RegisterForm/>
            </section>
        </>
    );
}

export default React.memo(Register);