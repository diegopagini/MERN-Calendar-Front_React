/** @format */

import { types } from '../types/types';
import moment from 'moment';

const initialSate = {
	events: [
		{
			title: 'Cumpleaños del jefe',
			start: moment().toDate(),
			end: moment().add(2, 'hours').toDate(),
			bgcolor: '#fafafa',
			notes: 'Comprar el pastel',
			user: {
				_id: '123',
				name: 'Diego',
			},
		},
	],
	activeEvent: null,
};

export const calendarReducer = (state = initialSate, action) => {
	switch (action.type) {
		case types.eventSetActive:
			return {
				...state,
				activeEvent: action.payload,
			};

		default:
			return state;
	}
};
