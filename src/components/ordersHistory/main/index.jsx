import React, { useState, useEffect, useContext } from "react";
import styles from "./styles.module.scss";
import Paper from "@mui/material/Paper";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import TablePagination from "@mui/material/TablePagination";
import Box from "@mui/material/Box";
import moment from "moment";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrders,
  setOrderCompletion,
  setOrderCancellation,
} from "../../../redux/actions/order";
import { getOrderDetail } from "../../../redux/actions/product";
import SVGS from "../../../assets/svg";
import { IntlContext } from "../../../context/Internationalization";
import { FormattedMessage } from "react-intl";
import OrderDetailModal from "./orderDetailModal";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const OrdersHistory = () => {
  const dispatch = useDispatch();
  const context = useContext(IntlContext);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState([]);
  const [ordersData, setOrdersData] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderStatus, setOrderStatus] = useState("all");
  const [modalShow, setModalShow] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const {
    ordersList,
    isOrderLoading,
    isCompletionOrder,
    isCancellationOrder,
    orderPagination,
  } = useSelector((state) => state.order);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    getOrdersData(newPage, rowsPerPage, orderStatus);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    getOrdersData(0, event.target.value, orderStatus);
  };

  const getOrdersData = async (selectedPage, limit, status) => {
    dispatch(getOrders(selectedPage, limit, status));
  };

  useEffect(() => {
    getOrdersData(page, rowsPerPage, orderStatus);
    dispatch(getOrderDetail("orderHistory"))
  }, []);

  const toogleOpen = (id) => {
    const index = open.findIndex((_o) => _o === id);
    if (index > -1) {
      open.splice(index, 1);
      setOpen([...open]);
    } else {
      open.push(id);
      setOpen([...open]);
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setTimeout(() => {
      dispatch(setOrderCancellation(false));
      dispatch(setOrderCompletion(false));
    }, 5000);
  }, []);

  const selectStatus = ({ value, label, onChange }) => {
    return (
      <Select
        labelId="status-select-label"
        id="status-select-label"
        value={value}
        label={label}
        onChange={(event) => onChange(event)}
      >
        {label !== "Status" && <MenuItem value={"all"}>All</MenuItem>}
        <MenuItem value={"ordered"}>Ordered</MenuItem>
        <MenuItem value={"shipped"}>Shipped</MenuItem>
        <MenuItem value={"delivered"}>Delivered</MenuItem>
      </Select>
    );
  };

  const filterOrders = (status) => {
    getOrdersData(page, rowsPerPage, status);
    setOrderStatus(status);
  };

  const isGiftProduct = (items) => {
    return items.length > 0 && items.some((item) => item.gift_wrap);
  };

  return (
    <div
      className={"main-wrapper"}
      dir={context.state.locale === "sa" ? "rtl" : "ltr"}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12 mb-3">
            <h2>
              <FormattedMessage id="Orders History" />
            </h2>
          </div>
          <div className="col-lg-12 order-filter">
            <div className="row mb-4">
              <div className="col-lg-3">
                <FormControl fullWidth size="small">
                  <InputLabel id="status-select-label">
                    Filter By Status
                  </InputLabel>
                  <Select
                    labelId="status-select-label"
                    id="status-select-label"
                    value={orderStatus}
                    label={"Filter By Status"}
                    onChange={(event) => filterOrders(event.target.value)}
                  >
                    <MenuItem value={"all"}>All</MenuItem>
                    <MenuItem value={"ordered"}>Ordered</MenuItem>
                    <MenuItem value={"shipped"}>Shipped</MenuItem>
                    <MenuItem value={"delivered"}>Delivered</MenuItem>
                    <MenuItem value={"CANCELLED"}>Cancelled</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>
          <div className="col-lg-12 d-flex justify-content-center mt-lg-0 mt-50">
            <Paper sx={{ width: "100%" }}>
              <TableContainer
                sx={{ maxHeight: "calc(100vh - 190px)", minHeight: "200px" }}
              >
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <FormattedMessage id="Order ID" />
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        <FormattedMessage id="Customer Name" />
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }} align="center">
                        <FormattedMessage id="Total Items" />
                      </TableCell>
                      <TableCell align="center">
                        <FormattedMessage id="Status" />
                      </TableCell>
                      <TableCell align="center">
                        <FormattedMessage id="Payment Status" />
                      </TableCell>
                      <TableCell style={{ minWidth: 200 }} align="center">
                        <FormattedMessage id="Created At" />
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {ordersList.length > 0 ? (
                      ordersList.map((order, i) => {
                        return (
                            <TableRow
                            >
                              <TableCell component="th" scope="row">
                              {order?.transaction?.ref ? (
                                <button
                                  type="button"
                                  class="btn btn-link"
                                  onClick={() => {
                                    setSelectedOrder(order);
                                    setModalShow(true);
                                  }}
                                >
                                  {order?.transaction?.ref}
                                </button>
                              ) : (
                                "-"
                              )}
                              </TableCell>
                              <TableCell>
                                {`${order.shippingInfo?.first_name} ${order.shippingInfo?.last_name}`}
                              </TableCell>
                              <TableCell align="center">
                                {order.items.length}
                              </TableCell>
                              <TableCell align="center">
                                <span style={{ textTransform: "capitalize" }}>
                                  {order.status}
                                </span>
                              </TableCell>
                              <TableCell align="center">
                                <span style={{ textTransform: "capitalize" }}>
                                  {order?.payment_status || "-"}
                                </span>
                              </TableCell>
                              <TableCell align="center">
                                {moment(order.createdAt).format("LLL")}
                              </TableCell>
                            </TableRow>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableCell />
                        <TableCell />
                        <TableCell />
                        <TableCell>
                          <h3 className="text-center">
                            {!isOrderLoading ? (
                              <FormattedMessage id="Records not found" />
                            ) : (
                              <>
                                <FormattedMessage id="Loading" />
                                ...
                              </>
                            )}
                          </h3>
                        </TableCell>
                        <TableCell /> <TableCell />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              {ordersList.length > 0 && (
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={orderPagination?.totalCount || 0}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  labelRowsPerPage={<FormattedMessage id="Rows per page:" />}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              )}
            </Paper>
          </div>
        </div>
        <Backdrop
          sx={{
            color: "#5ebb45",
            marginTop: -25,
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={isOrderLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        {/* {isCompletionOrder || isCancellationOrder && */}
        <Dialog
          open={isCompletionOrder || isCancellationOrder}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => {}}
          aria-describedby="alert-dialog-slide-description"
          style={{ marginTop: "-15%" }}
        >
          <DialogContent>
            <DialogContentText
              id="alert-dialog-slide-description"
              className="text-center"
            >
              <div className="mt-3">
                <SVGS.CompleteSvg />
              </div>
              <h2 className="m-3">
                {isCompletionOrder
                  ? "Your order has been placed successfully"
                  : "Your order has been canceled"}
                !
              </h2>
            </DialogContentText>
          </DialogContent>
        </Dialog>
        {selectedOrder && modalShow && (
          <OrderDetailModal
            modalShow={modalShow}
            onHide={() => {
              setModalShow(false);
              setSelectedOrder(null);
            }}
            order={selectedOrder}
          />
        )}
      </div>
    </div>
  );
};

export default OrdersHistory;
