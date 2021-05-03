/** @format */

import React, { useEffect } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import { LoginScreen } from '../auth/LoginScreen';
import { CalendarScreen } from '../calendar/CalendarScreen';
import { useDispatch } from 'react-redux';
import { startChecking } from '../../actions/auth';

export const AppRouter = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(startChecking());
	}, [dispatch]);

	return (
		<Router>
			<div>
				<Switch>
					<Route exact path='/login' component={LoginScreen} />
					<Route exact path='/' component={CalendarScreen} />
					<Redirect to='/' />
				</Switch>
			</div>
		</Router>
	);
};
