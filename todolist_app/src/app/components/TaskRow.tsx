'use client';

import { ITask } from "@/types/tasks";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { TfiTrash } from "react-icons/tfi";
import EditTaskModal from "./EditTaskModal";
import DeleteTaskModal from "./DeleteTaskModal";

interface TaskProps {
    task: ITask;
}

const TaskRow = ({ task }: TaskProps) => {
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    return (
        <tr>
            <th></th>
            <td className="w-full">{task.task_text}</td>
            <td className="flex gap-6">
                <button
                    onClick={() => setOpenEdit(true)}
                    aria-label="Editar tarefa"
                    title="Editar"
                >
                    <FiEdit size={17} className="text-blue-400 cursor-pointer" />
                </button>

                <EditTaskModal
                    task={task}
                    isOpen={openEdit}
                    onClose={() => setOpenEdit(false)}
                />
                <button
                    onClick={() => setOpenDelete(true)}
                    aria-label="Excluir tarefa"
                    title="Excluir"
                >
                    <TfiTrash size={20} className="text-red-500 cursor-pointer" />
                </button>
                <DeleteTaskModal
                    taskId={task.id}
                    isOpen={openDelete}
                    onClose={() => setOpenDelete(false)}
                />
            </td>
        </tr>
    );
};

export default TaskRow;
