import { useEffect, useState, useContext } from 'react'
import Box from '@mui/material/Box';
import { UserContext } from '../context/UserContext';
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';


const style = {
  width: '80%',
  maxWidth: 300,
  borderRadius: '15px',
  backgroundColor: '#FCEEB1',
  m: '10px',
  p: '8px',
  textAlign: "center",
  fontSize: {
    xs: '18px',
    sm: '22px',
    md: '30px',
  },
  color: "#707070"
}

export default function Stats() {
  const userContext = useContext(UserContext)
  const [taskCompleted, setTaskCompleted] = useState<number>(0);
  const [taskWaiting, setTaskWaiting] = useState<number>(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (userContext.userTasks) {
      // Filter userTasks to find tasks with a length greater than 6 characters

      // Count the number of completed and waiting tasks
      const completedTasks = userContext.userTasks.filter((task) => task.completed);
      const waitingTasks = userContext.userTasks.filter((task) => !task.completed);

      // Update the state variables
      setTaskCompleted(completedTasks.length);
      setTaskWaiting(waitingTasks.length);
      if (userContext.userTasks.length > 0) {
        const completedPercentage = (completedTasks.length / userContext.userTasks.length) * 100;
        setProgress(completedPercentage);
      } else {
        setProgress(0); 
      }
    }
  }, [userContext]);

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: { xs: 'column', sm: 'row' },
      justifyContent: 'center',
      alignItems: 'center',
      m: 3
    }}>
      <Box sx={style}>Done : {taskCompleted} </Box>
      <Box sx={style}>Waiting : {taskWaiting} </Box>
      <Box sx={style}>Total : {taskCompleted + taskWaiting} </Box>
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress color="secondary" size={60} variant="determinate" value={progress} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="caption"
            component="div"
            color="text.secondary"
            style={{ fontSize: '17px' }} 
          >{`${Math.round(progress)}%`}</Typography>
        </Box>
      </Box>
    </Box>
  )
}
