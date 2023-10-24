import React, { useState, useEffect } from 'react';
import { app, db } from "../firebase"
import { Timestamp, doc, updateDoc } from "firebase/firestore"
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { TaskWithId } from '../types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const style = {
    textAlign: 'center',
};

const TaskDetails: React.FC = () => {
    const [taskDetails, setTaskDetails] = useState<TaskWithId | null>(null);
    const { taskDetailsString } = useParams<{ taskDetailsString: string }>();

    const navigate = useNavigate();

    useEffect(() => {
        if (taskDetailsString) {
            try {
                const taskDetailsParam = JSON.parse(decodeURIComponent(taskDetailsString)) as TaskWithId;

                // Parse and format the dueDate property
                const dueDate = new Date(taskDetailsParam.dueDate);

                // Format the dueDate as desired
                const formattedDueDate = dueDate

                // Create a new taskDetails object with the formatted dueDate
                const updatedTaskDetails = {
                    ...taskDetailsParam,
                    dueDate: formattedDueDate,
                };
                setTaskDetails(updatedTaskDetails);
            } catch (error) {
                console.error('Error parsing taskDetailsString:', error);
            }
        }
    }, [taskDetailsString]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (taskDetails) {
            const { name, value } = e.target;
            setTaskDetails(() => ({
                ...taskDetails,
                [name]: value,
            }));
        }
    };

    const handleChangeUrgent = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (taskDetails) {
            setTaskDetails(() => ({
                ...taskDetails,
                urgent: event.target.checked,
            }));
        }
    };

    const handleChangeCompleted = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (taskDetails) {
            setTaskDetails(() => ({
                ...taskDetails,
                completed: event.target.checked,
            }));
        }
    };

    const onChangeDate = (date: Date | null) => {
        if (taskDetails) {
            setTaskDetails(() => ({
                ...taskDetails,
                dueDate: date,
            }));
        }
    };

    async function updateTask(): Promise<void> {
        if (taskDetails) {
            try {
                const taskRef = doc(db, "tasks", taskDetails.id);
                await updateDoc(taskRef, taskDetails)
            } catch (e) {
                console.error("Error updating document: ", taskDetails.title)
            }
        }
        navigate("/dashboard")
    }

    return (
        <>
            {taskDetails ? (
                <Layout>
                    <Box sx={style}>
                        <Typography variant={'h4'} component={'h1'} p={3}>
                            Task details
                        </Typography>
                        <form>
                            <Box marginBottom={3}>
                                <TextField
                                    label="Label"
                                    placeholder="What task ?"
                                    variant="outlined"
                                    InputProps={{ sx: { borderRadius: 5 } }}
                                    value={taskDetails.title}
                                    onChange={handleInputChange}
                                    name="title"
                                    autoComplete="off"
                                />
                            </Box>
                            <Box marginBottom={3}>
                                <TextField
                                    label="Note"
                                    placeholder="Add a note ?"
                                    type="note"
                                    variant="outlined"
                                    InputProps={{ sx: { borderRadius: 5, width: '100%', height: '150px', alignItems: 'start' } }}
                                    value={taskDetails.note}
                                    onChange={handleInputChange}
                                    name="note"
                                    autoComplete="off"
                                />
                            </Box>
                            <Box marginBottom={3}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="Due Date"
                                        value={taskDetails.dueDate && taskDetails.dueDate.toDateString() !== "Thu Jan 01 1970" ? taskDetails.dueDate : null}
                                        onChange={onChangeDate}
                                        sx={{
                                            maxWidth: '280px',
                                            '& .MuiInputLabel-root.Mui-focused': { color: '#979797' },
                                            '& .MuiOutlinedInput-root': {
                                                '&:hover > fieldset': { borderColor: '#C7C8CD' },
                                                borderRadius: '20px',
                                            },
                                        }}
                                    />
                                </LocalizationProvider>
                            </Box>
                            <Box marginBottom={3}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="urgent"
                                            checked={taskDetails.urgent}
                                            onChange={(event) => handleChangeUrgent(event)}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                    label="Urgent"
                                />
                            </Box>
                            <Box marginBottom={3}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="completed"
                                            checked={taskDetails.completed}
                                            onChange={(event) => handleChangeCompleted(event)} inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                    label="Done."
                                />
                            </Box>
                        </form>
                        <Box 
                            sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', md: 'row' }, 
                                justifyContent: 'center', 
                                alignItems: 'center',
                            }}>
                            <Button
                                variant="contained"
                                color="error"
                                sx={{ p: '10px 20px', borderRadius: '20px', marginRight: '20px', opacity: 0.8, margin: '5px' }}
                                onClick={updateTask}
                            >
                                Cancel update
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                className="button-gradient"
                                sx={{ p: '10px 20px', borderRadius: '20px' }}
                                onClick={updateTask}
                            >
                                Update task
                            </Button>
                        </Box>
                    </Box>
                </Layout>
            ) : (
                ''
            )}
        </>
    );
};

export default TaskDetails;
