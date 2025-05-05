import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import PageNav from "../components/PageNav.jsx";
import { useAuth } from "../contexts/FakeAuthContext.jsx"; // Asegúrate de importar correctamente

export default function Login() {
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault(); // Evita que el formulario recargue la página
    login(email, password); // Ejecuta el login
    navigate("/app"); // Redirige al usuario a /app
  }

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </main>
  );
}
