
import { useState } from 'react';
import Swal from 'sweetalert2';

import { useTaskStore } from '../stores';
import { TaskStatus } from '../interfaces';

interface Options {
    status: TaskStatus
}
export const useTasks = ({status}: Options) => {
    
    const tasks = useTaskStore(state => state.getTaskByStatus(status));
    const draggingTaskId = useTaskStore(state => state.draggingTaskId);
    const onTaskDrop = useTaskStore(state => state.onTaskDrop);
    const addTask = useTaskStore(state => state.addTask);


    const [isOvering, setIsOvering] = useState(false);

    const taskStatus = draggingTaskId ? tasks.find(task => task.id === draggingTaskId)?.status : null;
    const isBorderDotted = !!draggingTaskId && taskStatus !== status && !isOvering;
    const isBorderAvailable =  isOvering && taskStatus !== status;

    const handleAddNewTask = async() => {

        const {isConfirmed, value: title} = await Swal.fire({
            title: 'Nueva Tarea',
            input: 'text',
            inputLabel: 'Nombre de la tarea',
            inputPlaceholder: 'Escribe el nombre de la tarea',
            
            inputValidator: (value) => {
            if (!value) return 'Debe ingresar un nombre para la nueva tarea.'
            },
            showCancelButton: true,
            confirmButtonText: 'Crear',
            
        })

        if (!isConfirmed) return;

        addTask(title, status);
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        if (isOvering) return;
        setIsOvering(true);
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        onTaskDrop(status);
        if (!isOvering) return;
        setIsOvering(false);
    }

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        // removeDraggingTaskId();

        if (!isOvering) return;
        setIsOvering(false);
    }

    return {
        isOvering,
        tasks,
        isBorderDotted,
        isBorderAvailable,
        handleAddNewTask,
        handleDragOver,
        handleDrop,
        handleDragLeave
    }
}