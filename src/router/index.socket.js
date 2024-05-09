import productManager from "../data/fs/ProductManager.fs.js"
import userManager from "../data/fs/UserManager.fs.js";

export default async (socket) => {
    console.log("Client id: " + socket.id)
    socket.emit("products", await productManager.read())
    socket.emit("users", await userManager.read());
    socket.on("Register", async (data) => {
        await productManager.create(data)
        socket.emit("products", await productManager.read())
    })
    socket.on("register", async (data) => {
      await userManager.create(data)
      socket.emit("users", await userManager.read());
})
};