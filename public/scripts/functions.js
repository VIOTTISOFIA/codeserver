//Funcion para boton SignOut
async function signOut() {
  console.log("SignOut function called"); // Depuración
  try { 
    const response = await fetch('/api/sessions/signout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log("Fetch response received"); // Depuración

    const result = await response.json();

    console.log("Fetch result:", result); // Depuración

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
        <a href="/carts/cart?user_id=${result.user_id}">
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