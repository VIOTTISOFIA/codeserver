**CHALLENGE #2:**

En esta entrega se crean nuevas rutas para el carrito respetando los metodos CRUD para "crear, eliminar, actualizar y leer".
Tenemos:
  - Una ruta para leer la cantidad de carritos dentro de nuestra base de datos en MongoDB.
  - Una ruta para leer un carrito especifico segun el id de un usuario.
  - Una ruta para actualizar un producto dentro de un carrito (se elimina uno y se agrega otro) mediante el ID de el carrito especifico.
  - Una ruta para eliminar un producto especifico de un carrito

Asi mismo se crearon dos nuevos metodos en el manager generico:
  - (readCart) para usar especificamente con las rutas de carts. Esto para no generar conflictos con el manager de products y users por las modificaciones necesarias.
  - (destroyAll) para eliminar todos los carritos de un usuario segun su ID

Tambien se creo el enrutador correspondiente para la vista de los productos de un carrito usando plantillas de handlebars

Para probarlo, usamos la siguiente ruta:

http://localhost:8080/carts/cart?user_id=66379f89fdc2a1f1c2040722 (ID harcodeado para que funcione con metodo 'create' y 'destroy')
