import { ITask } from "@/types/tasks";

const baseUrl = 'http://localhost:3001';

export const getAllToDos = async (): Promise<ITask[]> => {
    const res = await fetch(`${baseUrl}/tasks`, {cache: 'no-store'})
    const toDosList = await res.json();
    return toDosList;
}

export const addToDo = async (toDo: ITask): Promise<ITask> => {
    const res = await fetch(`${baseUrl}/tasks`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(toDo)
    })
    const newToDo = await res.json();
    return newToDo;
}