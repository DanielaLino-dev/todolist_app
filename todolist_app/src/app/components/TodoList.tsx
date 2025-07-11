import { ITask } from "@/types/tasks"
import React from "react"
import TaskRow from "./TaskRow"

interface TodoListProps {
    tasks: ITask[]
}

const TodoList = ({ tasks }: TodoListProps) => {
    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Tarefa</th>
                        <th>O que preciso fazer</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                            <TaskRow
                                key={task.id}
                                task={task} />
                    ))}

                </tbody>
            </table>
        </div>
    )
}

export default TodoList;