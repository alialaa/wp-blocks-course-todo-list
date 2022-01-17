import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';
import { CheckboxControl, TextControl, Button } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import './editor.scss';

export default function Edit() {
	const [newTodo, setNewTodo] = useState('');
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
						onSubmit={(e) => {
							e.preventDefault();
							if (addTodo)
								addTodo({ title: newTodo, completed: false });
						}}
						className="addtodo-form"
					>
						<TextControl
							value={newTodo}
							onChange={(v) => setNewTodo(v)}
						/>
						<Button type="submit" isPrimary>
							{__('Add Todo', 'todo-list')}
						</Button>
					</form>
				</>
			)}
		</div>
	);
}
