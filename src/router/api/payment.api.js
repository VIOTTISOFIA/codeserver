import CustomRouter from "../customRouter.js";
import { createPayment, successPayment } from "../../controllers/payment.controller.js";

class PaymentRouter extends CustomRouter {
    init () {
        this.create("/", ["ADMIN", "USER"], createPayment );
        //this.create("/success", ["ADMIN", "USER"], successPayment, )
        this.read("/success", ["ADMIN", "USER"], successPayment )
    }
}

const paymentRouter = new PaymentRouter();
export default paymentRouter.getRouter();

