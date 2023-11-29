import React, { useEffect, useState } from "react";
import "./tables.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";
import Popup from "../modal";
import productImage from "../../assets/images/Avocado.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  approveOrder,
  editOrder,
  fetchData,
  updateMissingProduct,
} from "../../redux/slice/orderSlice";

const Table = () => {
  const [isPopupOpen, setPopupOpen] = useState({
    isEditOpen: false,
    isDeleteOpen: false,
    isApproveOpen: false,
  });
  const [selectedProduct, setSelectedProduct] = useState({});
  const [editData, setEditData] = useState({});
  const statusColor = {
    "Missing-urgent": "red",
    Missing: "orange",
    Approved: "green",
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const { orderList } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  const togglePopup = (type) => {
    setPopupOpen({ ...isPopupOpen, [type]: !isPopupOpen[type] });
    if (isPopupOpen[type]) {
      setSelectedProduct({});
      setEditData({});
    }
  };

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  const handleMissingProduct = (type) => {
    dispatch(updateMissingProduct({ id: selectedProduct.id, type }));
    togglePopup("isDeleteOpen");
  };

  const handleApproveProduct = () => {
    dispatch(approveOrder(selectedProduct.id));
    togglePopup("isApproveOpen");
  };

  const handleReason = (reason) => {
    setEditData({ ...editData, reason });
  };

  const handleEditProduct = () => {
    dispatch(editOrder({ id: selectedProduct.id, product: editData }));
    togglePopup("isEditOpen");
  };

  return (
    <>
      <table id="tableCoponent">
        <tr>
          <th>Product Name</th>
          <th>Brand</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
        {orderList.map((data) => (
          <tr>
            <td className="productName">
              <img className="productimg" src={productImage} alt="product" />
              <span>{data.productName}</span>
            </td>
            <td>{data.brand}</td>
            <td>{data.price} / 6 * 1LB</td>
            <td>{data.quantity} x 6 * 1LB</td>
            <td>{data.price * data.quantity}</td>
            <td>
              <span
                className="status"
                style={{
                  backgroundColor: statusColor.hasOwnProperty(data.status)
                    ? statusColor[data.status]
                    : data.status
                    ? "green"
                    : "transparent",
                }}
              >
                {data.status}
              </span>
            </td>
            <td>
              <div className="productAction">
                <div
                  className="editBtn"
                  onClick={() => {
                    setSelectedProduct(data);
                    togglePopup("isEditOpen");
                  }}
                >
                  Edit
                </div>
                <FontAwesomeIcon
                  icon={faXmark}
                  color="gray"
                  onClick={() => {
                    setSelectedProduct(data);
                    togglePopup("isDeleteOpen");
                  }}
                />
                <FontAwesomeIcon
                  icon={faCheck}
                  color="gray"
                  onClick={() => {
                    setSelectedProduct(data);
                    togglePopup("isApproveOpen");
                  }}
                />
              </div>
            </td>
          </tr>
        ))}
      </table>
      {/* Edit popup */}
      {isPopupOpen.isEditOpen && (
        <Popup
          open={isPopupOpen.isEditOpen}
          handleClose={() => togglePopup("isEditOpen")}
          title="Edit Product"
        >
          <div className="popup-body">
            <h5>{selectedProduct.productName}</h5>
            <span>{selectedProduct.brand}</span>
            <div className="grid-container">
              <div className="image-container">
                <img src={productImage} width="200px" />
              </div>
              <div className="field-container">
                <div className="field">
                  <label>Price:</label>
                  <span>
                    <input
                      type="number"
                      name="price"
                      placeholder="Enter price"
                      onChange={handleChange}
                      value={editData.price || selectedProduct.price}
                    />{" "}
                    / 6 *1LB
                  </span>
                </div>
                <div className="field">
                  <label>Quantity:</label>
                  <span>
                    <input
                      type="number"
                      name="quantity"
                      placeholder="Enter quantity"
                      onChange={handleChange}
                      value={editData.quantity || selectedProduct.quantity}
                    />{" "}
                    * 6 *1LB
                  </span>
                </div>
                <div className="field">
                  <label>Total:</label>
                  <span className="total-label">
                    {(editData.quantity || selectedProduct.quantity) *
                      (editData.price || selectedProduct.price)}
                  </span>
                </div>
              </div>
            </div>
            <div className="reason-container">
              <h5>Choose Reason</h5>
              <div className="reason">
                <button
                  className={`reason-btn ${
                    editData.reason === 0 ? "reason-btn-selected" : ""
                  }`}
                  onClick={() => handleReason(0)}
                >
                  Missing Product
                </button>
                <button
                  className={`reason-btn ${
                    editData.reason === 1 ? "reason-btn-selected" : ""
                  }`}
                  onClick={() => handleReason(1)}
                >
                  Quantity is not the same
                </button>
                <button
                  className={`reason-btn ${
                    editData.reason === 2 ? "reason-btn-selected" : ""
                  }`}
                  onClick={() => handleReason(2)}
                >
                  Price is not the same
                </button>
                <button
                  className={`reason-btn ${
                    editData.reason === 3 ? "reason-btn-selected" : ""
                  }`}
                  onClick={() => handleReason(3)}
                >
                  Other
                </button>
              </div>
            </div>
          </div>

          <div className="popup-footer">
            <button className="send-btn" onClick={handleEditProduct}>
              Send
            </button>
            <button
              className="cancel-btn"
              onClick={() => togglePopup("isEditOpen")}
            >
              Cancel
            </button>
          </div>
        </Popup>
      )}
      {/* Delete popup */}
      {isPopupOpen.isDeleteOpen && (
        <Popup
          open={isPopupOpen.isDeleteOpen}
          handleClose={() => togglePopup("isDeleteOpen")}
          title="Missing Product"
        >
          <p>
            is {selectedProduct.productName} of {selectedProduct.brand} product
            urgent?
          </p>
          <div className="popup-footer">
            <button
              className="btn-action"
              onClick={() => handleMissingProduct("Missing-urgent")}
            >
              Yes
            </button>
            <button
              className="btn-action"
              onClick={() => handleMissingProduct("Missing")}
            >
              No
            </button>
          </div>
        </Popup>
      )}
      {/* Approve popup */}
      {isPopupOpen.isApproveOpen && (
        <Popup
          open={isPopupOpen.isApproveOpen}
          handleClose={() => togglePopup("isApproveOpen")}
          title="Approve Product"
        >
          <p>are your sure you want to approve this product?</p>
          <div className="popup-footer">
            <button className="btn-action" onClick={handleApproveProduct}>
              Yes
            </button>
            <button
              className="btn-action"
              onClick={() => togglePopup("isApproveOpen")}
            >
              No
            </button>
          </div>
        </Popup>
      )}
    </>
  );
};

export default Table;
