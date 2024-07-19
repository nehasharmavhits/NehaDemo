import React from "react";
import { deletePost } from "../../../redux/slice/user/UserService";
import Index from "../../../component/user/Index";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function DeleteModal(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleClose, deleteId, getPostList } = props;

  const handleDelete = (deleteId) => {
    const urlencoded = new URLSearchParams();
    urlencoded.append("post_id", deleteId);
    dispatch(deletePost(urlencoded))
      .then((response) => {
        if (response?.payload?.status == 200) {
          navigate("/user-my-post");
          toast.success(response?.payload.message);
          getPostList();
          handleClose();
        } else {
          toast.error(response?.payload?.response?.data?.message);
        }
      })
      .catch((err) => {
        toast.error(err?.payload.message);
      });
  };

  return (
    <>
      <Index.Box>
        <Index.Box className="delete-game-data-main">
          <Index.Box>
            <h3 className="deleteModel-heading">
              Are you sure you want to delete Blog?
            </h3>
          </Index.Box>

          <Index.Box className="deleteModel-btn">
            <Index.Box className="btn-col">
              <Index.Button
                variant="contained"
                // onClick={handleClose}
                onClick={(e) => {
                  handleClose();
                }}
                color="error"
                btnLabel="Cancel"
                className="outline-blue-btn-content"
              >
                Cancel
              </Index.Button>
            </Index.Box>
            <Index.Box className="btn-col">
              <Index.Button
                variant="contained"
                // btnLabel="Confirm"
                className="blue-btn-content"
                onClick={() => handleDelete(deleteId)}
              >
                Confirm
              </Index.Button>
            </Index.Box>
          </Index.Box>
        </Index.Box>
      </Index.Box>
    </>
  );
}
