import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import styles from "../styles/Hover.module.css";
import Paper from "@mui/material/Paper";

export default function Inbox(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab
          label="Inbox"
          style={{
            color: value == 0 ? "white" : "black",
            backgroundColor: value == 0 ? "black" : "white",
            borderRadius: "40px",
            width: "200px",
            border: "solid 3px black",
          }}
        />
        <div style={{ width: "50px" }}></div>
        <Tab
          label="Spam"
          style={{
            color: value == 2 ? "white" : "black",
            backgroundColor: value == 2 ? "black" : "white",
            borderRadius: "40px",
            width: "200px",
            border: "solid 3px black",
          }}
        />
        <div style={{ width: "50px" }}></div>
        <Tab
          label="Sent"
          style={{
            color: value == 4 ? "white" : "black",
            backgroundColor: value == 4 ? "black" : "white",
            borderRadius: "40px",
            width: "200px",
            border: "solid 3px black",
          }}
        />
      </Tabs>
      <br />
      {value == 0 ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div>
            {props.ham &&
              props.ham.map((item, index) => {
                return (
                  <div>
                    <Paper
                      key={item}
                      elevation={1}
                      style={{
                        minWidth: "800px",
                        borderRadius: "50px",
                        padding: "10px",
                        paddingLeft: "30px",
                        maxWidth: "800px",
                      }}
                      className={styles.hovering2}
                    >
                      <p style={{ fontSize: "10px", marginTop: "0px" }}>
                        From :{" "}
                        <span
                          style={{
                            backgroundColor: "black",
                            color: "white",
                            padding: "5px",
                            borderRadius: "15px",
                            paddingLeft: "9px",
                            paddingRight: "9px",
                          }}
                        >
                          {item["fromu"]}
                        </span>
                        <span style={{ paddingLeft: "10px", fontSize: "13px" }}>
                          {item["created_at"].substr(0, 10)}
                        </span>
                        <span style={{ paddingLeft: "10px", fontSize: "13px" }}>
                          {item["time"]}
                        </span>
                      </p>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "-10px",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "15px",
                            width: "85%",
                            marginTop: "10px",
                          }}
                        >
                          {" "}
                          {item["text"]}
                        </p>
                      </div>
                    </Paper>
                    <div style={{ height: "10px" }}></div>
                  </div>
                );
              })}
          </div>
        </div>
      ) : null}
      {value == 2 ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div>
            {props.spam &&
              props.spam.map((item, index) => {
                return (
                  <div>
                    <Paper
                      key={item}
                      elevation={1}
                      style={{
                        minWidth: "800px",
                        borderRadius: "50px",
                        padding: "10px",
                        paddingLeft: "30px",
                        maxWidth: "800px",
                      }}
                      className={styles.hovering2}
                    >
                      <p style={{ fontSize: "10px", marginTop: "0px" }}>
                        From :{" "}
                        <span
                          style={{
                            backgroundColor: "black",
                            color: "white",
                            padding: "5px",
                            borderRadius: "15px",
                            paddingLeft: "9px",
                            paddingRight: "9px",
                          }}
                        >
                          {item["fromu"]}
                        </span>
                        <span style={{ paddingLeft: "10px", fontSize: "13px" }}>
                          {item["created_at"].substr(0, 10)}
                        </span>
                        <span style={{ paddingLeft: "10px", fontSize: "13px" }}>
                          {item["time"]}
                        </span>
                      </p>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "-10px",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "15px",
                            width: "85%",
                            marginTop: "10px",
                          }}
                        >
                          {" "}
                          {item["text"]}
                        </p>
                      </div>
                    </Paper>
                    <div style={{ height: "10px" }}></div>
                  </div>
                );
              })}
          </div>
        </div>
      ) : null}
      {value == 4 ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div>
            {props.sent &&
              props.sent.map((item, index) => {
                return (
                  <div>
                    <Paper
                      key={item}
                      elevation={1}
                      style={{
                        minWidth: "800px",
                        borderRadius: "50px",
                        padding: "10px",
                        paddingLeft: "30px",
                        maxWidth: "800px",
                      }}
                      className={styles.hovering2}
                    >
                      <p style={{ fontSize: "10px", marginTop: "0px" }}>
                        To :{" "}
                        <span
                          style={{
                            backgroundColor: "black",
                            color: "white",
                            padding: "5px",
                            borderRadius: "15px",
                            paddingLeft: "9px",
                            paddingRight: "9px",
                          }}
                        >
                          {item["tou"]}
                        </span>
                        <span style={{ paddingLeft: "10px", fontSize: "13px" }}>
                          {item["created_at"].substr(0, 10)}
                        </span>
                        <span style={{ paddingLeft: "10px", fontSize: "13px" }}>
                          {item["time"]}
                        </span>
                      </p>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "-10px",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "15px",
                            width: "85%",
                            marginTop: "10px",
                          }}
                        >
                          {" "}
                          {item["text"]}
                        </p>
                      </div>
                    </Paper>
                    <div style={{ height: "10px" }}></div>
                  </div>
                );
              })}
          </div>
        </div>
      ) : null}
      {value == 0 && props.ham.length == 0 ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h1>{props.processing ? "Wait..." : "Inbox is Empty"}</h1>
        </div>
      ) : null}
      {value == 2 && props.spam.length == 0 ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h1>{props.processing ? "Wait..." : "Spam Folder is Empty"}</h1>
        </div>
      ) : null}
      {value == 4 && props.sent.length == 0 ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h1>
            {props.processing ? "Wait..." : "You have not sent any email"}
          </h1>
        </div>
      ) : null}
    </Box>
  );
}
