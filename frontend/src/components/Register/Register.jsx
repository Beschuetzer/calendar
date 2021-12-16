import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import RegisterForm from './RegisterForm';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';

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
                <Alert className="my-3" show={shouldShowErrorModal} variant="danger" onClose={() => setShouldShowErrorModal(false)} dismissible>
                    <Alert.Heading className={"text-decoration-underline"}>Error Registering:</Alert.Heading>
                    <p dangerouslySetInnerHTML={{
                        __html: getBodyMsg(registrationResult.error ? registrationResult.error : '')
                    }}></p>
                </Alert>
                <h2 className="mt-3 fw-bolder">Register</h2>
                <RegisterForm/>
            </section>
        </>
    );
}

export default React.memo(Register);