/** @format */
import { fetchSinToken, fetchConToken } from '../helpers/fetch';
import { types } from '../types/types';
import Swal from 'sweetalert2';

export const startLogin = (email, password) => {
	return async (dispatch) => {
		const resp = await fetchSinToken('auth', { email, password }, 'POST');
		const body = await resp.json();

		if (body.ok) {
			localStorage.setItem('token', body.token);
			localStorage.setItem('token-init-date', new Date().getTime());

			dispatch(
				login({
					uid: body.uid,
					name: body.name,
				})
			);
		} else {
			Swal.fire('Error', body.msg, 'error');
		}
	};
};

export const startRegister = (email, password, name) => {
	return async (dispatch) => {
		const resp = await fetchSinToken(
			'auth/new',
			{ email, password, name },
			'POST'
		);
		const body = await resp.json();

		if (body.ok) {
			localStorage.setItem('token', body.token);
			localStorage.setItem('token-init-date', new Date().getTime());

			dispatch(
				login({
					uid: body.uid,
					name: body.name,
				})
			);
		} else {
			Swal.fire('Error', body.msg, 'error');
		}
	};
};

export const startChecking = () => {
	return async (dispatch) => {
		const resp = await fetchConToken('auth/renew');
		const body = await resp.json();

		if (body.ok) {
			localStorage.setItem('token', body.token);
			localStorage.setItem('token-init-date', new Date().getTime());

			dispatch(
				login({
					uid: body.uid,
					name: body.name,
				})
			);
		} else {
			dispatch(checkingFinish());
		}
	};
};

const login = (user) => ({
	type: types.authLogin,
	payload: user,
});

const checkingFinish = () => ({
	type: types.authCheckingFinish,
});

export const startLogout = () => {
	return (dispatch) => {
		localStorage.clear();
		dispatch(eventLogout());
		dispatch(logout());
	};
};

const logout = () => ({
	type: types.authLogout,
});

export const eventLogout = () => ({
	type: types.eventLogout,
});
