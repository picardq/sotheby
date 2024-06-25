import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TagIcon from "@mui/icons-material/Tag";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";
import { SideBlock } from "./SideBlock";
import styles from "./TagsBlock.module.scss";

export const TagsBlock = ({ items, isLoading = true, onTagClick }) => {
  return (
    <SideBlock title="Tags">
      <List>
        {(isLoading ? [...Array(5)] : items).map((name, i) => (
          <button
            key={i}
            onClick={() => onTagClick(name)}
            className={`${styles.tag} rounded-lg transition duration-300`}
            style={{ border: 'none', background: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}
          >
            <ListItem disablePadding>
              <ListItemButton disableRipple classes={{ root: styles.listItemButton }}>
                <ListItemIcon>
                  <TagIcon style={{ color: '#fff' }} />
                </ListItemIcon>
                {isLoading ? (
                  <Skeleton width={100} />
                ) : (
                  <ListItemText primary={name} />
                )}
              </ListItemButton>
            </ListItem>
          </button>
        ))}
      </List>
    </SideBlock>
  );
};
