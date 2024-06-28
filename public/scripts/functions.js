/* BOTONES NAVBAR */
//Funcion para boton SignOut
async function signOut() {
  try { 
    const response = await fetch('/api/sessions/signout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const result = await response.json();
    if (response.ok) {
      console.log(result)
      alert("Signout successful");
      location.replace("/login"); // Redirige a la página de inicio de sesión
    } else {
      alert('Error signing out');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while signing out');
  }
}

//Funcion para ocultar/mostrar barra de navegacion
async function checkSession() {
  try {
    const response = await fetch('/api/sessions/online');
    const result = await response.json();

    const userOptions = document.getElementById('user-options');
    userOptions.innerHTML = ''; // Limpia el contenido anterior

    if (response.ok && result.statusCode === 200) {
      userOptions.innerHTML = `
      <a href="/users">
          <img style="width: 55px; height: 50px;" src="https://i.postimg.cc/sfJC1FyF/user-Icon-removebg-preview.png" alt="User Widget">
        </a>
        <a href="/carts">
          <img class="mt-2" style="width: 30px; height: 30px;" src="https://i.postimg.cc/WpxgDy7n/cart-Widget.png" alt="Cart Widget">
        </a>
        <a href="#" onclick="signOut()">
          <img class="mt-2" style="width: 30px; height: 30px;" src="https://i.postimg.cc/W4Zbqh95/flecha-a-la-izquierda-del-arco.png" alt="Signout widget">
        </a>
      `;
    } else {
      userOptions.innerHTML = `
        <a href="/login">
            <img style="width: 55px; height: 50px;" src="https://i.postimg.cc/sfJC1FyF/user-Icon-removebg-preview.png" alt="User Widget">
          </a>
      `;
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
// Llama a checkSession al cargar la página
window.onload = checkSession;

/* BOTONES CARRITO */
//funcion para eliminar un producto del carrito
async function removeFromCart(cartItemId) {
  try {
    const response = await fetch(`/api/carts/${cartItemId}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      alert("Product deleted successfully");
      location.reload();
    } 
    else {
      console.error("Error on deleting product:", response.statusText);
    }
  } catch (error) {
    console.error("Error on deleting product:", error.message);
  }
}

//funcion para cancelar y vaciar el carrito 
async function destroyAll(event, user_id) {
  try{
    event.preventDefault();
    const response = await fetch(`/api/carts/cart/${user_id}`, {
      method: 'DELETE'
    });

    if(response.ok) {
      alert("Cart is empty")
      location.reload()
      
    } else {
       const error = await response.json();
      console.error("Error on cart deleting:", error.message);
    }
  } catch(error){
    console.error(error)
  }
}

//funcion para confirmar la compra y vaciar el carrito
async function checkout(event, user_id) {
  try{
    event.preventDefault();
    const response = await fetch(`/api/carts/cart/${user_id}`, {
      method: 'DELETE'
    });

    if(response.ok) {
      alert("successful purchase!")
      location.reload()
      
    } else {
       const error = await response.json();
      console.error("Error on purchase:", error.message);
    }
  } catch(error){
    console.error(error)
  }
}

//Funcion para actualizar datos del darrito
async function updateCart(event, cartItemId) {
  event.preventDefault();
  
  const quantityInput = document.getElementById(`quantity-${cartItemId}`);
  const quantity = quantityInput.value;
  try {
    const response = await fetch(`/api/carts/${cartItemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ quantity })
    });

    if (response.ok) {
      alert("UPDATED!");
      location.reload();
    } 
    else {
      console.error("Error on updating product:", response.statusText);
    }
  } catch (error) {
    console.error("Error on updating product:", error.message);
  }
}