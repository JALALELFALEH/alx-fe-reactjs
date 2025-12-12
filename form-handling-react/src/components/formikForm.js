import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'Yup';

function FormoikForm() {
    return (
        <div>
            <h2>Formik Form</h2>
            <formik
            initialValue={{username: '', email: '', password: ''}}
            validationSchema={Yup.object({
                username: Yup.string().required('Required'),
                email: Yup.string().email('Invalid email').reduired('Required'),
                password: Yup.string().min(6, 'Too short').required('Required')
            })}
            onSubmit={(values) => alert(JSON.stringify(values))}
            >
                <Form>
                    <Field name='username' placeholder='Username' />
                    <ErrorMessage name='username' component='div' style={{color: 'red'}} />
                    <Field name='email' placeholder='Email' />
                    <ErrorMessage name='email' component='div' style={{color: 'red'}} />
                    <Field name='password' placeholder='Password' />
                    <ErrorMessage name='password' component='div' style={{color: 'red'}} />
                    <button type="submit">Submit</button>
                </Form>
            </formik>
        </div>
    )
}