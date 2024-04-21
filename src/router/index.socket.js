import userManager from "../data/fs/UserManager.fs.js"

export default async (socket) => {
    console.log("Client id: " + socket.id)
    socket.emit("users", await userManager.read())
    socket.on("register", async data => {
        await userManager.create(data)
        socket.emit("users", await userManager.read())
    })
}


/* -------------------------------------------------*/

/* 
-Debo crear la funcion asincrona de socket con el .emit y .on (para escuchar y emitir desde y hacia el front) con productos en lugar de usuarios.

-Debo importar el manager de productos para usar el metodo .read
-Esta seria mi landing page
-Debo crear una nueva ruta de products/real
-Debo crear una nueva ruta de registro de un nuevo producto


*/