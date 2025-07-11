'use client';

import { FormEventHandler, useEffect, useState } from 'react';
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
  const [taskText, setTaskText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setTaskText(task.task_text);
    }
  }, [task, isOpen]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!taskText.trim()) {
      alert("O texto da tarefa não pode estar vazio.");
      return;
    }

    try {
      setIsLoading(true);
      await editToDo({ id: task.id, task_text: taskText.trim() });
      router.refresh();
      onClose();
    } catch (error) {
      console.error("Erro ao editar tarefa:", error);
    } finally {
      setIsLoading(false);
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
          <button
            type="submit"
            className="btn btn-soft btn-success"
            disabled={isLoading}
          >
            {isLoading ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </form>
    </ModalNewTask>
  );
};

export default EditTaskModal;
