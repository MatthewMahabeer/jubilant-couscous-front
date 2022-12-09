import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBrands } from "../../../utils/apiCalls";
import { Box, Typography, Modal, TextField } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  p: 4,
  bgcolor: "background.paper",
  border: "0.1px solid #000",
  borderRadius: "12px",
  boxShadow: 24,
};

const AddMachineModal = forwardRef((props, ref) => {
  const [showAddMachineModal, setShowAddMachineModal] = useState(false);

  if (!showAddMachineModal) return null;

  // const { data: brands, isLoading, error } = useQuery("brands", getBrands);

  useImperativeHandle(ref, () => ({
    openModal: () => setShowAddMachineModal(true),
    closeModal: () => setShowAddMachineModal(false),
  }));

  return (
    <Modal
      open={showAddMachineModal}
      onClose={() => setShowAddMachineModal(!showAddMachineModal)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h2" component="h2">
          Text in a modal
        </Typography>
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          sx={{ mt: 4 }}
        />
      </Box>
    </Modal>
  );
});

export default AddMachineModal;
