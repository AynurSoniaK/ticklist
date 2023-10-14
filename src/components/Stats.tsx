import { useEffect, useState, useContext } from 'react'
import Box from '@mui/material/Box';
import { UserContext } from '../context/UserContext';


const style = {
    width: '80%',
    maxWidth: 300,
    borderRadius: '15px',
    backgroundColor: '#FCEEB1',
    m: '10px',
    p: '8px',
    textAlign:"center",
    fontSize: {
        xs: '18px', 
        sm: '22px', 
        md: '30px', 
      },
    color:"#707070"
}

export default function Stats() {
    const userContext = useContext(UserContext)
    const [taskCompleted, setTaskCompleted] = useState<number>(0);
    const [taskWaiting, setTaskWaiting] = useState<number>(0);

    useEffect(() => {
        if (userContext.userTasks) {
          // Filter userTasks to find tasks with a length greater than 6 characters
    
          // Count the number of completed and waiting tasks
          const completedTasks = userContext.userTasks.filter((task) => task.completed);
          const waitingTasks = userContext.userTasks.filter((task) => !task.completed);
    
          // Update the state variables
          setTaskCompleted(completedTasks.length);
          setTaskWaiting(waitingTasks.length);
        }
      }, [userContext]);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' }, 
            justifyContent: 'center', 
            alignItems: 'center',
            m:3
        }}>
            <Box sx={style}>Done : {taskCompleted} </Box>
            <Box sx={style}>Waiting : {taskWaiting} </Box>
            <Box sx={style}>Total : {taskCompleted + taskWaiting } </Box>
        </Box>
    )
}
