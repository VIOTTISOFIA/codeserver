const errors = {
    //DE ESTOS ERRORES, HAY QUE AGREGARLOS PARA EL CONTROLLER DE CARTS (LINEA 45 Y 46/55 Y 56/65 Y 66)
    sessionRequired : { message: "User session is required", statusCode: 400 },
    userID : { message: "User ID is required", statusCode: 400 },
    cartNotFound: { message: "Cart not found for user required", statusCode: 404 },

    //HAY QUE CREAR LOS ERRORES DEL CONTROLLER DE PRODUCTOS (17 Y 18/61 Y 62)
    notFound: { message: "Not found!", statusCode: 404 }, //mismo error para todos 

    //HAY QUE CREAR LOS ERRORES DEL CONTROLLER DE USUARIOS (29 Y 30/44 Y 45/80 Y 81)
    //controller de usuarios usa el "notFound" 8

    //HAY QUE CREAR LOS ERRORES DE PRODUCTOS DE FS (56 Y 57)
    //products de fs usa el "notFound" 8

    //HAY QUE CREAR LOS ERRORES DE CARTS DE FS (100 Y 101)
    //carts de fs usa el "notFound" 8

   };
   
   export default errors;


  //------------------------------------------------------------------------------------- 
   //HAY QUE CREAR LOS ERRORES DE CARTS EN MEMORY (67 Y 68)
   //HAY QUE CREAR LOS ERRORES DE PRODUCTOS EN MEMORY (82 Y 83)
   //HAY QUE CREAR LOS ERRORES DE USUARIOS EN MEMORY (108 Y 109)
   //HAY QUE CREAR LOS ERRORES DE PASSPORT (28 Y 29/61 Y 62/85 Y 86/110 Y 111)
