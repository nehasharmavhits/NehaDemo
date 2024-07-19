import React, { useEffect, useState } from "react";
import Index from "../../../../../component/user/Index";
import { useNavigate } from "react-router";
import { getPost } from "../../../../../redux/slice/user/UserService";
import { useDispatch } from "react-redux";
import PageIndex from "../../../../PageIndex";

const PostList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [postList, setPostList] = useState([]);
  const [searchedData, setSearchedData] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchValue, setSearchValue] = useState("");

  const handleChangePage = (event) => {
    setPage(event.target.value);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleView = (id) => {
    navigate(`/user-view-post/${id}`);
  };

  const getPostList = () => {
    dispatch(getPost())
      .then((response) => {
        if (response?.payload?.status == 200) {
          setPostList(response?.payload?.data);
          setSearchedData(response?.payload?.data);
        }
      })
      .catch((err) => {});
  };
  useEffect(() => {
    getPostList();
  }, []);

  const handleSearch = (value) => {
    const result = postList?.filter((item) => {
      return item?.title.toLowerCase().includes(value?.toLowerCase());
    });
    setSearchedData(result);
    setPage(0);
  };
  return (
    <>
      <Index.Box className="list-main">
        <Index.Box className="add-post-icon-main">
          <Index.Box className="search-box">
            <Index.TextField
              placeholder="Search..."
              className="header-search-input"
              value={searchValue}
              onChange={(e) => {
                handleSearch(e.target.value);
                setSearchValue(e.target.value);
              }}
            />
          </Index.Box>
        </Index.Box>
        <Index.Box className="post-cards-main">
          <Index.Grid container spacing={2}>
            {searchedData?.length ? (
              searchedData
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((items, index) => {
                  return (
                    <Index.Grid item xs={12} sm={12} md={4}>
                      <Index.Card
                        sx={{ maxWidth: 500, height: 350 }}
                        className="card-box"
                        key={items?._id}
                      >
                        <Index.CardMedia
                          sx={{ height: 200, width: "100%" }}
                          image={`${process.env.REACT_APP_IMG}/${items?.image}`}
                        />
                        <Index.CardContent>
                          <Index.Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                          >
                            {items?.title}
                          </Index.Typography>
                          <Index.Typography
                            variant="body2"
                            color="text.secondary"
                          >
                            {items?.description?.substring(0, 50) +
                              (items?.description.length > 50 ? "..." : "")}
                          </Index.Typography>
                        </Index.CardContent>
                        <Index.CardActions>
                          <Index.Button
                            size="small"
                            onClick={() => {
                              handleView(items?._id);
                            }}
                          >
                            View Blogs
                          </Index.Button>
                          <Index.Button
                            size="small"
                            onClick={() =>
                              navigate("/user-add-post-comment", {
                                state: { row: items },
                              })
                            }
                          >
                            Comment
                          </Index.Button>
                        </Index.CardActions>
                      </Index.Card>
                    </Index.Grid>
                  );
                })
            ) : (
              <>
                <PageIndex.NoDataFound message={"No blog found"} />
              </>
            )}
          </Index.Grid>
        </Index.Box>
        {searchedData?.length > 0 && (
          <Index.Box className="pagination-container">
            <Index.TablePagination
              component="div"
              count={searchedData?.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Index.Box>
        )}
      </Index.Box>
    </>
  );
};

export default PostList;
