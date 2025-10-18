// src/pages/OAuthSuccess.jsx
import { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../../Context/StoreContext";

export default function OAuthSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const {setToken, setPublicId, setUserName } = useContext(StoreContext);

  useEffect(() => {
    const token = params.get("token");
    const publicId = params.get("publicId");
    const userName = params.get("userName");
    if (token) {
      sessionStorage.setItem("token", token);
      sessionStorage.setItem('publicId', publicId);
      sessionStorage.setItem('userName', userName);
      setToken(token);
      setPublicId(publicId);
      setUserName(userName);

      setTimeout( () => navigate("/") , 200);
    } else {
      navigate("/login");
    }
  }, [navigate, params, setToken, setPublicId, setUserName]);

  return <p>Signing you in...</p>;
}
