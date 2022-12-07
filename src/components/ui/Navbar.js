/** @format */
import React from 'react';
import { Offline, Online } from 'react-detect-offline';
import { useDispatch, useSelector } from 'react-redux';

import { startLogout } from '../../actions/auth';

export const Navbar = () => {
	const { name } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(startLogout());
	};

	return (
		<div className='navbar navbar-dark bg-dark mb-4'>
			<span className='navbar-brand'>{name}</span>

			<Online>
				<span className='text-success'>Online</span>
			</Online>
			<Offline>
				<span className='text-danger'>Offline</span>
			</Offline>

			<button onClick={handleLogout} className='btn btn-outline-danger'>
				<i className='fas fa-sign-out-alt'></i>
				<span> Salir</span>
			</button>
		</div>
	);
};
