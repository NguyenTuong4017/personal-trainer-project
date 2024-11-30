import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { Box, DialogTitle, Drawer, IconButton } from "@mui/material";
import PageList from "./PageList";
export default function SideDrawer({ open, setOpen }) {
  return (
    <>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 250, p: 2 }}>
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon sx={{ mb: 2 }} />
          </IconButton>
          <DialogTitle sx={{ fontWeight: 1000 }}>Page List</DialogTitle>
          <PageList setOpen={setOpen}></PageList>
        </Box>
      </Drawer>
    </>
  );
}
