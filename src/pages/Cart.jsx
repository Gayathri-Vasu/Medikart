import React from 'react';
import { useEffect, useState } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseQty,
  deleteProduct,
  clearCart,
} from "../app/features/cart/cartSlice";

const Cart = () => {
  const { cartList } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [orders, setOrders] = useState(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders"));
    return storedOrders || [];
  });

  const [userDetails, setUserDetails] = useState({
    name: "",
    age: "",
    mobile: "",
    address: "",
    Aadhar_Number: "",
    paymentMethod: "",
    prescription: null,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const calculateTotalAmount = (items) => {
    return items.reduce((total, item) => total + item.qty * item.price, 0);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "prescription") {
      setUserDetails({ ...userDetails, prescription: files[0] });
    } else {
      setUserDetails({ ...userDetails, [name]: value });
    }
  };

  const validateForm = () => {
    let newErrors = {};
    Object.keys(userDetails).forEach((key) => {
      if (!userDetails[key]) {
        newErrors[key] = "This field is required";
      }
    });

    if (userDetails.Aadhar_Number && !/^\d{12}$/.test(userDetails.Aadhar_Number)) {
      newErrors.Aadhar_Number = "Aadhar_Number must be exactly 12 digits";
    }

    if (!userDetails.prescription) {
      newErrors.prescription = "Please upload the doctor's prescription.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newOrder = {
        id: Date.now(),
        user: { ...userDetails },
        items: [...cartList],
        total: calculateTotalAmount(cartList),
      };

      setOrders((prevOrders) => [...prevOrders, newOrder]);
      dispatch(clearCart());

      setUserDetails({
        name: "",
        age: "",
        mobile: "",
        address: "",
        Aadhar_Number: "",
        paymentMethod: "",
        prescription: null,
      });
    }
  };

  const handleClearOrder = (orderId) => {
    const updatedOrders = orders.filter((order) => order.id !== orderId);
    setOrders(updatedOrders);
  };

  return (
    <section className="cart-items">
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            {cartList.length === 0 && orders.length === 0 && (
              <h1 style={{ textAlign: "center", color: "#888" }}>
                No Items in Cart
              </h1>
            )}
            {cartList.map((item) => {
              const productQty = item.price * item.qty;
              return (
                <div
                  key={item.id}
                  style={{
                    border: "1px solid #ddd",
                    padding: "15px",
                    marginBottom: "15px",
                    borderRadius: "8px",
                  }}
                >
                  <Row>
                    <Col sm={4} md={3}>
                      <img
                        src={item.imgUrl}
                        alt={item.productName}
                        style={{ width: "100%", borderRadius: "8px" }}
                      />
                    </Col>
                    <Col sm={8} md={9}>
                      <h3>{item.productName}</h3>
                      <h4>
                        Rs.{item.price}.00 * {item.qty}
                        <span> = Rs.{productQty}.00</span>
                      </h4>
                      <button onClick={() => dispatch(addToCart({ product: item, num: 1 }))}>
                        ➕
                      </button>
                      <button onClick={() => dispatch(decreaseQty(item))}>➖</button>
                    </Col>
                  </Row>
                  <button
                    onClick={() => dispatch(deleteProduct(item))}
                    style={{
                      background: "red",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      cursor: "pointer",
                      marginTop: "10px",
                    }}
                  >
                    ❌ Remove
                  </button>
                </div>
              );
            })}
          </Col>

          <Col md={4}>
            {cartList.length > 0 && (
              <div
                style={{
                  border: "1px solid #ccc",
                  padding: "15px",
                  borderRadius: "8px",
                  backgroundColor: "white",
                }}
              >
                <h2>Cart Summary</h2>
                <div
                  style={{
                    backgroundColor: "white",
                    padding: "10px",
                    borderRadius: "8px",
                    textAlign: "center",
                    marginTop: "10px",
                  }}
                >
                  <h4>Total Price:</h4>
                  <h3>Rs.{calculateTotalAmount(cartList)}.00</h3>
                </div>

                <Form onSubmit={handleSubmit} style={{ marginTop: "15px" }}>
                  {["name", "age", "mobile", "address", "Aadhar_Number"].map((name) => (
                    <Form.Group className="mb-3" key={name}>
                      <Form.Label>{name.charAt(0).toUpperCase() + name.slice(1)}</Form.Label>
                      <Form.Control
                        type="text"
                        name={name}
                        value={userDetails[name]}
                        onChange={handleChange}
                        isInvalid={!!errors[name]}
                        style={{ border: "1px solid black", padding: "8px" }}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors[name]}
                      </Form.Control.Feedback>
                    </Form.Group>
                  ))}

                  <Form.Group className="mb-3">
                    <Form.Label>Mode of Payment</Form.Label>
                    <Form.Select
                      name="paymentMethod"
                      value={userDetails.paymentMethod}
                      onChange={handleChange}
                      isInvalid={!!errors.paymentMethod}
                      style={{ border: "1px solid black", padding: "8px" }}
                    >
                      <option value="">Select Payment Method</option>
                      <option value="Credit Card">Credit Card</option>
                      <option value="Debit Card">Debit Card</option>
                      <option value="UPI">UPI</option>
                      <option value="Cash on Delivery">Cash on Delivery</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.paymentMethod}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Upload Doctor's Prescription</Form.Label>
                    <Form.Control
                      type="file"
                      name="prescription"
                      accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                      onChange={handleChange}
                      isInvalid={!!errors.prescription}
                      style={{ border: "1px solid black", padding: "8px" }}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.prescription}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "5px",
                      fontSize: "16px",
                    }}
                  >
                    Place Order
                  </Button>
                </Form>
              </div>
            )}
          </Col>
        </Row>

        {orders.length > 0 && (
          <Row className="justify-content-center mt-4">
            <Col md={12}>
              <h2 className="text-center">Order Summary</h2>
              <div style={{ display: "flex", gap: "15px", overflowX: "auto" }}>
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="order-summary"
                    style={{
                      border: "1px solid black",
                      padding: "10px",
                      borderRadius: "5px",
                      minWidth: "300px",
                    }}
                  >
                    <h4>
                      👤 {order.user.name} | 📞 {order.user.mobile}
                    </h4>
                    <p>🏠 {order.user.address}</p>
                    {order.items.map((item) => (
                      <p key={item.id}>
                        {item.productName} - {item.qty} x Rs.{item.price}.00
                      </p>
                    ))}
                    <h5>Total: Rs.{order.total}.00</h5>
                    <Button
                      className="clear-order-btn"
                      variant="danger"
                      onClick={() => handleClearOrder(order.id)}
                    >
                      ❌ Clear Order
                    </Button>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </section>
  );
};

export default Cart;