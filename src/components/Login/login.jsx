import { ErrorMessage, Field, Form, Formik } from "formik";
import { useUser } from "../../hooks/Users/useUser";
import Button from "../Button/button";
import ShowPasswordContent from "../ShowPasswordContent/showPasswordContent";
import classes from "./login.module.css";
import Register from "../Register/register";
import useNotes from "../../hooks/Notes/useNotes";
import { setToken } from "../../services/notes";

export default function Login() {
  const {
    register,
    error,
    step,
    setStep,
    email,
    showPassword,
    handleEmail,
    handleSubmitEmail,
    handleShowPasswordClick,
    handleSubmit,
    handlePassword,
  } = useUser();

  const { getNotes } = useNotes();
  return (
    <div className={classes.login_container}>
      {step === 0 && (
        <>
          <h5 className={classes.login_title}>Log in</h5>
          <p className={classes.login_email_section_email_label}>
            Let's check if you already have an account
          </p>
          <Formik
            initialValues={{
              email: "",
            }}
            validate={(values) => {
              const errors = {};

              if (!values.email) {
                errors.email = "The e-mail address is not valid";
              } else if (
                !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
                  values.email
                )
              ) {
                errors.email = "The e-mail address is not valid";
              }

              return errors;
            }}
            onSubmit={async (values) => {
              handleEmail(values.email);
              await handleSubmitEmail(values.email);
            }}
          >
            {({ errors, isSubmitting, touched, values }) => (
              <Form className={classes.login_form}>
                <div className={classes.input_container}>
                  <Field
                    placeholder={"E-mail *"}
                    name="email"
                    className={`${
                      touched.email
                        ? errors.email
                          ? classes.input_error
                          : classes.input_valid
                        : ""
                    }`}
                  />
                  <label htmlFor="email" className={classes.floating_label}>
                    E-mail *
                  </label>
                  <ErrorMessage
                    className={classes.form_error_message}
                    name="email"
                    component="small"
                  />
                </div>
                <div className={classes.login_button_container}>
                  <Button
                    disabled={isSubmitting}
                    text={"Continue"}
                    type={"submit"}
                    variant={"primary"}
                  />
                </div>
              </Form>
            )}
          </Formik>
        </>
      )}
      {step === 1 && (
        <>
          <h4 className={classes.login_title}>LOG IN</h4>
          <p className={classes.login_password_section_label}>
            Welcome back! Enter your password to log in.
          </p>
          <Formik
            initialValues={{
              email,
              password: "",
            }}
            validate={(values) => {
              const errors = {};

              if (!values.password) {
                errors.password = "Please enter a password.";
              }
              return errors;
            }}
            onSubmit={async (values) => {
              handlePassword(values.password);
              try {
                const responseLogin = await handleSubmit(
                  email,
                  values.password
                );
                if (responseLogin) {
                  const { token } = responseLogin;
                  setToken(token)
                  await getNotes();
                }
              } catch (error) {
                console.log({ error });
              }
            }}
          >
            {({ errors, isSubmitting, touched, values }) => (
              <Form className={classes.login_form}>
                <div className={classes.show_password_container}>
                  <ShowPasswordContent
                    handleShowPasswordClick={handleShowPasswordClick}
                    showPassword={showPassword}
                  />
                </div>

                <div className={classes.input_container}>
                  <Field
                    placeholder={"Password *"}
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className={`${
                      touched.password
                        ? errors.password
                          ? classes.input_error
                          : classes.input_valid
                        : ""
                    }`}
                  />
                  <label htmlFor="password" className={classes.floating_label}>
                    Password *
                  </label>
                  <ErrorMessage
                    className={classes.form_error_message}
                    name="password"
                    component="small"
                  />
                </div>
                {!touched.password && error && (
                  <div className={classes.error_container}>
                    <span className={classes.error_login_message}>
                      {error.message}
                    </span>
                  </div>
                )}

                <div className={classes.login_button_container}>
                  <Button
                    disabled={isSubmitting}
                    text={"GO BACK"}
                    handleClick={() => setStep(0)}
                    type={"button"}
                  />
                  <Button
                    disabled={isSubmitting}
                    text={"LOG IN"}
                    type={"submit"}
                    variant={"primary"}
                  />
                </div>
              </Form>
            )}
          </Formik>
        </>
      )}
      {step === 2 && (
        <Register
          setStep={setStep}
          error={error}
          register={register}
          email={email}
          handleShowPasswordClick={handleShowPasswordClick}
          showPassword={showPassword}
          handlePassword={handlePassword}
        />
      )}
    </div>
  );
}
