import { Composition } from 'atomic-layout'
import { useField, Formik } from 'formik';
import Input from '../components/dataEntry/Input'
import Button from '../components/general/Button';

const sleep = ms => new Promise(r => setTimeout(r, ms));

const InputField = (props) => {
    const [field, meta, helpers] = useField(props);
    return (
        <Input 
          {...props} 
          {...field}
          {...{ meta }}
        />
    )
}

const initialValues = { email: '', password: '' }

const onSubmit = async (values, { setSubmitting }) => {
    await sleep(500);
    console.log(JSON.stringify(values, null, 2))
    return true
}

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Required'
  }

  return errors;
}

const form = ({
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    isSubmitting,
}) => (
    <Composition
      as="form"
      gap={'20px'}
      minWidth="400px"
      padding="15px"
      onSubmit={handleSubmit}
    >
        <InputField id="email" label="Email" name="email" type="email" />
        <InputField id="password" label="Password" type="password" name="password" />
        <Button 
            type="submit"
            label="Login"
            {...{ isSubmitting }}
        />
    </Composition>
)

const LoginForm = (props) => (
    <Formik
        component={form}
        initialValues={initialValues}
        validate={validate}
        onSubmit={onSubmit}
        {...props}
    />
)

export default LoginForm