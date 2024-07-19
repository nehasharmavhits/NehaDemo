import React, { useState } from "react";
import "../../../assets/style/style.css";
import Index from "../../../component/user/Index";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import PageIndex from "../../PageIndex";
import { useDispatch } from "react-redux";
import { userLogin } from "../../../redux/slice/user/UserService";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let initialValues = {
    email: "",
    password: "",
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleFormSubmit = async (values) => {
    const data = new URLSearchParams();
    data.append("email", values?.email);
    data.append("password", values?.password);
    dispatch(userLogin(data))
      .then((response) => {
        if (response?.payload?.status == 200) {
          navigate("/user-post-list");
          Index.toast.success(response?.payload.message);
          Index.localStorage.setItem("token", response?.payload?.data?.token);
        } else {
          Index.toast.error(response?.payload?.response?.data?.message);
        }
      })
      .catch((err) => {
        Index.toast.error(err?.payload?.message);
      });
  };
  return (
    <>
      <Index.Box className="main-login-div">
        <Index.Box>
          <Index.Box className="login-main-box">
            <Index.Box className="main-login">
              <Index.Box className="login-heading">Welcome back !</Index.Box>
              <Index.Box className="login-sub-heading">
                Login your account
              </Index.Box>
              <Index.Formik
                enableReinitialize
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={PageIndex.userLoginValidationSchema}
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
                          fullWidth
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
                          fullWidth
                          className="email-field"
                          id="outlined-basic"
                          variant="outlined"
                          name="password"
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
                          btnLabel={"Login"}
                          className=""
                        />
                      </Index.Box>
                      <Index.Box className="auth-nav-main">
                        <Link to="/user-register">
                          <Index.Typography
                            variant="body1"
                            component="p"
                            className=""
                          >
                            Register
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

export default Login;
