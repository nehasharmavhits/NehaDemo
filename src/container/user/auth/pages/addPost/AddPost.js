import React, { useEffect, useState } from "react";
import Index from "../../../../../component/user/Index";
import PageIndex from "../../../../PageIndex";
import { useLocation, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addPost } from "../../../../../redux/slice/user/UserService";
import { styled } from "@mui/material/styles";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const AddPost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [singleImage, setSingleImage] = useState("");
  const { state } = useLocation();
  const editData = state?.item;

  let initialValues = {};
  if (editData) {
    initialValues = editData;
  } else {
    initialValues = {
      title: "",
      description: "",
      image: "",
    };
  }

  const handleFormSubmit = async (values) => {
    const data = new FormData();
    data.append("title", values?.title);
    data.append("description", values?.description);
    if (values.image) {
      data.append("image", values.image);
    }
    if (editData) {
      data.append("post_id", editData._id);
    }
    dispatch(addPost(data))
      .then((response) => {
        if (response?.payload?.status === 200) {
          navigate("/user-my-post");
          Index.toast.success(response?.payload.message);
        } else {
          Index.toast.error(response?.payload?.response?.data?.message);
        }
      })
      .catch((err) => {
        Index.toast.error(err?.message || "An error occurred");
      });
  };

  useEffect(() => {
    if (editData?.image) {
      const url = `${process.env.REACT_APP_IMG}/${editData?.image}`;
      setSingleImage(url);
    }
  }, [editData]);

  return (
    <>
      <Index.Box className="list-main">
        <Index.Box className="view-main">
          <Index.Formik
            enableReinitialize
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={PageIndex.userAddPostValidationSchema}
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
              <form onSubmit={handleSubmit}>
                <Index.Box className="view-main-box">
                  <Index.Grid container spacing={2}>
                    <Index.Grid item xs={12} sm={12} md={6} lg={6}>
                      <Index.Box>
                        <img
                          height={480}
                          width={800}
                          src={
                            singleImage
                              ? singleImage
                              : // PageIndex.png.addBlogImg
                                "https://img.freepik.com/free-photo/online-message-blog-chat-communication-envelop-graphic-icon-concept_53876-139717.jpg?t=st=1721378038~exp=1721381638~hmac=73d6413c9904459e8467faa38bea2ea68961ba132dfead417e5e9901b06ba97a&w=826"
                          }
                          alt="Selected"
                        />
                      </Index.Box>
                    </Index.Grid>
                    <Index.Grid item xs={12} sm={12} md={6} lg={6}>
                      <Index.Box className="view-right-box">
                        <Index.Box className="add-post-main">
                          <Index.Box className="add-post-paper-box">
                            <Index.Typography contained="p">
                              Title
                            </Index.Typography>
                            <Index.TextField
                              fullWidth
                              placeholder="Title"
                              name="title"
                              autoComplete="off"
                              value={values?.title}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              onKeyPress={(event) => {
                                if (values.title === "" && event.key === " ") {
                                  event.preventDefault();
                                } else if (!/[a-zA-Z0-9\s]/.test(event.key)) {
                                  event.preventDefault();
                                }
                              }}
                            />
                            <Index.Box className="error">
                              <Index.FormHelperText className="error-message">
                                {errors?.title}
                              </Index.FormHelperText>
                            </Index.Box>
                            <Index.Typography contained="p">
                              Description
                            </Index.Typography>
                            <Index.TextareaAutosize
                              type="text"
                              hiddenLabel
                              placeholder="Post Description"
                              variant="filled"
                              className="banner-textarea main-content-textarea post-textarea"
                              name="description"
                              onBlur={handleBlur}
                              value={values.description}
                              onChange={(e) => {
                                if (e.target.value.length <= 2500) {
                                  handleChange(e);
                                }
                              }}
                              sx={{ mb: 3 }}
                              style={{ width: 547 }}
                            />
                            <Index.Box className="error">
                              <Index.FormHelperText className="error-message">
                                {errors?.description}
                              </Index.FormHelperText>
                            </Index.Box>
                            <Index.Button
                              component="label"
                              role={undefined}
                              variant="contained"
                              tabIndex={-1}
                              className="image-upload-btn"
                            >
                              Upload Image
                              <VisuallyHiddenInput
                                type="file"
                                onChange={(e) => {
                                  setFieldValue("image", e.target.files[0]);
                                  setSingleImage(
                                    URL?.createObjectURL(e.target.files[0])
                                  );
                                }}
                              />
                            </Index.Button>
                            <Index.Box className="error">
                              <Index.FormHelperText className="error-message">
                                {errors?.image}
                              </Index.FormHelperText>
                            </Index.Box>
                            <Index.Box className="post-submit-btn-main">
                              <PageIndex.BorderButton
                                type={"submit"}
                                btnLabel={"Upload Post"}
                              />
                            </Index.Box>
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>
                    </Index.Grid>
                  </Index.Grid>
                </Index.Box>
              </form>
            )}
          </Index.Formik>
        </Index.Box>
      </Index.Box>
    </>
  );
};

export default AddPost;
