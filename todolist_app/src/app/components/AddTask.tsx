
'use client'

import { PiPlusBold } from "react-icons/pi";
import ModalNewTask from "./ModalNewTask";
import { FormEventHandler, useState } from "react";
import { addToDo } from "@/api/api";
import { useRouter } from 'next/navigation';

const AddTask = () => {
    const router = useRouter();
    const [ModalOpen, setModalOpen] = useState<boolean>(false);
    const [newTaskValue, setNewTaskValue] = useState('');

    const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> =
        async (e) => {
            e.preventDefault();
            await addToDo({
                id: String(Date.now()),
                task_text: newTaskValue,
            })
            console.log(1);
            
            setNewTaskValue('');
            setModalOpen(false);
            router.refresh();
        };

    return (
        <div>
            <button onClick={() => setModalOpen(true)} className="btn btn-primary w-full">
                ADICIONAR NOVA TAREFA
                <PiPlusBold size={13} />
            </button>
            <ModalNewTask
                modalOpen={ModalOpen}
                setModalOpen={setModalOpen}>
                <form
                    method="dialog"
                    className="gap-5 flex flex-col"
                    onSubmit={handleSubmitNewTodo}
                >
                    <h3 className="font-bold text-lg flex justify-center pb-7">Adicionar nova tarefa</h3>
                    <div className="modal-action mt-0 flex justify-between">
                        <input
                            value={newTaskValue}
                            onChange={(e) => setNewTaskValue(e.target.value)}
                            type="text"
                            placeholder="Digite uma nova tarefa"
                            className="input input-ghost w-full max-w-xs p-0.5" />
                        <button type="submit" className="btn btn-soft btn-success ">Salvar</button>
                    </div>
                </form>
            </ModalNewTask>
        </div>
    );
};

export default AddTask;