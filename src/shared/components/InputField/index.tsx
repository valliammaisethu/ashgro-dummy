import React, { FC } from "react";
import { Field, ErrorMessage } from "formik";
import { Input } from 'antd';
import Error from "../Error";

interface InputFieldProps {
    type: string;
    name: string;
    placeholder: string;
}

const InputField: FC<InputFieldProps> = (props) => {
    const { name } = props;
    return (
        <div>
            <Field as={Input} {...props}/>
            <ErrorMessage name={name}>
                {(message: string) => <Error message={message} />}
            </ErrorMessage>
        </div>
    )
}

export default InputField;