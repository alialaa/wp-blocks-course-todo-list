import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';
import save from './save';
import { __ } from '@wordpress/i18n';

registerBlockType('blocks-course/todo-list', {
	title: __('To Do List', 'blocks-course-todo-list'),
	description: __(
		'Display and edit todos in the data store.',
		'blocks-course-todo-list'
	),
	edit: Edit,
	save,
});
