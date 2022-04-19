import * as Formik from 'formik';
import { useField } from 'formik';
import React, * as react from "react";
import { connect } from 'react-redux';
import { Message } from 'semantic-ui-react';

interface Props {
    errors: any;
}

const ValidationErrors : react.FC<Props> = ({errors}) =>
{
    const [field, meta] = useField(errors.name);
    return (
        <Message error> {errors && (<Message.List>
            {errors.map((err: any, i : any) => (<Message.Item key={i}>{ err}</Message.Item>))}
                                    </Message.List>
        )}
            </Message>
        )
};
export default ValidationErrors;