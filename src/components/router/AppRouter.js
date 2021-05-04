/** @format */

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { LoginScreen } from '../auth/LoginScreen';
import { CalendarScreen } from '../calendar/CalendarScreen';
import { useDispatch, useSelector } from 'react-redux';
import { startChecking } from '../../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {
	const dispatch = useDispatch();
	const { checking, uid } = useSelector((state) => state.auth);

	useEffect(() => {
		dispatch(startChecking());
	}, [dispatch]);

	if (checking) {
		return <h5>Espere...</h5>;
	}

	return (
		<Router>
			<div>
				<Switch>
					<PublicRoute
						exact
						path='/login'
						component={LoginScreen}
						isAuthenticated={!!uid}
					/>
					<PrivateRoute
						exact
						path='/'
						component={CalendarScreen}
						isAuthenticated={!!uid}
					/>
					<Redirect to='/' />
				</Switch>
			</div>
		</Router>
	);
};
