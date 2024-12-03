import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

import List from "@mui/material/List";

import PersonIcon from "@mui/icons-material/Person";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
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

        <ListItemButton
          component={Link}
          to="/add-customer"
          onClick={() => setOpen(false)}
        >
          <ListItemIcon>
            <PersonAddIcon />
          </ListItemIcon>
          <ListItemText primary="Add Customer" />
        </ListItemButton>
      </List>
    </>
  );
}
