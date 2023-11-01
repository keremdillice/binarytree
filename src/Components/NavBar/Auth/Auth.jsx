import React from "react";
import "./Auth.css";

export default function Auth() {
  const [active, setActive] = React.useState(false);
  const [isRegister, setIsRegister] = React.useState(false);

  return (
    <div className="auth">
      <div className="auth-button">
        <button
          onClick={() => {
            setActive(!active);
          }}
        >
          Login / Register
        </button>
        {active && (
          <div className="auth-popup">
            <div
              className="auth-close"
              onClick={() => {
                setActive(false);
              }}
            >
              close
            </div>
            <div className="auth-title">
              {isRegister ? "Register" : "Login"}
              <span
                onClick={() => {
                  setIsRegister(!isRegister);
                }}
              >{`or ${isRegister ? "login" : "register"} instead`}</span>
            </div>
            <form>
              <input
                type="text"
                placeholder={`${isRegister ? "Set " : ""}Username`}
              />
              <input
                type="password"
                placeholder={`${isRegister ? "Set " : ""}Password`}
              />
              <button type="submit">{isRegister ? "Register" : "Login"}</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
