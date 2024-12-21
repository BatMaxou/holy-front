import { useCallback, useEffect, useMemo, useState } from "react";

import { FormContextEnum } from "../../enums";

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
                return "Créer";
            case FormContextEnum.LOGIN:
                return "Connexion";
            default:
                return "";
        }
    }, [context]);

    return <form onSubmit={handleSubmit}>
        <input type="text" name="username" onChange={handleChange} value={values.username ?? ''} />
        <input type="password" name="password" onChange={handleChange} value={values.password ?? ''} />
        <button type="submit">{label}</button>
    </form>;
};

export default Form;
