import React, {useCallback, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";
import ToastFade from "react-bootstrap/ToastFade";
import {connect, useDispatch, useSelector} from "react-redux";
import {getBodyMsg} from '../../helpers/helpers'
import {setShouldResetToastTimeout, setShouldShowToast} from "../../modules/home";

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
                        time,
                    }) {

    const dispatch = useDispatch();
    const toastHeader = useSelector(state => state.login.toastHeader);
    const toastMessage = useSelector(state => state.login.toastMessage);
    const toastBackgroundColor = useSelector(state => state.login.toastBackgroundColor);
    const toastTextColor = useSelector(state => state.login.toastTextColor);
    const shouldShowToast = useSelector(state => state.login.shouldShowToast);
    const SHOW_TOAST_DURATION = 3000;
    const shouldResetToastTimeout = useSelector(state => state.login.shouldResetToastTimeout);
    const showToastFadeTimeoutLocal = useRef(-1);


    const setToastBooleans = useCallback((value) => {
        dispatch(setShouldResetToastTimeout(value));
        dispatch(setShouldShowToast(value));
    }, [dispatch])

    useEffect(() => {
        showToastFadeTimeoutLocal.current = setTimeout(() => {
            setToastBooleans(false);
        }, SHOW_TOAST_DURATION)

        return (() => {
            clearInterval(showToastFadeTimeoutLocal.current);
        })
    }, [shouldShowToast, setToastBooleans]);

    useEffect(() => {
        if (shouldResetToastTimeout) {
            clearInterval(showToastFadeTimeoutLocal.current);
            setToastBooleans(false);
        }
    }, [shouldResetToastTimeout, setToastBooleans])
    
    return (
        <ToastFade in={shouldShowToast}>
            <ToastContainer className="p-3" position={position} style={{zIndex: 10000}}>
                <Toast className={`bg-${toastBackgroundColor} text-${toastTextColor}`}>
                    <Toast.Header closeButton={closeButton}>
                        <strong className="me-auto">{toastHeader}</strong>
                        <small>{time}</small>
                    </Toast.Header>
                    <Toast.Body dangerouslySetInnerHTML={{
                        __html: getBodyMsg(toastMessage)
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