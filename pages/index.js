import axios from "axios";
import React from "react";
import TabsUI from "../components/Tabs";
import Button from "@mui/material/Button";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import styles from "../styles/Hover.module.css";
import { supabase } from "../utils/SupabaseClient";
import { useRouter } from "next/router";
import ScrollUI from "../components/scroll";
import useSWR from "swr";
import Divider from "@mui/material/Divider";
import LogoutIcon from "@mui/icons-material/Logout";
import Paper from "@mui/material/Paper";

export default function Home() {
  const [msg, setMsg] = React.useState(null);
  const router = useRouter();
  const [modal, setModal] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [ham, setHam] = React.useState([]);
  const [spam, setSpam] = React.useState([]);
  const [sentE, setSentE] = React.useState([]);
  const [processing, setProcessing] = React.useState(true);

  // const { data: data } = useSWR("profileindex", checkUser);

  const modalHandler = (sta) => {
    setModal(sta);
    router.reload(window.location.pathname);
  };

  React.useEffect(() => {
    fetchTheMessages();
  }, [email]);

  React.useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const user = await supabase.auth.user();
    if (user) {
      setEmail(user.email);

      await fetchTheMessages();
      return;
    }

    if (!user) {
      router.push("/login");
    }
  }

  const fetchTheMessages = async () => {
    if (email.length == 0) return;

    const { data, error } = await supabase
      .from("email_c")
      .select()
      .order("id", { ascending: false });

    if (data) {
      console.log("datassss");
      console.log(data);
      const h = [];
      const s = [];
      const se = [];

      data &&
        data.map((item) => {
          if (item.fromu == email) {
            se.push(item);
            return;
          }
          if (item.type == 1 && item.tou == email) s.push(item);
          if (item.type == 0 && item.tou == email) h.push(item);
        });

      setHam(h);
      setSpam(s);
      setSentE(se);
      setProcessing(false);
    }
  };

  async function logOut() {
    await supabase.auth.signOut();

    router.push("/login");
  }
  return (
    <div>
      {modal && email ? (
        <ScrollUI modalHandler={modalHandler} email={email} />
      ) : null}
      <br />
      {email ? (
        <div
          style={{
            paddingLeft: "20%",
            paddingRight: "20%",
          }}
        >
          <Button
            variant="contained"
            startIcon={<AttachEmailIcon />}
            style={{
              width: "200px",
              height: "50px",
              borderRadius: "30px",
              backgroundColor: "black",
              color: "white",
            }}
            // className={styles.hovering}
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
            onClick={() => {
              setModal(true);
            }}
            id="compose"
          >
            Compose
          </Button>
          <Button
            variant="contained"
            style={{
              width: "200px",
              height: "50px",
              borderRadius: "30px",
              float: "right",
              backgroundColor: "white",
              color: "black",
              border: "solid 2px black",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "black";
              e.target.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "white";
              e.target.style.color = "black";
            }}
            // className={styles.hovering2}
            onClick={logOut}
          >
            LogOut
          </Button>
        </div>
      ) : null}
      <br />
      <Divider />
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            minWidth: "80%",
            display: "flex",
            justifyContent: "center",
            minHeight: "400px",
          }}
        >
          <TabsUI ham={ham} spam={spam} sent={sentE} processing={processing} />
        </div>
      </div>
      <Divider />
    </div>
  );
}
