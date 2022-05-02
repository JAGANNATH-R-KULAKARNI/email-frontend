import "../styles/globals.css";
import { useEffect } from "react";
import { supabase } from "../utils/SupabaseClient";
import React from "react";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import NextNProgress from "nextjs-progressbar";
import FooterUI from "../components/Footer";

function MyApp({ Component, pageProps }) {
  const [status, setStatus] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const router = useRouter();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        LoginChangeHandler(event, session);

        if (event === "SIGNED_IN") {
          setStatus(true);
        }
        if (event === "SIGNED_OUT") {
          setStatus(false);
        }
      }
    );
    checkUser();
    return () => {
      authListener.unsubscribe();
    };
  }, []);
  async function checkUser() {
    const user = await supabase.auth.user();
    if (user) {
      setStatus(true);
      setEmail(user.email);
      return;
    }

    setStatus(false);
  }

  async function LoginChangeHandler(event, session) {
    await fetch("/api/auth", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify({ event, session }),
    })
      .then((u) => {
        checkUser();
      })
      .catch((u) => {
        checkUser();
      });
  }

  async function logOut() {
    await supabase.auth.signOut();
    setStatus(false);
    router.push("/login");
  }
  const imgt =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWBDctkqW8cUhvSUdjTwWECFN7WpjuBb2R7w&usqp=CAU";

  return (
    <div
      style={
        {
          // backgroundImage: `url(${imgt})`,
          // backgroundRepeat: "no-repeat",
          // backgroundAttachment: "fixed",
          // backgroundSize: "100% 100%",
        }
      }
    >
      <NextNProgress color="black" startPosition={0.6} height={10} />
      <h1
        style={{
          textAlign: "center",
          fontSize: "70px",
          color: "black",
          marginTop: "30px",
        }}
      >
        <span style={{ paddingTop: status ? "-40px" : "0px" }}>Email </span>
        <span
          style={{
            backgroundColor: "black",
            color: "white",
            borderRadius: "30px",
            padding: "7px",
          }}
        >
          Classifier
        </span>
      </h1>
      {status && email.length > 0 ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ marginTop: "-30px" }}>
            <h4
              style={{
                textAlign: "center",
                fontSize: "10px",
              }}
            >
              {"Signed In as : "}
              <span
                style={{
                  backgroundColor: "black",
                  color: "white",
                  padding: "7px",
                  borderRadius: "20px",
                  paddingLeft: "15px",
                  paddingRight: "15px",
                }}
              >
                {" "}
                {email}
              </span>
            </h4>
          </div>
        </div>
      ) : null}

      <Component {...pageProps} />
      <div style={{ height: "40px" }}></div>
      <FooterUI />
    </div>
  );
}

export default MyApp;
