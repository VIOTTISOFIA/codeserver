import { Router } from "express";
import productManager from "../../data/fs/ProductManager.fs.js"

const productsRouter = Router();

productsRouter.get ("/", async (req, res, next) => {
    try {
        const products = await productManager.read()
        return res.render("products", {products} )
        
    } catch (error) {
        return next(error)
    }
})

productsRouter.get ("/:pid", async (req, res, next) => {
    try {
        const { pid } = req.params
        const one = await productManager.readOne(pid)
        return res.render ("details", {product: one})
    } catch (error) {
        return next(error)
    }
})

productsRouter.get("/products/real", async (req, res, next) => {
    try {
        const realProducts = await productManager.read();
        return res.render("real", { realProducts });
    } catch (error) {
        return next(error);
    }
})

export default productsRouter;
