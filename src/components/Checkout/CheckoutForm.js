import { useState } from "react";

const CheckoutForm = ({ onConfirm }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isFormValid, setIsFormValid] = useState(null);

  const validateForm = () => {
    const isNameValid = name.trim() !== "";
    const isPhoneValid = phone.trim() !== "" && /^\d+$/.test(phone.trim());
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

    const isValid = isNameValid && isPhoneValid && isEmailValid;
    setIsFormValid(isValid);

    return isValid;
  };

  const handleConfirm = (event) => {
    event.preventDefault();

    if (validateForm()) {
      console.log("Submit button clicked");

      const userData = {
        name,
        phone,
        email,
      };

      console.log("User data:", userData);

      // Call the onConfirm function to process the order
      onConfirm(userData);

      // Clear the form inputs by resetting their values
      setName("");
      setPhone("");
      setEmail("");
    }
  };

  return (
    <div className="FormContainer">
      <h1 className="FormTitle">Checkout</h1>
      <form onSubmit={handleConfirm} className="Form">
        <div className="FormGroup">
          <label className="Label">
            Nombre
            <input
              className="input"
              type="text"
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
          </label>
          <label className="Label">
            Teléfono
            <input
              className="input"
              type="text"
              value={phone}
              onChange={({ target }) => setPhone(target.value)}
            />
          </label>
          <label className="Label">
            Email
            <input
              className="input"
              type="email"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />
          </label>
        </div>
        {isFormValid === false && (
          <div className="ErrorMessage">
            Completa todos los campos para enviar el formulario.
          </div>
        )}
        <div className="Label">
          <button type="submit" className="FormButton">
            Crear Orden
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
