import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Index from "../../../component/user/Index";
import PageIndex from "../../PageIndex";
import { userRegister } from "../../../redux/slice/user/UserService";
import { useDispatch } from "react-redux";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const editData = state?.item;

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  let initialValues = {};
  if (editData) {
    initialValues = editData;
  } else {
    initialValues = {
      name: "",
      email: "",
      password: "",
    };
  }

  const handleFormSubmit = async (values) => {
    const data = new URLSearchParams();
    data.append("name", values?.name);
    data.append("email", values?.email);
    data.append("password", values?.password);
    dispatch(userRegister(values))
      .then((response) => {
        console.log(response?.payload, 37);
        if (response?.payload?.status == 200) {
          navigate("/");
          Index.toast.success(response?.payload.message);
        } else {
          Index.toast.error(response?.payload?.response?.data?.message);
        }
      })
      .catch((err) => {
        Index.toast.error(err?.payload.message);
      });
  };

  return (
    <>
      <Index.Box className="main-login-div">
        <Index.Box>
          <Index.Box className="login-main-box">
            <Index.Box className="main-login">
              <Index.Box className="login-heading register-heading">
                Register your account
              </Index.Box>
              <Index.Formik
                enableReinitialize
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={PageIndex.userRegisterValidationSchema}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldValue,
                }) => (
                  <>
                    <form onSubmit={handleSubmit}>
                      <Index.Box className="login-field-box">
                        <Index.TextField
                          className="email-field"
                          id="outlined-basic"
                          variant="outlined"
                          name="name"
                          autoComplete="off"
                          value={values?.name}
                          onChange={handleChange}
                          placeholder="Name"
                          fullWidth
                          onKeyPress={(event) => {
                            if (!/[a-zA-Z0-9]/.test(event.key)) {
                              event.preventDefault();
                            }
                          }}
                        />
                        <Index.Box className="error">
                          <Index.FormHelperText className="error-message">
                            {errors?.name}
                          </Index.FormHelperText>
                        </Index.Box>
                      </Index.Box>
                      <Index.Box className="login-field-box">
                        <Index.TextField
                          className="email-field"
                          id="outlined-basic"
                          variant="outlined"
                          name="email"
                          autoComplete="off"
                          value={values?.email}
                          onChange={(e) => {
                            setFieldValue("email", e.target.value?.trim());
                          }}
                          placeholder="Email"
                          fullWidth
                        />
                        <Index.Box className="error">
                          <Index.FormHelperText className="error-message">
                            {errors?.email}
                          </Index.FormHelperText>
                        </Index.Box>
                      </Index.Box>

                      <Index.Box className="login-field-box">
                        <Index.TextField
                          hiddenLabel
                          id="outlined-basic"
                          variant="outlined"
                          name="password"
                          fullWidth
                          placeholder="Password"
                          value={values?.password}
                          onChange={(e) => {
                            setFieldValue("password", e.target.value?.trim());
                          }}
                          autoComplete="off"
                          type={showPassword ? "text" : "password"}
                          InputProps={{
                            endAdornment: (
                              <Index.InputAdornment position="end">
                                <Index.IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  edge="end"
                                >
                                  {showPassword ? (
                                    <Index.VisibilityOff />
                                  ) : (
                                    <Index.Visibility />
                                  )}
                                </Index.IconButton>
                              </Index.InputAdornment>
                            ),
                          }}
                          inputProps={{ autoComplete: "new-password" }}
                        />
                        <Index.Box className="error">
                          <Index.FormHelperText className="error-message">
                            {errors?.password}
                          </Index.FormHelperText>
                        </Index.Box>
                      </Index.Box>
                      <Index.Box className="login-btn-box">
                        <PageIndex.BorderButton
                          type={"submit"}
                          btnLabel={"Register"}
                          className=""
                        />
                      </Index.Box>
                      <Index.Box className="auth-nav-main">
                        <Link to="/">
                          <Index.Typography
                            variant="body1"
                            component="p"
                            className=""
                          >
                            Login
                          </Index.Typography>
                        </Link>
                      </Index.Box>
                    </form>
                  </>
                )}
              </Index.Formik>
            </Index.Box>
          </Index.Box>
        </Index.Box>
      </Index.Box>
    </>
  );
};

export default Register;
