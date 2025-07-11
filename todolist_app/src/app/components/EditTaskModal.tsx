'use client';

import { FormEventHandler, useState } from 'react';
import ModalNewTask from './ModalNewTask';
import { editToDo } from '@/api/api';
import { ITask } from '@/types/tasks';
import { useRouter } from 'next/navigation';

interface EditTaskModalProps {
  task: ITask;
  isOpen: boolean;
  onClose: () => void;
}

const EditTaskModal = ({ task, isOpen, onClose }: EditTaskModalProps) => {
  const [taskText, setTaskText] = useState(task.task_text);
  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      await editToDo({ id: task.id, task_text: taskText });
      router.refresh();
      onClose();
    } catch (error) {
      console.error("Erro ao editar tarefa:", error);
    }
  };

  return (
    <ModalNewTask modalOpen={isOpen} setModalOpen={onClose}>
      <form
        method="dialog"
        className="gap-5 flex flex-col"
        onSubmit={handleSubmit}
      >
        <h3 className="font-bold text-lg flex justify-center pb-7">Editar Tarefa</h3>
        <div className="modal-action mt-0 flex justify-between">
          <input
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            type="text"
            placeholder="Digite uma nova tarefa"
            className="input input-ghost w-full max-w-xs p-0.5"
          />
          <button type="submit" className="btn btn-soft btn-success">
            Salvar
          </button>
        </div>
      </form>
    </ModalNewTask>
  );
};

export default EditTaskModal;
