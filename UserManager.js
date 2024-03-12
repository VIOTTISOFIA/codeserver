class UserManager {
  static #users = [];
  create(data) {
    const user = {
      id:
        UserManager.#users.length === 0
          ? 1
          : UserManager.#users[UserManager.#users.length - 1].id + 1,
      foto: data.foto,
      email: data.email,
      password: data.password,
      role: 0,
    };
    UserManager.#users.push(user);
    console.log("usuariocreado");
  }
  read() {
    return UserManager.#users;
  }
}

const gestorDeUsuarios = new UserManager();
gestorDeUsuarios.create({
  foto: "sofia.jpg",
  email: "sofi_04_04@hotmail.com",
  password: "hola1234",
});
gestorDeUsuarios.create({
  foto: "roxana.jpg",
  email: "roxana@hotmail.com",
  password: "hola5678",
});

console.log(gestorDeUsuarios.read());
