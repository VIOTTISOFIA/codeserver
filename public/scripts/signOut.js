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
