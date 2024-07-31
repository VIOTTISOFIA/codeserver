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

http://localhost:8080/carts/cart?user_id=6660fcb73892bc1eecfeabe9 (ID harcodeado para que funcione con metodo 'create' y 'destroy')

**DESAFIO ENTREGABLE "SPRINT6"**

<<<<<<< HEAD
En esta entrega se han implementado nuevas funcionalidades y nuevos metodos relacionados a la autenticacion de un usuario utilzando cookies.

- Agregamos un nuevo archivo con rutas utilizando las cookies como memoria de almacenamiento de datos segun la informacion recibida desde el front, como por ejemplo, el inicio de sesion de un usuario ya existente en nuestra base de datos (DB), o el registro de un nuevo usuario.

- Logramos condicionar las vistas para que se rendericen segun las sesiones activas y asi mejorar la experiencia de usuario. Ejemplo de esto, es nuestro 'NavBar' el cual se renderiza con opcion de "login" si el usuario no ha iniciado sesion, o la muestra del boton del carrito o "signout" si tiene una sesion activa.

- Asimismo el perfil de un usuario y su carrito (si existe) se renderizan en funcion a la sesion iniciada.

- Tambien se agregaron nuevos middlewares de autenticacion para verificar que el email y contrasenia coincidan segun lo registrado en la DB, y nuevos middlewares para validar que los datos agregados al momento de registrar un nuevo usuario no existan en la DB.
=======
En esta entrega se han implementado nuevas funcionalidades y nuevos metodos relacionados a la autenticacion de un usuario utilzando cookies. 

- Agregamos un nuevo archivo con rutas utilizando las cookies como memoria de almacenamiento de datos segun la informacion recibida desde el front, como por ejemplo, el inicio de sesion de un usuario ya existente en nuestra base de datos (DB), o el registro de un nuevo usuario.

- Logramos condicionar las vistas para que se rendericen segun las sesiones activas y asi mejorar la experiencia de usuario. Ejemplo de esto, es nuestro 'NavBar' el cual se renderiza con opcion de "login" si el usuario no ha iniciado sesion, o la muestra del boton del carrito o "signout" si tiene una sesion activa. 

- Asimismo el perfil de un usuario y su carrito (si existe) se renderizan en funcion a la sesion iniciada. 

- Tambien se agregaron nuevos middlewares de autenticacion para verificar que el email y contrasenia coincidan segun lo registrado en la DB, y nuevos middlewares para validar que los datos agregados al momento de registrar un nuevo usuario no existan en la DB. 
>>>>>>> 1426f7f4e4ffd999aa3faa62f700b16383b255e5

- Finalmente, creamos un nuevo metodo al Manager generico de mongo: "ReadByEmail", el cual utilizamos para generar el incio de sesion correcto de un usuario segun el email registrado. Este mismo metodo tambien fue creado en el manager correspondiente a usuarios segun la persistencia (FS o Memory)

**IMPORTANTE**

Como ya estamos avanzando con la siguiente entrega, las contraseñas de los usuarios estan hasheadas, por lo que recomendamos crear un nuevo registro para que no haga conflicto en validacion de password. igualmente, tenemos un usuario sin contraseña hasheada con los siguientes datos para el inicio de sesion:

- email: prueba1@coder.com
  -contraseña: hola1213

**DESAFIO ENTREGABLE "SPRINT7"**

En esta entrega hemos implementado el generador de estrategias de "Passport" el cual fue utilizado como middleware para hacer de nuestro codigo mas eficiente, limpio y estructurado.

Se crearon 2 estrategias de autenticacion y autorizacion: "Login y Register", con las cuales aseguramos la eficiencia de nuestro proyecto de e-commerce y delegando funcionalidades.

Tambien se implemento el uso de la biblioteca "Bcrypt" que nos ayuda a mantener la seguridad y privacidad de nuestros clientes mediante el haseo de contraseñas. Adicionalmente hicimos correccion al middleware "password" para autenticar y verificar las contraseñas almacenadas con las recibidas desde el front mediante el uso de "VerifyHash".

Para probar nuestro proyecto pueden crear un usuario libremente el cual sera almacenado en nuestra base de datos con la contraseña protegida. Podran crear un nuevo carrito y visualizar su perfil de usuario segun la sesion iniciada.
<<<<<<< HEAD
=======

**DESAFIO ENTREGABLE "SPRINT8"**
En esta entrega se agrego la generacion de tickets de compra en mongoDB mediante el uso del metodo "aggregate" de mongoose.

Tambien se agrego la nueva funcionalidad de customRouter para agilizar y optimizar el codigo mediante respuestas "automaticas" agregadas en el archivo de customRouter, las cuales nos permiten usar una sola linea de codigo dependiendo del coodigo de estado generado y la respuesta del servidor que se haya configurado.

Asimismo, dentro del customRouter hemos agregado el uso de "Policies" para la correcta autenticacion del usuario, es decir, si es usuario comun o un administrador del sitio tendra acceso a diferentes funcionalidades.
>>>>>>> 1426f7f4e4ffd999aa3faa62f700b16383b255e5
