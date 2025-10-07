// src/pages/OAuthSuccess.jsx
import { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../../Context/StoreContext";

export default function OAuthSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const {setToken } = useContext(StoreContext);

  useEffect(() => {
    const token = params.get("token");
    if (token) {
      sessionStorage.setItem("token", token);
      setToken(token);

      navigate("/");
    } else {
      navigate("/login");
    }
  }, [navigate, params]);

  return <p>Signing you in...</p>;
}
