'use client';

import ModalNewTask from './ModalNewTask';
import { deleteToDo } from '@/api/api';
import { useRouter } from 'next/navigation';

interface DeleteTaskModalProps {
  taskId: string;
  isOpen: boolean;
  onClose: () => void;
}

const DeleteTaskModal = ({ taskId, isOpen, onClose }: DeleteTaskModalProps) => {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteToDo(taskId);
      router.refresh();
      onClose();
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
    }
  };

  return (
    <ModalNewTask modalOpen={isOpen} setModalOpen={onClose}>
      <h3 className="text-lg">Tem certeza de que quer apagar sua tarefa?</h3>
      <div className="modal-action flex gap-4">
        <button 
        className="btn btn-error" 
        aria-label='Excluir a tarefa'
        onClick={handleDelete}>Sim</button>
        <button 
        className="btn" 
        aria-label='Não excluir a tarefa'
        onClick={onClose}>Cancelar</button>
      </div>
    </ModalNewTask>
  );
};

export default DeleteTaskModal;
