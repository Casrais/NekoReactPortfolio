import * as Formik from 'formik';
import { useField } from 'formik';
import * as React from 'react';
import { connect } from 'react-redux';
import { Form, Label } from 'semantic-ui-react';

interface Props {
    errors: any;
}

export default function ValidationErrors({errors}: Props)
{
    const [field, meta] = useField(props.name);
    return (
        <Message error> {errors && (<Message.List>
            {errors.map((err: any, i) => (<Message.Item key={i}>{ err}</Message.Item>))}
                                    </Message.List>
        )}
            </Message>
        )
};
