import React from "react";
import styles from "./SideBlock.module.scss";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

export const SideBlock = ({ title, children }) => {
  return (
    <Paper
      classes={{ root: styles.root }}
      style={{
        backgroundColor: 'rgb(31, 41, 55)',
        border: '2px solid #dedede', 
      }}
    >
      <Typography variant="h6" classes={{ root: styles.title }} style={{ color: '#fff' }}>
        {title}
      </Typography>
      {children}
    </Paper>
  );
};