import * as Yup from "yup";
// const FILE_SIZE = 2 * 1024 * 1024;
export const userRegisterValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .required("Email is required")
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter valid email"
    ),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      //   "Enter strong password"
      "Password length should be minimum 8 character ex. 99@Inchroad"
    ),
  // password: Yup.string().required("Password is required"),
});

export const userLoginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter valid email"
    ),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Password length should be minimum 8 character ex. 99@Inchroad"
    ),
});

export const userAddPostValidationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string()
    .required("Description is required")
    .matches(/[a-zA-Z]/, "Please enter at list one character")
    .max(1000, "Only 1000 characters are allowed"),
  image: Yup.mixed()
    .required("Image is required")
    .test("FileType", "Allow only jpg, jpeg, png file", (value) => {
      if (!value) return true;
      if (!value?.name) {
        const file = value.split(".")[1];
        return ["jpeg", "jpg", "png"].includes(file); //edit
      } else {
        return ["image/jpeg", "image/jpg", "image/png"].includes(value?.type); //add
      }
    }),
});
export const userAddPostCommentValidationSchema = Yup.object().shape({
  comment: Yup.string()
    .required("Comment is required")
    .matches(/[a-zA-Z]/, "Please enter at list one character")
    .max(1000, "Only 1000 characters are allowed"),
  image: Yup.mixed().test(
    "FileType",
    "Allow only jpg, jpeg, png file",
    (value) => {
      if (!value) return true;
      if (!value?.name) {
        const file = value.split(".")[1];
        return ["jpeg", "jpg", "png"].includes(file); //edit
      } else {
        return ["image/jpeg", "image/jpg", "image/png"].includes(value?.type); //add
      }
    }
  ),
});
