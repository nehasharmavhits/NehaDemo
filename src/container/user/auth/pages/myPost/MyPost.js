import React, { useEffect, useState } from "react";
import Index from "../../../../../component/user/Index";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { myPost } from "../../../../../redux/slice/user/UserService";
import PageIndex from "../../../../PageIndex";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const MyPost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [deleteId, setDeleteId] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [postList, setPostList] = useState([]);
  const [searchedData, setSearchedData] = useState([]);
  const [openDeleteData, setOpenDeleteData] = useState(false);

  const handleCloseDeleteData = () => setOpenDeleteData(false);
  const handleOpenDeleteData = () => setOpenDeleteData(true);

  const handleChangePage = (event) => {
    setPage(event.target.value);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const getPostList = () => {
    dispatch(myPost())
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

  const handleEdit = (item) => {
    navigate("/user-add-post", {
      state: { item: item },
    });
  };
  const handleView = (id) => {
    navigate(`/user-view-post/${id}`);
  };

  const [searchValue, setSearchValue] = useState("");

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
        <Index.Box className="add-post-icon-main my-post">
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
          <Index.AddCircleIcon
            className="add-post-icon-btn-btn"
            onClick={() => navigate("/user-add-post")}
            size={35}
          />
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
                          sx={{ height: 200 }}
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
                            View
                          </Index.Button>
                          <Index.Button
                            size="small"
                            onClick={() => {
                              handleEdit(items);
                            }}
                          >
                            Edit
                          </Index.Button>
                          <Index.Button
                            size="small"
                            onClick={() => {
                              setDeleteId(items?._id);
                              handleOpenDeleteData();
                            }}
                          >
                            Delete
                          </Index.Button>
                        </Index.CardActions>
                      </Index.Card>
                    </Index.Grid>
                  );
                })
            ) : (
              <PageIndex.NoDataFound message={"No my blog found"} />
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

        <Index.Modal
          open={openDeleteData}
          onClose={handleCloseDeleteData}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="modal-comman-details"
        >
          <Index.Box sx={style} className="modal-comman-inner-style">
            <PageIndex.DeleteModal
              handleClose={handleCloseDeleteData}
              deleteId={deleteId}
              getPostList={getPostList}
            />
          </Index.Box>
        </Index.Modal>
      </Index.Box>
    </>
  );
};

export default MyPost;
