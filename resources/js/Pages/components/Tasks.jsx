import { router } from '@inertiajs/react';

function Tasks(props) {
  function toggleCompleted(e, task) {
	e.preventDefault();
	task.completed = !task.completed; {/* O ! vai servir como toggle, para se for true fica false e se for false fica true */}
	router.put(`/${task.id}/toggle`, task, {preserveScroll: true});
  }
  
  function openPopUp(type, value, id) {
	props.visible(true); {/* Mete o setTaskVisible a true para mostrar o PopUp */}
	props.type(type); {/* Específica o tipo de PopUp para ser aberto */}
	props.editTask(value); {/* Manda o valor original da task para não ter que preencher de novo a caixa de texto */}
	props.id(id); {/* Muda o setIdTask para saber qual task editar ou eliminar */}
  }
  
  return (
	<ul>
	  {props.tasks.map((task) => (
        <li key={task.id}>
		  {/* Se for tarefas já concluídas diminui a opacidade para dar aquele estilo de completo */}
		  <div className={`p-3 space-y-4 text-lg font-medium ${task.completed && 'opacity-50'} flex justify-between`}>
			<div className="flex space-x-2">
			  {/* Botão para meter ou tirar de concluída a tarefa, mudo a borda para verde ou cizento com base se está ou não concluída */}
			  <button onClick={(e) => toggleCompleted(e, task)} className={`w-6 h-6 border-3 rounded-full ${!task.completed ? 'border-[#C0C2C0]' : 'border-[#03AC13]'} mt-0.5 flex justify-center items-center cursor-pointer`}>
				{/* Se tiver concluida, mete o ícone do certinho */}
				{/* Não usei o && pois dava erro que não podia deixar vazio a parte do else */}
				{task.completed ? (
				  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 bg-[#03AC13] text-white rounded-full cursor-pointer">
				    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
				  </svg>
				) : (
				  <div></div>
				)}
		      </button>
			  {/* Se tiver concluída mete tracejado, e não usei o && porque dava erro que não podia retornar false na className */}
			  <p className={task.completed ? 'line-through' : ''}>{task.task}</p>
	        </div>
	        <div className="flex space-x-2">
			  {/* Botão de Editar Task para abrir o PopUp para editar */}
		      <button onClick={() => openPopUp('Update', task.task, task.id)}>
			    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 text-yellow-500 cursor-pointer">
		          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
		        </svg>
			  </button>
			  {/* Botão de Eliminar Task para abrir o PopUp para editar */}
			  <button onClick={() => openPopUp('Delete', task.task, task.id)}>
		        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 text-red-700 cursor-pointer">
		          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
		        </svg>
			  </button>
	        </div>
	      </div>
	    </li>
	  ))}
	</ul>
  );
}

export default Tasks;
