import { useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import PopUp from './components/PopUp.jsx';
import Layout from './components/Layout.jsx';
import TasksZone from './components/TasksZone.jsx';

function index() {
  const { tasks, errors } = usePage().props; {/* O usePage vai buscar os dados enviados pelo Controller, no caso tasks é a task que fui buscar e o errors é os erros da validação */}
  const [newTask, setNewTask] = useState(''); {/* Variável para armazenar a nova tarefa */}
  const [editTask, setEditTask] = useState(''); {/* Variável para armazenar a tarefa editada */}
  const [idTask, setIdTask] = useState(0); {/* Variável que vai conter o id para saber qual task a editar ou eliminar */}
  const [popUpVisible, setPopUpVisible] = useState(false); {/* Variável que vai decidir e o PopUp deve ou não ser mostrado, ao clicar para ver */}
  const [typePopUp, setTypePopUp] = useState('Update'); {/* Variável que vai decidir o tipo de modal, se é de editar ou eliminar, e mete por default o Update */}
  
  {/* Função para adicionar a Task */}
  function addTask(e) {
	e.preventDefault(); {/* Previne o Reload da página */}
	router.post('/addTask', {'task': newTask}); {/* Envia via POST os dados para o Controller, têm de se específicar o campo da validação como o campo task */}
	setNewTask(''); {/* Reseta a caixa de texto depois que cria a tarefa */}
  }
  
  return (
	<div>
	  {popUpVisible && (
		/* Passo o setPopUpVisible para ele atualizar quando for para fechar */
	    <PopUp visible={setPopUpVisible} type={typePopUp} task={editTask} id={idTask} />
	  )}
	  <Layout>
	    {/* Título da página */}
	    <h1 className="text-center text-3xl font-bold">ToDo List</h1>
	    <div className="relative">
		  {/* Caixa de texto para adicionar task */}
		  <input type="text" name="task" placeholder="Add your task..." value={newTask} onChange={(e) => setNewTask(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && addTask(e)} className="min-w-full rounded-md border-2 border-[#ADADA3] p-2 pr-23" />
		  {/* Botão de criar task com o ícone de adicionar */}
		  <button onClick={(e) => addTask(e)} className="w-20 bg-[#03AC13] text-white text-lg font-medium rounded-md border absolute top-0.5 right-0.5 px-2 py-1 cursor-pointer">
		    <p>Add</p>
		  </button>
		  {/* Zona da validação, a variável errors é o erro da validação que recebo do controller com o usePage */}
		  {errors.task && (
			<p className="text-red-500 pl-2">{errors.task}</p>
		  )}
	    </div>
		{/* Zona de tasks não completas */}
	    <TasksZone visible={setPopUpVisible} type={setTypePopUp} completed={false} tasks={tasks.filter((task) => !task.completed)} editTask={setEditTask} id={setIdTask} />
	    {/* Zona de tasks completas */}
		<TasksZone visible={setPopUpVisible} type={setTypePopUp} completed={true} tasks={tasks.filter((task) => task.completed)} editTask={setEditTask} id={setIdTask} />
	  </Layout>
	</div>
  );
}

export default index;
