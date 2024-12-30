import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import style from './Login.module.scss';
import apiClient from "../../api/ApiClient";
import Form from "../../components/Form";
import { FormContextEnum } from "../../enums";
import { NotificationContext } from "../../context/NotificationContext";

const Login = () => {
    const [step, setStep] = useState(FormContextEnum.LOGIN);
    const [otp, setOtp] = useState('');
    const router = useNavigate();
    const { addNotification } = useContext(NotificationContext);

    useEffect(() => {
        apiClient.isLogged().then(isLogged => isLogged && router('/tier-list'));
    }, [router]);

    const onLoginSubmit = useCallback(async values => {
        apiClient.login(values).then(({ status }) => {
            if (status === 401) {
                apiClient.user.otp(values).then(({ status }) => {
                    if (status === 200) {
                        setStep(FormContextEnum.CREATE_PASSWORD);
                        setOtp(values.password);
                    } else {
                        addNotification({ message: 'Identifiants invalides', type: 'error' });
                    }
                });
            } else if (status === 400) {
                addNotification({ message: 'Identifiants invalides', type: 'error' });
            } else {
                router('/tier-list');
                router(0);
            }
        });
    }, [router, addNotification]);
    
    const onCreatePasswordSubmit = useCallback(async values => {
        apiClient.user.createPassword({...values, otp}).then(({ status }) => {
            if (status === 200) {
                setStep(FormContextEnum.LOGIN);
            } else {
                addNotification({ message: 'Erreur lors de la création du mot de passe', type: 'error' });
            }
        });
    }, [otp, addNotification]);

    return <div className={style.page}>
		<h1 className={style.logo}>
			<img src='/images/logo.webp' alt='logo' />
		</h1>
        <Form context={step} onSubmit={step === FormContextEnum.LOGIN ? onLoginSubmit : onCreatePasswordSubmit} />
	</div>;
}

export default Login;
