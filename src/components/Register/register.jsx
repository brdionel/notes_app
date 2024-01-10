import { Formik, Form, Field, ErrorMessage } from "formik";
import ShowPasswordContent from "../ShowPasswordContent/showPasswordContent";
import Button from "../Button/button";
import classes from "./register.module.css";

const Register = ({
  setStep,
  register,
  email,
  handleShowPasswordClick,
  showPassword,
  handlePassword,
}) => {

  return (
    <>
      <h4 className={classes.login_title}>SIGN UP</h4>
      <p className={classes.login_email_section_email_label}>
        It looks like you're new here. Create a password to set up your account.
      </p>
      <Formik
        initialValues={{
          email,
          password: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.password) {
            errors.password = "Please enter a password";
          }

          return errors;
        }}
        onSubmit={async (values) => {
          handlePassword(values.password);
          const rta = await register(email, values.password);
        }}
      >
        {({ errors, isSubmitting, touched, values }) => (
          <Form className={classes.register_form}>
            <div className={classes.register_form_input_container}>
              <h3>CREATE PASSWORD</h3>
              <div className={classes.show_password_container}>
                <ShowPasswordContent
                  handleShowPasswordClick={handleShowPasswordClick}
                  showPassword={showPassword}
                />
              </div>
              <div className={classes.register_form_input_container}>
                <Field
                  type={showPassword ? "text" : "password"}
                  placeholder={"Password"}
                  name="password"
                  className={`${
                    touched.password
                      ? errors.password
                        ? classes.input_error
                        : classes.input_valid
                      : ""
                  }`}
                />
                <label htmlFor="password" className={classes.floating_label}>
                  Password
                </label>
                <ErrorMessage
                  className={classes.form_error_message}
                  name="password"
                  component="small"
                />
              </div>
            </div>
            <div className={classes.register_button_container}>
              <Button
                disabled={isSubmitting}
                text={"GO BACK"}
                handleClick={() => setStep(0)}
              />
              <Button
                disabled={isSubmitting}
                text={"REGISTER"}
                type={"submit"}
                variant={"primary"}
              />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Register;
