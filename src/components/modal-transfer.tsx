import React from "react";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import { IconButton, Modal, dividerClasses } from '@mui/material';
import { GiPayMoney } from 'react-icons/gi';
import useTransfer from "@/hooks/useTransfer";
import Input from "./input";
import Button from "./button";
import Spinner from "./spinner";
import InputGroup from "./input-group";
import { inputMoneyMask } from "@/utils/masks";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '.5rem'
};

const ModalTransfer = ({ userId }: { userId: string }) => {
  const { handleTransfer, handleChange, handleBlur, form, errors, loading } = useTransfer({ amount: 0 })
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <IconButton onClick={handleOpen}>
        <GiPayMoney color="#3C8D2F" />
      </IconButton>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <h2 className="font-bold text-2xl">Revisar dados</h2>
            <form onSubmit={(e) => {
              handleTransfer(e, userId)
              handleClose()
            }}>
              <InputGroup
                label="Valor"
                name="amount"
                value={inputMoneyMask(form.amount)}
                onBlur={handleBlur}
                onChange={handleChange}
                error={errors?.amount}
                Group={
                  <div className="rounded-r-md bg-blue-500">
                    <Button type="submit" disabled={loading}>{loading ? <Spinner /> : 'Confirmar'}</Button>
                  </div>
                }
              />
            </form>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default ModalTransfer;