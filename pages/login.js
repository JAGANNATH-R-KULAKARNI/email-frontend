import React from "react";
import Button from "@mui/material/Button";
import { supabase } from "../utils/SupabaseClient";
import useSWR from "swr";
import { useRouter } from "next/router";
import styles from "../styles/Hover.module.css";

export default function Login() {
  const router = useRouter();

  React.useEffect(() => {
    fetchTheProfile();
  });

  async function fetchTheProfile() {
    const data = await supabase.auth.user();
    console.log(data);
    if (data) {
      router.push("/");
    }
  }

  async function signInWithGoogle() {
    try {
      const { user, session, error } = await supabase.auth.signIn({
        provider: "google",
      });
      if (error) throw error;

      if (user) {
        router.reload(window.location.pathname);
      }
    } catch (error) {
      console.error(error.error_description || error.message);
    }
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "170px",
        marginBottom: "150px",
      }}
    >
      {" "}
      <Button
        variant="contained"
        size="large"
        style={{
          width: "300px",
          height: "50px",
          // backgroundColor: "black",
          borderRadius: "30px",
          backgroundColor: "black",
          color: "white",
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "white";
          e.target.style.color = "black";
          e.target.style.boxShadow = "-2px 0px 7px 2px #black";
          e.target.style.border = "solid 2px black";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "black";
          e.target.style.color = "white";
        }}
        onClick={signInWithGoogle}
        className={styles.hovering}
      >
        Login
      </Button>
    </div>
  );
}
