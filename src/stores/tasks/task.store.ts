import { type StateCreator, create } from "zustand";
import { v4 as uuidv4 } from 'uuid';
import { type Task, type TaskStatus } from "../../interfaces";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

// ? Immer es un paquete muy popular y poderoso. Se usará para fines educativos.
// ? Sin embargo zustand ya cuenta con un middleware que nos permite ahorrarnos
// ? instalar este paquete.
// import { produce } from 'immer'; 



interface TaskState {

    draggingTaskId?: string;
    tasks: Record<string, Task>; // { [key:string]: Task };

    getTaskByStatus: (status: TaskStatus) => Task[];
    addTask: (title: string, status: TaskStatus) => void;
    changeTaskStatusById: (taskId: string, status: TaskStatus) => void;

    setDraggingTaskId: (taskId: string) => void;
    removeDraggingTaskId: () => void;

    onTaskDrop: (status: TaskStatus) => void;

}


const storeApi: StateCreator<TaskState, [["zustand/devtools", never], ["zustand/immer", never]]> = (set, get) => ({

    draggingTaskId: undefined,
    tasks: {
        'ABC-1': {
            id: 'ABC-1',
            title: 'Task 1',
            status: 'open',
        },
        'ABC-2': {
            id: 'ABC-2',
            title: 'Task 2',
            status: 'in-progress',
        },
        'ABC-3': {
            id: 'ABC-3',
            title: 'Task 3',
            status: 'open',
        },
        'ABC-4': {
            id: 'ABC-4',
            title: 'Task 4',
            status: 'open',
        },

    },

    getTaskByStatus: (status) => {
        return Object.values(get().tasks).filter(task => task.status === status);
    },

    addTask: (title: string, status: TaskStatus) => {

        const newTask = { id: uuidv4(), title, status };

        // ? Requiere middlare immer incluido en Zustand
        set( state => {
            state.tasks[newTask.id] = newTask;
        });

        // ? Requiere npm install immer
        // set(
        //     produce(
        //         (state: TaskState ) => {
        //             state.tasks[newTask.id] = newTask;
        //         }
        //     )
        // );

        // ? Forma nativa de Zustand
        // set(state => ({
        //     tasks: {
        //         ...state.tasks,
        //         [newTask.id]: newTask
        //     }
        // }))
    },

    changeTaskStatusById: (taskId, status) => {
        // console.log(taskId, status);

        set( state => {
            state.tasks[taskId].status = status;
        });
        
        // set( 
        //     produce(
        //         (state: TaskState) => {
        //             state.tasks[taskId].status = status;
        //         }
        //     ) 
        // );

        // set((state ) => ({
        //     tasks: { 
        //         ...state.tasks,
        //         [taskId]: {
        //             ...state.tasks[taskId],
        //             status,
        //         }
        //     }
        // }));
    },

    setDraggingTaskId: (taskId) => set({ draggingTaskId: taskId }, false, 'setDraggingTaskId'),
    removeDraggingTaskId: () => set({ draggingTaskId: undefined }, false, 'removeDraggingTaskId'),

    onTaskDrop: (status: TaskStatus) => {
        const taskId = get().draggingTaskId;
        if (taskId) {
            get().changeTaskStatusById(taskId, status);
            get().removeDraggingTaskId();
        }
    }
});


export const useTaskStore = create<TaskState>()(
    devtools(
        persist(
            immer(storeApi), 
            { name: 'task-store' }
        )
    )
);
