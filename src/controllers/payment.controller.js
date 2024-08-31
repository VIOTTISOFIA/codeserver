import { createPaymentService } from "../services/payment.service.js";

const createPayment = async (req, res, next) => {
  try {
    const response = await createPaymentService(req.user._id);
    return res.response200("CREATED", response);
  } catch (error) {
    return next(error);
  }
};

const successPayment = async (req, res, next) => {
  const { _id: user_id } = req.user; // Ajusta la obtención de user_id correctamente
  console.log("user_id:", user_id);
  
  try {
    console.log(`Vaciando carrito en la URL: /api/carts/cart/empty`);
    // Vaciar el carrito
    const emptyCart = await fetch(`http://localhost:8080/api/carts/cart/empty`, {
      method: "DELETE",
      credentials: "include",
    });

    console.log("emptyCart:", emptyCart);
    if (!emptyCart.ok) {
      throw new Error("Error emptying cart");
    }

    // Redirigir a la página de confirmación
    //res.redirect("/success");
    res.redirect("/");
  } catch (error) {
    return next(error);
  }
};

export { createPayment, successPayment };





 /* // Crear el ticket
    const ticketResponse = await fetch(`http://localhost:8080/api/tickets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    console.log("ticketResponse:", ticketResponse);
    
    if (!ticketResponse.ok) {
      throw new Error("Error creating ticket");
    } */
