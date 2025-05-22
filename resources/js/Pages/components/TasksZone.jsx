import { useState } from 'react';
import Tasks from './Tasks.jsx';

function TasksZone(props) {
  const [taskVisible, setTaskVisible] = useState(false); {/* Variável para verificar se abro a zona das tasks ou se escondo */}
  
  return (
	<div className="min-w-full bg-white/80 rounded-xl">
	  {/* Se estiver fechado a zona das tasks, mete a borda de baixo circular, se não, mete as bordas retas para coincidir com a estética da zona das tasks */}
	  <div className={`bg-[#D9DADB] flex justify-between ${!taskVisible ? 'rounded-xl' : 'rounded-t-xl'} p-3`}>
		<div className="flex space-x-2">
		  {/* Título da zona das taks */}
		  <h2 className="text-xl font-semibold">{!props.completed ? 'Uncompleted Tasks' : 'Completed Tasks'}</h2>
		  <div className="min-w-6 w-6 h-6 bg-[#C0C2C0] mt-1 flex justify-center items-center rounded-full text-lg font-medium">
			{/* Mostrar a quantidade de tasks */}
		    {props.tasks.length}
		  </div>
		</div>
		{/* Verifico se é diferente de 0 e não faço apenas props.tasks porque a prop tasks vai sempre existir mesmo que não tenha nada, e existindo sempre retorna true, então preciso mesmo verificar se é ou não diferente de 0 para assim poder retornar algum falso */}
		{props.tasks.length !== 0 && (
		  /* Botão de fazer toggle de ser visível e não visível */
		  <button onClick={() => !taskVisible ? setTaskVisible(true) : setTaskVisible(false)}>
			{/* Com base se está visível ou não, muda o icon */}
			{!taskVisible ? (
		      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 cursor-pointer">
		        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
		      </svg>
		    ) : (
			  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 cursor-pointer">
			    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
			  </svg>
		    )}
		  </button>
		)}
	  </div>
	  {/* Zona de mostrar as tasks caso seja para ser visível */}
	  {taskVisible && (
		<div>
		  <Tasks visible={props.visible} type={props.type} tasks={props.tasks} editTask={props.editTask} id={props.id} />
		</div>
	  )}
	</div>
  );
}

export default TasksZone;
