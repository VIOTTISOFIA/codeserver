import { Router } from "express";
import { createPayment } from "../../controllers/payment.controller.js";
import isAuth from "../../middlewares/isAuth.mid.js"; // Asegúrate de importar el middleware de autenticación si es necesario

const router = Router();

// Ruta para confirmar el checkout
router.post("/checkout/:userId", isAuth, createPayment);

export default router;
