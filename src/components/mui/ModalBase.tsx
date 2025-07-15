import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Modal from "@mui/material/Modal";
import { GridCloseIcon } from "@mui/x-data-grid";
import { type ReactNode } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  bgcolor: "background.paper",
  border: "2px solid var(--border)",
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
};

interface IBasicModal {
  children: ReactNode;
  title: string;
  open: boolean;
  onClose: () => void;
}

export default function BasicModal({
  children,
  open,
  onClose,
  title,
}: IBasicModal) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Button onClick={onClose} type="button">
          <GridCloseIcon />
        </Button>
        <h2 className="modal-title">{title}</h2>
        {children}
      </Box>
    </Modal>
  );
}
