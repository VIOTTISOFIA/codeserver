process.on("exit", (code) => {
    console.log("Justo antes de cerrarse")
    console.log(code);
  })
  
  process.on("uncaughtException", (exc) => {
    console.log("Jexcepcion no catcheada")
    console.log(exc);
  })
  
  process.on("message", (message) =>{
    console.log("cuando recibe mensaje de otro proceso");
    console.log(message);
  })
  
  Console()
  process.exit()