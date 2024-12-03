import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

import List from "@mui/material/List";

import PersonIcon from "@mui/icons-material/Person";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import TodayIcon from "@mui/icons-material/Today";
import { Link } from "react-router-dom";
//page list hold the navigation of all pages
export default function PageList({ setOpen }) {
  return (
    <>
      <List
        sx={{ width: "100%", maxWidth: 360 }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {/* customer page */}
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
        {/* trainings page */}
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
        {/* add customer page */}
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

        {/* add training page */}
        <ListItemButton
          component={Link}
          to="/add-training"
          onClick={() => setOpen(false)}
        >
          <ListItemIcon>
            <ControlPointIcon />
          </ListItemIcon>
          <ListItemText primary="Add Training" />
        </ListItemButton>
        {/* calendar page */}
        <ListItemButton
          component={Link}
          to="/calendar"
          onClick={() => setOpen(false)}
        >
          <ListItemIcon>
            <TodayIcon />
          </ListItemIcon>
          <ListItemText primary="Calendar" />
        </ListItemButton>
      </List>
    </>
  );
}
