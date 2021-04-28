/** @format */

import React from 'react';
import { useDispatch } from 'react-redux';
import { eventDeleted } from '../../actions/events';

export const DeletEventFab = () => {
	const dispatch = useDispatch();

	const handleDelete = () => {
		dispatch(eventDeleted());
	};

	return (
		<button
			className='btn btn-danger fab-danger animate__animated animate__fadeInLeft'
			onClick={handleDelete}
		>
			<i className='fas fa-trash'></i>
			<span> Borrar Evento</span>
		</button>
	);
};
