import productManager from "../data/fs/ProductManager.fs.js"

export default async (socket) => {
    console.log("Client id: " + socket.id)
    socket.emit("real", await productManager.read())
    socket.on("register", async data => {
        await productManager.create(data)
        socket.emit("real", await productManager.read())
    })
}