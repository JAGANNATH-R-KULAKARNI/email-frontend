import React from "react";
import Grid from "@mui/material/Grid";
import styles from "../styles/Footer.module.css";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import useMediaQuery from "@mui/material/useMediaQuery";

function Footer() {
  const m1 = useMediaQuery("(min-width:430px)");

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        paddingLeft: m1 ? "10%" : "0%",
        paddingRight: "10%",
      }}
    >
      <Grid container spacing={0}>
        <Grid
          item
          xs={m1 ? 4 : 12}
          style={{
            display: "flex",
            justifyContent: m1 ? "center" : "left",
            paddingLeft: m1 ? "0%" : "12%",
          }}
        >
          <div>
            <h3 style={{ fontSize: m1 ? "20px" : "15px", color: "black" }}>
              About
            </h3>
            <p style={{ fontSize: m1 ? "15px" : "10px" }}>
              {
                '"Email Classifier" is an application used for Email spam detection and classification. This Appication is made using React.js as frontend, Flask as backend. We have used 6 Machine Learning Models'
              }
            </p>
          </div>
        </Grid>
        <Grid
          item
          xs={m1 ? 4 : 6}
          style={{ display: "flex", justifyContent: m1 ? "center" : "left" }}
        >
          <div>
            <ul
              style={{ listStyleType: "none", fontSize: m1 ? "15px" : "10px" }}
            >
              <h3
                style={{
                  fontSize: m1 ? "20px" : "15px",
                  color: "black",
                  textAlign: "center",
                }}
              >
                {" "}
                Me
              </h3>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src="/assets/jaga.png"
                  style={{ width: "200px", height: "auto" }}
                />
              </div>
            </ul>
          </div>
        </Grid>

        <Grid
          item
          xs={m1 ? 4 : 6}
          style={{ display: "flex", justifyContent: m1 ? "center" : "left" }}
        >
          <div>
            <ul
              style={{ listStyleType: "none", fontSize: m1 ? "15px" : "10px" }}
            >
              <h3
                style={{
                  fontSize: m1 ? "20px" : "15px",
                  color: "black",
                }}
              >
                {" "}
                {"Team Details"}
              </h3>
              <li className={styles.footer}>Maverics</li>
            </ul>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div style={{ display: "flex", paddingLeft: m1 ? "0%" : "12%" }}>
            <h4 className={styles.footer}>
              <a
                href=""
                passHref={true}
                target="_blank"
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontWeight: "lighter",
                  fontSize: m1 ? "15px" : "12px",
                }}
                rel="noreferrer"
              >
                Copyright?? Email Classifier
              </a>
            </h4>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Footer;
