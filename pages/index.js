import axios from "axios";
import React from "react";
import TabsUI from "../../frontend2/components/Tabs";
import Button from "@mui/material/Button";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import styles from "../styles/Hover.module.css";
import { supabase } from "../../frontend2/utils/SupabaseClient";
import { useRouter } from "next/router";
import ScrollUI from "../components/scroll";
import useSWR from "swr";
import Divider from "@mui/material/Divider";
import LogoutIcon from "@mui/icons-material/Logout";

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
            }}
            className={styles.hovering}
            onClick={() => {
              setModal(true);
            }}
          >
            Compose
          </Button>
          <Button
            variant="contained"
            startIcon={<LogoutIcon />}
            style={{
              width: "200px",
              height: "50px",
              borderRadius: "30px",
              float: "right",
            }}
            className={styles.hovering2}
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
