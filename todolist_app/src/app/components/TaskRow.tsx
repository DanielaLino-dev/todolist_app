import { ITask } from "@/types/tasks"

interface TaskProps{
    task: ITask
}

const TaskRow = ({ task }: TaskProps) => {
    return (
        <tr>
            <th></th>
            <td>{task.task_text}</td>
            <td>blue</td>
        </tr>
    )
}
export default TaskRow;