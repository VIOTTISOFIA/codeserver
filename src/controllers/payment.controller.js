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
  const { user_id } = req.user; // O bien, obtener desde el token si lo manejas con JWT

  try {
    // Crear el ticket
    const ticketResponse = await fetch(`/api/tickets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!ticketResponse.ok) {
      throw new Error("Error creating ticket");
    }

    // Vaciar el carrito
    const emptyCart = await fetch(`/api/carts/cart/empty`, {
      method: "DELETE",
      credentials: "include",
    });

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
