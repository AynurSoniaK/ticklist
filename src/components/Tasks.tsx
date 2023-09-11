import React, { useContext, useState } from 'react'
import { app, db } from "../firebase"
import { collection, addDoc } from "firebase/firestore"
import { UserContext } from '../context/UserContext';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add'; import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid';
import EditNoteIcon from '@mui/icons-material/EditNote';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '20px',
  textAlign: "center"
};

export const Tasks: React.FC = () => {

  const userContext = useContext(UserContext)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false);

  const initialFormTask = {
    title: "",
    user: userContext.user?.uid,
    note: "",
    createdAt: new Date(),
    dueDate: "",
    urgent: false,
    completed: false
  };

  const [formTask, setFormTask] = useState(initialFormTask);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormTask({
      ...formTask,
      [name]: value,
    });
  };

  const [checked, setChecked] = React.useState(false);

  const handleChangeStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormTask({
      ...formTask,
      urgent: event.target.checked,
    });
  };

  console.log(formTask, "formTask")
  async function addTasks(): Promise<void> {
    setOpen(true)
    try {
      const docRef = await addDoc(collection(db, "tasks"), {
        title: "Ada",
        user: userContext.user?.uid,
        description: "test",
        dueDate: "",
        priority: "high",
        completed: "false"
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <Container>
      <Box color="secondary">
        <Typography variant={'h5'} component={'h1'} p={2}>Today tasks
        </Typography>
        <Grid container spacing={1} display="flex" justifyContent='space-evenly'>
          <Grid className='gradient-border' m={1} p={2} xs={12} sm={5.5} display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <Checkbox
              checked={checked}
              onChange={handleChangeStatus}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            <Typography variant="body1">Appeler X</Typography>
            <EditNoteIcon fontSize="large" />
          </Grid>
          <Grid className='gradient-border' m={1} p={2} xs={12} sm={5.5} display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <Checkbox
              checked={checked}
              onChange={handleChangeStatus}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            <Typography variant="body1">Appeler X</Typography>
            <EditNoteIcon fontSize="large" />
          </Grid>
        </Grid>
      </Box>
      <Tooltip title="Add task">
        <div className='addIconContainer'>
          <IconButton onClick={handleOpen}>
            <AddIcon fontSize="large" />
          </IconButton>
        </div>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant={'h4'} component={'h1'} p={3}>Add task</Typography>
          <form>
            <Box marginBottom={3}>
              <TextField
                placeholder="What task ?"
                variant="outlined"
                InputProps={{ sx: { borderRadius: 5 } }}
                value={formTask.title}
                onChange={handleInputChange}
                name="title"
                autoComplete="off"
              />
            </Box>
            <Box marginBottom={3}>
              <TextField
                placeholder="Add a note ?"
                type="description"
                variant="outlined"
                InputProps={{ sx: { borderRadius: 5 } }}
                value={formTask.note}
                onChange={handleInputChange}
                name="description"
                autoComplete="off"
              />
            </Box>
            <Box marginBottom={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="urgent"
                    checked={formTask.urgent}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                }
                label="Urgent"
              />
            </Box>
          </form>
          <Box margin={3}>
            <Button variant="contained" color="primary" className='button-gradient' sx={{ p: "10px 20px", borderRadius: "20px" }} onClick={addTasks}>
              create a new task
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>

  )
}
