import React, { useState } from "react";
import styles from "./Payment.module.css";

// Use actual image paths in your project
const cardImage = "https://i.ibb.co/4WNDjKz/card-dark.png";
const cashImage = "https://i.ibb.co/6RJ5hq3/money.png";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("");

  return (
    <div className={styles.paymentContainer}>
      <h1 className={styles.heading}>Select Payment Method</h1>

      <select
        className={styles.paymentSelect}
        onChange={(e) => setPaymentMethod(e.target.value)}
        defaultValue=""
      >
        <option value="" disabled>
          -- Choose Payment Method --
        </option>
        <option value="cash">Cash</option>
        <option value="card">Card</option>
      </select>

      <div className={styles.paymentContent}>
        {paymentMethod === "card" && (
          <div className={`${styles.cardBox} ${styles.animateSlideIn}`}>
            <img
              src={cardImage}
              alt="Credit Card"
              className={styles.cardImage}
            />
          </div>
        )}

        {paymentMethod === "cash" && (
          <div className={`${styles.cashBox} ${styles.animateBounce}`}>
            <img
              src={cashImage}
              alt="Cash Payment"
              className={styles.cashImage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;