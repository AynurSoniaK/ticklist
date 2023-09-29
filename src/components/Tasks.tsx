import React, { useEffect, useContext, useState, ChangeEvent } from 'react'
import { app, db } from "../firebase"
import { collection, addDoc, query, where, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore"
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
import CircularProgress from '@mui/material/CircularProgress';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from 'react-router-dom';
import { Task, TaskWithId } from '../types';


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
  const [open, setOpen] = useState<boolean>(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)
  const handleCloseDelete = () => setOpenModalDelete(false)
  const [tasksList, setTasksList] = useState<Task[]>([])
  const [tasksListReady, setTasksListReady] = useState<boolean>(false)
  const [taskToDelete, setTaskToDelete] = useState<string>("");


  const initialFormTask: Task = {
    title: "",
    user: userContext.user?.uid || "",
    note: "",
    createdAt: new Date() || "",
    dueDate: null,
    urgent: false,
    completed: false
  };

  const navigate = useNavigate();

  const navigateToTaskDetails = (taskDetails: Task) => {
    if (taskDetails) {
      const taskDetailsString = JSON.stringify(taskDetails);
      navigate(`/taskDetails/${encodeURIComponent(taskDetailsString)}`);
    }
  };

  const handleOpenDelete = (task: Task) => {
    setOpenModalDelete(true)
    if (task.id) {
      setTaskToDelete(task.id);
    }
  }

  async function deleteTask(taskToDelete: string) {
    if (taskToDelete) {
      await deleteDoc(doc(db, "tasks", taskToDelete));
      setOpenModalDelete(false)
      getTasksForUser()
    }
  };

  const [formTask, setFormTask] = useState(initialFormTask);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormTask({
      ...formTask,
      [name]: value,
    });
  };

  const handleChangeStatus = (event: React.ChangeEvent<HTMLInputElement>, i: number, task: TaskWithId) => {
    const updatedTasksList = [...tasksList];
    updatedTasksList[i] = {
      ...updatedTasksList[i],
      completed: event.target.checked,
    };
    setTasksList(updatedTasksList);
    const taskRef = doc(db, "tasks", task.id);

    updateDoc(taskRef, {
      completed: event.target.checked,
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormTask({
      ...formTask,
      urgent: event.target.checked,
    });
  };

  const onChangeDate = (date: Date | null) => {
    setFormTask({
      ...formTask,
      dueDate: date
    });
  }

  async function addTask(): Promise<void> {
    setOpen(true)
    try {
      const docRef = await addDoc(collection(db, "tasks"), {
        title: formTask.title,
        user: userContext.user?.uid,
        note: formTask.note,
        createdAt: formTask.createdAt,
        dueDate: formTask.dueDate,
        urgent: formTask.urgent,
        completed: formTask.completed
      });
      getTasksForUser()
    } catch (e) {
      console.error("Error adding document: ", e)
    }
    setOpen(false)
    setFormTask(initialFormTask)
  }

  async function getTasksForUser() {
    const userId = userContext.user?.uid
    if (userId) {
      const q = query(collection(db, "tasks"), where("user", "==", userId))
      try {
        const querySnapshot = await getDocs(q);
        const newTasksList: Task[] = []

        querySnapshot.forEach((doc) => {
          const taskId = doc.id;
          const taskData = doc.data() as Task;

          if (taskData.dueDate) {
            // Convert Timestamps to Dates
            const dueDateTimestamp = taskData.dueDate;
            const dueDate = new Date(dueDateTimestamp.seconds * 1000);
            const taskWithId = { id: taskId, ...taskData, dueDate };
            newTasksList.push(taskWithId);
          } else {
            const taskWithId = { id: taskId, ...taskData };
            newTasksList.push(taskWithId);
          }
        });

        setTasksList(newTasksList)
        setTasksListReady(true)
      } catch (error) {
        console.error("Error getting tasks:", error)
      }
    }
  }

  useEffect(() => {
    getTasksForUser()
  }, [userContext.user?.uid])


  console.log(tasksList)

  return (
    <Container>
      {tasksListReady ?
        <>
          <Box color="secondary">
            <Typography variant={'h5'} component={'h1'} p={2}>Today tasks
            </Typography>
            <Grid container spacing={1} display="flex" justifyContent='space-evenly'>
              {tasksList.map((task, i) => (
                <Grid key={i} item className='gradient-border' m={1} p={2} xs={12} sm={12} md={5.5} display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
                  <Checkbox
                    name="completed"
                    checked={task.completed}
                    onChange={(event) => handleChangeStatus(event, i, task as TaskWithId)}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                  <Typography variant="body1">{task.title}</Typography>
                  <Box>
                    <IconButton onClick={() => navigateToTaskDetails(task)}>
                      <EditNoteIcon fontSize="large" />
                    </IconButton>
                    <IconButton onClick={() => handleOpenDelete(task as TaskWithId)}>
                      <DeleteOutlinedIcon fontSize="large" />
                    </IconButton>
                  </Box>
                </Grid>
              ))}
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
                    type="note"
                    variant="outlined"
                    InputProps={{ sx: { borderRadius: 5 } }}
                    value={formTask.note}
                    onChange={handleInputChange}
                    name="note"
                    autoComplete="off"
                  />
                </Box>
                <Box marginBottom={3}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Due Date"
                      value={formTask.dueDate || null}
                      onChange={onChangeDate}
                      sx={{
                        maxWidth: "280px",
                        "& .MuiInputLabel-root.Mui-focused": { color: "#979797" },
                        "& .MuiOutlinedInput-root": {
                          "&:hover > fieldset": { borderColor: "#C7C8CD" },
                          borderRadius: "20px",
                        },
                      }} />
                  </LocalizationProvider>
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
                <Button variant="contained" color="primary" className='button-gradient' sx={{ p: "10px 20px", borderRadius: "20px" }} onClick={addTask}>
                  create a new task
                </Button>
              </Box>
            </Box>
          </Modal>
          <Modal
            open={openModalDelete}
            onClose={handleCloseDelete}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography variant={'h4'} component={'h1'} p={3}>Delete task</Typography>
              <Typography variant={'subtitle1'}>Are you sure you want to delete this task ?</Typography>
              <Box margin={3}>
                <Button
                  variant="contained"
                  color="error"
                  sx={{ p: '10px 20px', borderRadius: '20px', marginRight: '20px', opacity: 0.8, margin: '5px' }}
                  onClick={handleCloseDelete}
                >
                  Cancel
                </Button>
                <Button onClick={() => deleteTask(taskToDelete)} variant="contained" color="primary" className='button-gradient' sx={{ p: "10px 20px", borderRadius: "20px" }}>
                  delete task
                </Button>
              </Box>
            </Box>
          </Modal>
        </>
        :
        <Box sx={{ display: "flex", alignItems: 'center', justifyContent: 'center', }}>
          <CircularProgress color="secondary" sx={{ margin: "20px" }} />
        </Box>
      }
    </Container>

  )
}
