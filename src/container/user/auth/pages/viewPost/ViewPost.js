import React, { useEffect, useState } from "react";
import Index from "../../../../../component/user/Index";
import {
  viewPost,
  viewPostComment,
} from "../../../../../redux/slice/user/UserService";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import PageIndex from "../../../../PageIndex";

const ViewPost = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [viewData, setViewData] = useState({});
  const [viewPostCommentData, setViewPostCommentData] = useState([]);

  const getSinglePost = () => {
    dispatch(viewPost(id))
      .then((response) => {
        if (response?.payload?.status == 200) {
          setViewData(response?.payload?.data);
        }
      })
      .catch((err) => {});
  };

  const getSinglePostComment = () => {
    dispatch(viewPostComment(id))
      .then((response) => {
        if (response?.payload?.status == 200) {
          setViewPostCommentData(response?.payload?.data);
        }
      })
      .catch((err) => {});
  };
  useEffect(() => {
    getSinglePost();
    getSinglePostComment();
  }, [id]);

  return (
    <Index.Box className="list-main">
      <Index.Box className="view-main">
        <Index.Box className="view-main-box">
          <Index.Box className="view-left-box">
            <Index.Box className="post-cards-main view-post-main-box">
              <Index.Grid container spacing={2} className="view-grid-container">
                <Index.Grid item xs={12} sm={12} md={6} lg={6}>
                  <Index.Card
                    sx={{ width: 500, maxWidth: 500, height: 450 }}
                    className="card-box"
                  >
                    <Index.CardMedia
                      sx={{ height: 300 }}
                      image={`${process.env.REACT_APP_IMG}/${viewData?.image}`}
                      title="image"
                    />
                    <Index.CardContent>
                      <Index.Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                      >
                        {viewData?.title}
                      </Index.Typography>
                      <Index.Typography variant="body2" color="text.secondary">
                        {viewData?.description}
                      </Index.Typography>
                    </Index.CardContent>
                  </Index.Card>
                </Index.Grid>

                <Index.Grid item xs={12} sm={12} md={6} lg={6}>
                  <Index.Box className="view-right-box">
                    <Index.Box className="view-cards-main">
                      <Index.Box className="comment-box-main">
                        <Index.Typography variant="h5" className="comment-text">
                          Comments
                        </Index.Typography>

                        {viewPostCommentData?.length > 0 ? (
                          viewPostCommentData?.map((items, index) => {
                            return (
                              <Index.Box className="comment-paper-scroll">
                                <Index.Paper
                                  className="comment-paper"
                                  sx={{ width: 900 }}
                                  key={items?._id}
                                >
                                  <Index.Box className="comment-user-name-box">
                                    <Index.Typography
                                      variant="h6"
                                      className="comment-user-name"
                                    >
                                      {items?.userId?.name}
                                    </Index.Typography>
                                    <Index.Typography variant="h6">
                                      {items?.comment}
                                    </Index.Typography>
                                    <Index.Box className="comment-content-img-box">
                                      {items?.commentImage && (
                                        <img
                                          className="comment-content-img"
                                          src={
                                            items?.commentImage
                                              ? `${process.env.REACT_APP_IMG}/${items?.commentImage}`
                                              : PageIndex.Jpeg.userDummyImage
                                          }
                                          width={60}
                                          height={60}
                                        />
                                      )}
                                    </Index.Box>
                                    <Index.Typography variant={"p"}>
                                      {Index.moment(items?.createdAt).format(
                                        "DD/MM/YYYY hh:mm a"
                                      )}
                                    </Index.Typography>
                                  </Index.Box>
                                </Index.Paper>
                              </Index.Box>
                            );
                          })
                        ) : (
                          <Index.Box>
                            <Index.Paper className="no-comment-box">
                              <Index.Box>No Comment</Index.Box>
                            </Index.Paper>
                          </Index.Box>
                        )}
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                </Index.Grid>
              </Index.Grid>
            </Index.Box>
          </Index.Box>
        </Index.Box>
      </Index.Box>
    </Index.Box>
  );
};

export default ViewPost;
