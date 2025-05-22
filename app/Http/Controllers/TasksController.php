<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Tasks;

class TasksController extends Controller
{
	// Não uso return redirect em nenhum para poder fazer todas as ações sem a necessidade de dar reload
	
    public function index() {
		// Ordenei por updated_at porque a meu ver era a ordenação com mais sentido, porque quando desmarco ou edito uma tarefa, significa que é a que quero focar no momento
		return Inertia::render('index', ['tasks' => Tasks::latest('updated_at')->get()]);
	}
	
	public function store() {
		$validation = request()->validate(['task' => ['required']]);
		// Não configuro o completed por já ser por default false
		Tasks::create($validation);
	}
	
	public function update(Tasks $task) {
		// Utilizei um nome diferente da base de dados, task_edit, para não dar conflito com a validação da task do inserir task, já que tinha o mesmo nome
		$validation = request()->validate(['task_edit' => ['required']]);
		
		$task->update(['task' => $validation['task_edit']]);
	}
	
	public function destroy(Tasks $task) {
		$task->delete();
	}
	
	public function toggle(Tasks $task) {
		$task->update(['completed' => request('completed')]);
	}
}
