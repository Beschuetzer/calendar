import React from 'react';
import PropTypes from 'prop-types';
import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";
import ToastFade from "react-bootstrap/ToastFade";
import {connect} from "react-redux";
import {getBodyMsg} from '../../helpers/helpers'

LoginToast.propTypes = {
    position: PropTypes.string,
    closeButton: PropTypes.bool,
    body: PropTypes.string,
    header: PropTypes.string,
    time: PropTypes.string,
    shouldShowToast: PropTypes.bool,
    bgColor: PropTypes.string,
    textColor: PropTypes.string,
};

function LoginToast({
                        position,
                        closeButton = false,
                        children,
                        header,
                        time,
                        shouldShowToast,
                        bgColor,
                        textColor,
                        dispatch
                    }) {
    
    return (
        <ToastFade in={shouldShowToast}>
            <ToastContainer className="p-3" position={position}>
                <Toast className={`bg-${bgColor} text-${textColor}`}>
                    <Toast.Header closeButton={closeButton}>
                        <strong className="me-auto">{header}</strong>
                        <small>{time}</small>
                    </Toast.Header>
                    <Toast.Body dangerouslySetInnerHTML={{
                        __html: getBodyMsg(children)
                    }}></Toast.Body>
                </Toast>
            </ToastContainer>
        </ToastFade>
    );
}

const mapStateToProps = (state, ownProps) => {
    return {
        body: state.login.toastMessage,
        header: state.login.toastHeader,
        shouldShowToast: state.login.shouldShowToast,
        time: state.login.time,
        bgColor: state.login.toastBackgroundColor,
        textColor: state.login.toastTextColor,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginToast);