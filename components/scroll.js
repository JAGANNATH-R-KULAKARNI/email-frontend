import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import styles from "../styles/Hover.module.css";
import styles2 from "../styles/Success.module.css";
import styles3 from "../styles/Failure.module.css";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import { supabase } from "../utils/SupabaseClient";
import axios from "axios";

export default function SendEmail(props) {
  const [open, setOpen] = React.useState(true);
  const [scroll, setScroll] = React.useState("paper");
  const [to, setTo] = React.useState([]);
  const [email, setEmail] = React.useState("");
  const [text, setText] = React.useState("");
  const [sent, setSent] = React.useState(false);
  const [sent2, setSent2] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const sendTheEmail = async () => {
    if (to.length == 0) {
      alert("Enter 'TO' address");
      return;
    }

    if (text.length < 5) {
      alert("text should be atleast 5 charaters long");
      return;
    }
    setLoading(true);
    let type = 0;
    let lol = 0;

    await axios
      .post("https://email-spam-detector-1718.herokuapp.com/", {
        msg: text,
      })
      .then(async (res) => {
        console.log("ham or spam");
        console.log(res.data);
        type = res.data["result"];
      })
      .catch((err) => {
        console.log(err);
        setSent(true);
        setSent2(false);
        lol = 1;

        setTimeout(() => {
          props.modalHandler(false);
        }, 1500);
        setLoading(false);
        return;
      });

    if (lol) {
      setLoading(false);
      return;
    }
    const date = new Date();

    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;

    const finalD = [];

    to.map((item) => {
      finalD.push({
        fromu: props.email,
        tou: item,
        text: text,
        type: type,
        time: strTime,
      });
    });
    const { data, error } = await supabase.from("email_c").insert(finalD);

    if (data) {
      setSent2(true);
    }

    setSent(true);
    setLoading(false);
    setTimeout(() => {
      props.modalHandler(false);
    }, 2000);
  };

  const toHandler = () => {
    to.push(email);
    setEmail("");
    console.log(to);
  };
  const handleClose = () => {
    setOpen(false);
    props.modalHandler(false);
  };
  const handleDelete = (index) => {
    const temp = [];

    to.map((item, i) => {
      if (i != index) temp.push(item);
    });

    setTo(temp);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Dialog
        open={open}
        // onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Send Email</DialogTitle>
        <Divider />
        {sent ? (
          <div style={{ width: "600px" }}>
            {sent2 ? (
              <svg
                className={styles2.checkmark}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 52 52"
              >
                <circle
                  className={styles2.checkmark__circle}
                  cx="26"
                  cy="26"
                  r="25"
                  fill="none"
                />
                <path
                  className={styles2.checkmark__check}
                  fill="none"
                  d="M14.1 27.2l7.1 7.2 16.7-16.8"
                />
              </svg>
            ) : (
              <svg
                className={styles3.checkmark}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 52 52"
              >
                <circle
                  className={styles3.checkmark__circle}
                  cx="26"
                  cy="26"
                  r="25"
                  fill="none"
                />
                <path
                  className={styles3.checkmark__check}
                  fill="none"
                  d="M16 16 36 36 M36 16 16 36"
                />
              </svg>
            )}

            <h2
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "-30px",
                paddingBottom: "20px",
              }}
            >
              Email {sent2 ? "" : "Not"} Sent
            </h2>
          </div>
        ) : null}
        {!sent ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingLeft: "5%",
              paddingRight: "5%",
              maxWidth: "600px",
            }}
          >
            <h4 style={{ width: "10%", textAlign: "left" }}>To : </h4>
            <div style={{ width: "20px" }}></div>
            <TextField
              id="filled-basic"
              label="email"
              variant="standard"
              placeholder="jagannathrkulakarni@gmail.com"
              style={{ width: "70%", color: "black" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                input: {
                  color: "black",
                },
                "& .MuiOutlinedInput-root": {
                  "& > fieldset": {
                    borderColor: "black",
                  },
                },
                "& .MuiOutlinedInput-root:hover": {
                  "& > fieldset": {
                    borderColor: "black",
                  },
                },
                "& .MuiFormLabel-root": { color: "black", fontWeight: 100 },
              }}
            />

            <div style={{ width: "20px" }}></div>
            <Button
              style={{
                borderRadius: "20px",
                width: "100px",
                height: "40px",
                marginTop: "10px",
                backgroundColor: "white",
                color: "black",
                border: "solid 2px black",
              }}
              // className={styles.hovering2}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "black";
                e.target.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "white";
                e.target.style.color = "black";
              }}
              onClick={toHandler}
            >
              Add
            </Button>
          </div>
        ) : null}
        {!sent ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            {to &&
              to.map((item, index) => {
                return (
                  <div
                    style={{ paddingLeft: index == 0 ? "0px" : "5px" }}
                    key={item}
                  >
                    <Chip
                      label={item}
                      key={index}
                      style={{
                        fontSize: "9px",
                        backgroundColor: "white",
                        color: "black",
                        border: "solid 1px black",
                      }}
                      onDelete={() => handleDelete(index)}
                    />
                  </div>
                );
              })}
          </div>
        ) : null}

        {!sent ? <div style={{ height: "10px" }}></div> : null}
        {!sent ? <Divider /> : null}
        <div style={{ minWidth: "600px", maxWidth: "600px" }}></div>
        {!sent ? (
          <DialogContent dividers={scroll === "paper"}>
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <TextField
                id="outlined-multiline-flexible"
                label="text"
                placeholder="My name is Jagannath. Can we meet tmr ?"
                multiline
                rows={4}
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
                style={{ minWidth: "500px" }}
                sx={{
                  input: {
                    color: "black",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& > fieldset": {
                      borderColor: "black",
                    },
                  },
                  "& .MuiOutlinedInput-root:hover": {
                    "& > fieldset": {
                      borderColor: "black",
                    },
                  },
                  "& .MuiFormLabel-root": { color: "black", fontWeight: 100 },
                }}
              />
            </DialogContentText>
          </DialogContent>
        ) : null}
        {!sent ? (
          <DialogActions>
            <Button
              style={{
                borderRadius: "20px",
                width: loading ? "150px" : "100px",
                height: "40px",
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
              // className={styles.hovering}
              onClick={sendTheEmail}
            >
              {loading ? "Sending..." : "Send"}
            </Button>
            <div style={{ width: "20px" }}></div>
            <Button
              onClick={handleClose}
              style={{
                borderRadius: "20px",
                width: "100px",
                height: "35px",
                backgroundColor: "white",
                color: "black",
                border: "solid 2px black",
              }}
              // className={styles.hovering2}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "black";
                e.target.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "white";
                e.target.style.color = "black";
              }}
            >
              Discard
            </Button>
          </DialogActions>
        ) : null}
      </Dialog>
    </div>
  );
}
