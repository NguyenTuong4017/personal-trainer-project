import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import CustomersList from "../Content/CustomersList";
import { TrainingsList } from "../Content/TrainingsList";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import PersonIcon from "@mui/icons-material/Person";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { Link, useNavigate } from "react-router-dom";

export default function PageList({ setOpen }) {
  return (
    <>
      <List
        sx={{ width: "100%", maxWidth: 360 }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton
          component={Link}
          to="/customers"
          onClick={() => setOpen(false)}
        >
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Customers" />
        </ListItemButton>

        <ListItemButton
          component={Link}
          to="/trainings"
          onClick={() => setOpen(false)}
        >
          <ListItemIcon>
            <FitnessCenterIcon />
          </ListItemIcon>
          <ListItemText primary="Trainings" />
        </ListItemButton>
      </List>
    </>
  );
}
