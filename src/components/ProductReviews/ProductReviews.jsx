import { useState } from "react";
import { Container } from "react-bootstrap";
import "./product-review.css";
import React from "react";

const ProductReviews = ({ selectedProduct }) => {
  const [listSelected, setListSelected] = useState("desc");

  return (
    <section className="product-reviews">
      <Container>
        <ul>
          <li
            style={{ color: listSelected === "desc" ? "black" : "#9c9b9b" }}
            onClick={() => setListSelected("desc")}
          >
            Description
          </li>
          <li
            style={{ color: listSelected === "rev" ? "black" : "#9c9b9b" }}
            onClick={() => setListSelected("rev")}
          >
            Reviews ({selectedProduct?.reviews.length})
          </li>
        </ul>

        {listSelected === "desc" ? (
          <p>{selectedProduct?.description}</p>
        ) : (
          <div className="rates">
            {selectedProduct?.reviews.map((rate, index) => (
              <div
                className="rate-comment"
                key={`${rate.rating}-${rate.text.slice(0, 10)}-${index}`}
              >
                <span>Medikart</span>
                <span>{rate.rating} (rating)</span>
                <p>{rate.text}</p>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default ProductReviews;
