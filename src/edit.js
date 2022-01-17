import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';
import { CheckboxControl, TextControl, Button } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import './editor.scss';

export default function Edit() {
	const [newTodo, setNewTodo] = useState('');
	const [addingTodo, setAddingTodo] = useState(false);
	const todos = useSelect((select) => {
		const todosStore = select('blocks-course/todos');
		return todosStore && todosStore.getTodos();
	}, []);
	const actions = useDispatch('blocks-course/todos');
	const addTodo = actions && actions.addTodo;
	return (
		<div {...useBlockProps()}>
			{!todos && (
				<p>
					{__(
						'Please make sure your plugin is activated',
						'todo-list'
					)}
				</p>
			)}
			{todos && (
				<>
					<ul>
						{todos.map((todo) => (
							<li
								key={todo.id}
								className={todo.completed && 'todo-completed'}
							>
								<CheckboxControl
									label={todo.title}
									checked={todo.completed}
									onChange={(v) => console.log(v)}
								/>
							</li>
						))}
					</ul>
					<form
						onSubmit={async (e) => {
							e.preventDefault();
							if (addTodo && newTodo) {
								setAddingTodo(true);
								await addTodo(newTodo);
								setNewTodo('');
								setAddingTodo(false);
							}
						}}
						className="addtodo-form"
					>
						<TextControl
							value={newTodo}
							onChange={(v) => setNewTodo(v)}
						/>
						<Button disabled={addingTodo} type="submit" isPrimary>
							{__('Add Todo', 'todo-list')}
						</Button>
					</form>
				</>
			)}
		</div>
	);
}
