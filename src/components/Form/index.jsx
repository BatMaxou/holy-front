import { useCallback, useEffect, useMemo, useState } from "react";

import style from './Form.module.scss';
import { FormContextEnum } from "../../enums";
import Button from "../ui/Button";

const Form = ({ context, onSubmit }) => {
    const [values, setValues] = useState({});

    useEffect(() => {
        setValues(values =>  ({
            ...values,
            password: '',
        }));
    }, [context]);

    const handleSubmit = useCallback(event => {
        event.preventDefault();        

        onSubmit(values);
    }, [values, onSubmit]);

    const handleChange = useCallback(event => {
        const { name, value } = event.target;

        setValues(values => ({
            ...values,
            [name]: value
        }));
    }, []);

    const label = useMemo(() => {
        switch (context) {
            case FormContextEnum.CREATE_PASSWORD:
                return "Créer votre mot de passe";
            case FormContextEnum.LOGIN:
                return "Connexion";
            default:
                return "Soumettre";
        }
    }, [context]);

    const isUsernameDisabled = useMemo(() => context === FormContextEnum.CREATE_PASSWORD, [context]); 

    return <form onSubmit={handleSubmit} className={style.form}>
        <input type="text" name="username" onChange={isUsernameDisabled ? null : handleChange} value={values.username ?? ''} disabled={isUsernameDisabled} />
        <input type="password" name="password" onChange={handleChange} value={values.password ?? ''} />
        <Button type="submit">{label}</Button>
    </form>;
};

export default Form;
