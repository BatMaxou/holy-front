import { useCallback, useState } from "react";
import Form from "../../components/Form";
import { FormContextEnum } from "../../enums";
import apiClient from "../../api/ApiClient";
import { useNavigate } from "react-router";

const Login = () => {
    const [step, setStep] = useState(FormContextEnum.LOGIN);
    const [otp, setOtp] = useState('');
    const router = useNavigate();

    const onLoginSubmit = useCallback(async values =>{
        apiClient.login(values).then(({ status }) => {
            if (status === 401) {
                apiClient.user.otp(values).then(({ status }) => {
                    if (status === 200) {
                        setStep(FormContextEnum.CREATE_PASSWORD);
                        setOtp(values.password);
                    }
                });
            } else {
                router('/tier-list');
            }
        });
    }, []);
    
    const onCreatePasswordSubmit = useCallback(async values => {
        apiClient.user.createPassword({...values, otp}).then(({ status }) => {
            if (status === 200) {
                setStep(FormContextEnum.LOGIN);
            }
        });
    }, [otp]);

    return <div>
		<h1>
			<img src='/images/logo.webp' alt='logo' />
		</h1>
        <Form context={step} onSubmit={step === FormContextEnum.LOGIN ? onLoginSubmit : onCreatePasswordSubmit} />
	</div>;
}

export default Login;
