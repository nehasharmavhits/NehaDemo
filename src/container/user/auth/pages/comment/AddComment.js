import React, { useEffect, useState } from "react";
import Index from "../../../../../component/user/Index";
import PageIndex from "../../../../PageIndex";
import { useLocation, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addPostComment } from "../../../../../redux/slice/user/UserService";
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

const AddComment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [singleImage, setSingleImage] = useState("");
  const { state } = useLocation();
  const editData = state?.item;

  // initialValues
  const initialValues = {
    comment: "",
    image: "",
  };

  // handle form submit
  const handleFormSubmit = async (values) => {
    const data = new FormData();
    data.append("comment", values?.comment);
    data.append("post_id", state?.row?._id);

    if (values.image) {
      data.append("image", values.image);
    }
    dispatch(addPostComment(data))
      .then((response) => {
        if (response?.payload?.status === 200) {
          navigate(`/user-view-post/${state?.row?._id}`);
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
            validationSchema={PageIndex.userAddPostCommentValidationSchema}
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
                          height={550}
                          width={800}
                          src={
                            singleImage
                              ? singleImage
                              : `${process.env.REACT_APP_IMG}/${state?.row?.image}`
                          }
                          alt="Selected"
                        />
                      </Index.Box>
                    </Index.Grid>
                    <Index.Grid item xs={12} sm={12} md={6} lg={6}>
                      <Index.Box className="view-right-box">
                        <Index.Box className="add-post-comment-main add-post-main">
                          <Index.Box className="add-post-paper-box">
                            <Index.Typography
                              variant="contained"
                              component={"h3"}
                              className="comment-heading"
                            >
                              Add Comments
                            </Index.Typography>
                            <Index.TextareaAutosize
                              type="text"
                              hiddenLabel
                              placeholder="Add comments"
                              variant="filled"
                              className="banner-textarea main-content-textarea post-textarea"
                              name="comment"
                              onBlur={handleBlur}
                              value={values.comment}
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
                                {errors?.comment}
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
                                    URL.createObjectURL(e.target.files[0])
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
                                btnLabel={"Send"}
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

export default AddComment;
