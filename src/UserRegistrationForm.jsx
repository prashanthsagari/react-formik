// UserRegistrationForm.js

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const UserRegistrationForm = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  // write your validation logic here
  const validationSchema = Yup.object().shape({});

  // on submit of form this function will be called and a alert box will be shown with form values
  const onSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };

  return (
    <Formik
    // pass the three functions which you have created above to Formik
      initialValues={}
      validationSchema={}
      onSubmit={}
    >
      <Form>
        {/*  write your form fields for the following here using label tag ,  Field component and  ErrorMessage component from Formik */}
        <div>
          name
        </div>

        <div>
          email
        </div>

        <div>
          password
        </div>

        <div>
          confirmPassword
        </div>

        {/* submit button */}
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default UserRegistrationForm;
