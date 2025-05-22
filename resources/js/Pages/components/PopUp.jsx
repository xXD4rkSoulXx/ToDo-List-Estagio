import { useState } from 'react';
import { router, usePage } from '@inertiajs/react';

function PopUp(props) {
  const [editTask, setEditTask] = useState(props.task); {/* Variável que vai armazenar o que editar na task, e já vem por default a task que era originalmente para preencher automáticamente na caixa de texto */}
  const { errors } = usePage().props;
  
  function updateTask(e, id) {
	e.preventDefault();
	{/* Defino task_edit e não o campo em si para não confundir com a validação de inserir post, já que tinha o mesmo nome */}
	router.put(`/${id}/edit`, {'task_edit': editTask}, {preserveScroll: true}); {/* O preserveScroll evita que a página scroll para cima a cada ação */}
	if(editTask !== '') { /* Impede que o PopUp feche caso a task esteja vazia */
	  props.visible(false); /* Fecha o PopUp, metento a prop correspondente ao setTaskVisible a false */
	}
  }
  
  function deleteTask(e, id) {
	e.preventDefault();
	router.delete(`/${id}/delete`, null, {preserveScroll: true});
	props.visible(false);
  }
  
  return (
    <div className="absolute z-1 w-full h-full bg-black/50 flex justify-center items-center">
	  {/* Vou verificar se o PopUp é Update ou Delete, para poder reutilizar o PopUp por vários tipos */}
	  {props.type === 'Update' ? (
		<div className="w-100 bg-white p-5 space-y-20 rounded-xl">
		  <div className="space-y-10">
		    {/* Título do PopUp */}
		    <h1 className="text-center text-3xl font-bold">Edit Task</h1>
	        <div>
			  {/* Caixa de texto de editar task, com por default a task original */}
		      <input type="text" name="task" placeholder="Edit your task..." value={editTask} onChange={(e) => setEditTask(e.target.value)} className="min-w-full rounded-md border-2 border-[#ADADA3] p-2" />
			  {/* Zona de validação, para indicar que a task tem que ser preenchida obrigatóriamente, caso seja necessário dizer */}
			  {errors.task_edit && (
				<p className="text-red-500 pl-2">{errors.task_edit}</p>
			  )}
			</div>
		  </div>
		  <div className="flex justify-end space-x-0.5">
		    {/* Botão de Cancelar Editar */}
		    <button onClick={() => props.visible(false)} className="w-20 bg-red-500 text-white text-lg font-medium rounded-md border px-2 py-1 cursor-pointer">
		      <p>Cancel</p>
		    </button>
			{/* Botão de Editar Task */}
		    <button onClick={(e) => updateTask(e, props.id)} className="w-20 bg-yellow-500 text-white text-lg font-medium rounded-md border px-2 py-1 cursor-pointer">
		      <p>Edit</p>
		    </button>
		  </div>
		</div>
	  ) : (
		<div>
		  {/* Este If é desnecessário, pois se não quero editar só resta eliminar, mas o motivo de ter feito esse if é porque não sabia se ia precisar de mais tipos diferentes de PopUp, e acabei por não eliminar */}
		  {props.type == 'Delete' && (
			<div className="w-100 bg-white p-5 space-y-12 rounded-xl">
			  <div className="space-y-10">
			    {/* Título do PopUp */}
				<h1 className="text-center text-3xl font-bold">Delete Task</h1>
				{/* Mensagem do PopUp */}
				<h2 className="text-center text-xl">Are you sure do you want delete?</h2>
		      </div>
		      <div className="flex justify-end space-x-0.5">
		        {/* Botão de Cancelar Eliminar */}
				<button onClick={(e) => props.visible(false)} className="w-20 bg-red-500 text-white text-lg font-medium rounded-md border px-2 py-1 cursor-pointer">
		          <p>Cancel</p>
		        </button>
				{/* Botão de Eliminar Task */}
		        <button onClick={(e) => deleteTask(e, props.id)} className="w-20 bg-red-500 text-white text-lg font-medium rounded-md border px-2 py-1 cursor-pointer">
		          <p>Delete</p>
		        </button>
		      </div> 
		    </div>
		  )}
		</div>
	  )}
	</div>
  );
}

export default PopUp;
