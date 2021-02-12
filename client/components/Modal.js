import * as React from 'react';
import { useForm, Controller } from "react-hook-form";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/core/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function Modal({stylesName = '', text='', service='' }) {
  const [open, setOpen] = React.useState(false);
  const [alert, setAlert] = React.useState({
    state: false,
    severity: 'success',
    message: 'Ваша заявка принята в ближайшее время с вами свяжется наш менеджер!'
  });

  const { register, handleSubmit, control, reset } = useForm();
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlert({
      state: false,
      severity: alert.severity,
      message: alert.message
    });
  };

  let disabled = false

  const onSubmit = formData => {
    if (disabled) return;
    if (
      formData.name.length === 0 ||
      formData.email.length === 0 ||
      formData.phone.length === 0
    ) {
      setAlert({
        state: true,
        severity: 'error',
        message: 'Проверьте правильность заполнения полей'
      })
      return
    }

    disabled = true;

    fetch("/api/callback", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.status === 200) {

        reset()
        setOpen(false)
        setAlert({
          state: true,
          severity: 'success',
          message: 'Ваша заявка принята в ближайшее время с вами свяжется наш менеджер!'
        })
        disabled = false;
        return

      } else {
        disabled = false
        setAlert({
          state: true,
          severity: 'error',
          message: 'Internal Server Error. Попробуйте отправить заявку позже!'
        })
        return
      }
    })
  } 

  return (
    <>
      <Snackbar 
        open={alert.state} 
        autoHideDuration={3000} 
        onClose={handleCloseAlert}
        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
      >
        <Alert onClose={handleCloseAlert} severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>

      {stylesName.length !== 0 
        ? <a className={stylesName}  onClick={handleClickOpen}>{text}</a>
        : <a onClick={handleClickOpen}>{text}</a>
      }
      <Dialog 
        open={open} 
        onClose={handleClose} 
        aria-labelledby="form-dialog-title"
        fullWidth={true}
        maxWidth={'xs'}
      >
        <DialogTitle id="form-dialog-title">Оставить заявку</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            {service.length !== 0 && 
              <input ref={register} id="service" name="service" type="hidden" value={service} />
            }
            <Controller 
              autoFocus
              as={TextField}
              required
              defaultValue=""
              control={control} 
              margin="dense"
              id="name"
              name="name"
              label="Ваше имя:"
              type="text"
              fullWidth
              variant="filled"
            />
            <Controller
              as={TextField} 
              required
              defaultValue=""
              control={control} 
              margin="dense"
              id="email"
              name="email"
              label="Ваш e-mail:"
              type="email"
              fullWidth
              variant="filled"
            />
            <Controller
              as={TextField} 
              required
              defaultValue=""
              control={control} 
              margin="dense"
              id="phone"
              name="phone"
              label="Ваше телефон:"
              type="tel"
              fullWidth
              variant="filled"
            />

            <Controller
              as={TextField} 
              defaultValue=""
              control={control} 
              margin="dense"
              id="comment"
              name="comment"
              label="Ваше сообщение:"
              multiline
              rows={4}
              fullWidth
              variant="filled"
            />
          </DialogContent>
          <DialogActions>
            <Button type="button" onClick={handleClose}>Отмена</Button>
            <Button type="submit">Оставить заявку</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}