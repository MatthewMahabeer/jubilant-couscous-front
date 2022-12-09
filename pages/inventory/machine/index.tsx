import { useRef, useState, useCallback, useEffect } from "react";
import AddMachine from "./add";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  ClickAwayListener,
  Fab,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "../../../styles/Utilities.module.scss";
import { tokens } from "../../../utils/theme";
import { getBrands, createBrand } from "../../../utils/apiCalls";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import type { Brand } from "../../../utils/types/inventory";
import { isEmpty } from "lodash";

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

type BrandSelectedComponentProps = {
  brand: {
    id: number;
    name: string;
  };
  selected: boolean;
  onClick: () => void;
};

const BrandSelectionComponent = ({
  brand,
  selected,
  onClick,
}: BrandSelectedComponentProps) => {
  return (
    <Button
      variant={selected ? "contained" : "outlined"}
      key={brand.id}
      sx={{
        display: "inline-flex",
        marginLeft: 1.2,
        overflow: "auto",
        mt: 1,
      }}
      onClick={() => {
        onClick();
      }}
    >
      {brand.name}
    </Button>
  );
};

const Machine = () => {
  const [showAddMachineModal, setShowAddMachineModal] = useState(false);
  const [addBrand, setAddBrand] = useState(false);
  const [brandSelected, setBrandSelected] = useState("");
  const [brandName, setBrandName] = useState("");
  const queryClient = useQueryClient();
  const {
    data: brandList,
    isLoading,
    error,
    isError,
  } = useQuery<Brand[]>(["brands"], getBrands, {
    enabled: showAddMachineModal,
  });

  const createBrandMutation = useMutation(createBrand, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
  });

  return (
    <div className="machine">
      <div className="add-machine-button">
        <Button variant="outlined" onClick={() => setShowAddMachineModal(true)}>
          Add Machine
        </Button>
      </div>
      <Modal
        open={showAddMachineModal}
        onClose={() => {
          setShowAddMachineModal(!showAddMachineModal);
          setBrandSelected("");
          setAddBrand(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box justifyContent="space-between" display="flex">
            <Typography
              id="modal-modal-title"
              variant="h4"
              component="h2"
              mr={3}
            >
              Select a brand or optionally create a new one
            </Typography>

            <Button
              onClick={() => {
                setAddBrand(!addBrand);
                setBrandSelected("");
                queryClient.invalidateQueries({ queryKey: ["brands"] });
              }}
              sx={{
                display: "inline-flex",
                marginLeft: 1.2,
                overflow: "auto",
              }}
            >
              {addBrand ? "Cancel" : "Add Brand"}
            </Button>
          </Box>
          {isLoading ? (
            <Box display="flex" justifyContent="center" mt={3}>
              <CircularProgress />
            </Box>
          ) : (
            <Box sx={{ mt: 2, width: "30rem" }}>
              {brandList?.map((brand) => (
                <BrandSelectionComponent
                  key={brand.id}
                  onClick={() => {
                    setBrandSelected(brand.name);
                    setAddBrand(false);
                  }}
                  brand={brand}
                  selected={brandSelected == brand.name}
                />
              ))}
            </Box>
          )}
          {brandSelected && (
            <Box display="flex" width="100%" sx={{ mt: 3 }}>
              <Button sx={{ ml: "auto", mr: 3 }} variant="contained">
                <Typography>Next</Typography>
              </Button>
            </Box>
          )}
          {addBrand && (
            <div>
              <Box
                width="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ mt: 4 }}
              >
                <TextField
                  id="outlined-basic"
                  label="Brand Name"
                  variant="outlined"
                  size="small"
                  onChange={(e) => setBrandName(e.target.value)}
                />
              </Box>
              {!isEmpty(brandName) && (
                <Box mt={2} display="flex" width="100%" justifyContent="center">
                  <Button
                    variant="contained"
                    onClick={() => {
                      createBrandMutation.mutate(brandName);
                      setAddBrand(false);
                      setBrandName("");
                    }}
                  >
                    <Typography>Add Brand</Typography>
                  </Button>
                </Box>
              )}
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Machine;
