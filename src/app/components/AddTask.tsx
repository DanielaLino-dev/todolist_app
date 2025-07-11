'use client';

import { PiPlusBold } from 'react-icons/pi';
import ModalNewTask from './ModalNewTask';
import { FormEventHandler, useState } from 'react';
import { addToDo } from '@/api/api';
import { useRouter } from 'next/navigation';

const AddTask = () => {
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState(false);
    const [newTaskValue, setNewTaskValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        if (!newTaskValue.trim()) {
            setErrorMessage("A tarefa não pode estar vazia.");
            return;
        }

        await addToDo({ id: String(Date.now()), task_text: newTaskValue });
        setNewTaskValue('');
        setModalOpen(false);
        setErrorMessage('');
        router.refresh();
    };

    return (
        <div>
            <button
                onClick={() => setModalOpen(true)}
                className="btn btn-primary w-full"
                aria-label="Adicionar nova tarefa"
            >
                ADICIONAR NOVA TAREFA
                <PiPlusBold size={13} />
            </button>
            <ModalNewTask modalOpen={modalOpen} setModalOpen={setModalOpen}>
                <form onSubmit={handleSubmitNewTodo} className="gap-5 flex flex-col">
                    <h3 className="font-bold text-lg flex justify-center pb-7">Adicionar nova tarefa</h3>



                    <div className="modal-action mt-0 flex justify-between">
                        <input
                            value={newTaskValue}
                            onChange={(e) => {
                                setNewTaskValue(e.target.value);
                                if (errorMessage) setErrorMessage('');
                            }}
                            type="text"
                            placeholder="Digite uma nova tarefa"
                            className="input input-ghost w-full max-w-xs p-0.5"
                        />
                        <button type="submit" className="btn btn-soft btn-success">Salvar</button>
                    </div>
                </form>
            </ModalNewTask>
            {errorMessage && (
                <div role="alert" className="alert alert-error mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{errorMessage}</span>
                </div>
            )}
        </div>
    );
};

export default AddTask;
