/** @format */

import { types } from '../types/types';

const initialSate = {
	events: [],
	activeEvent: null,
};

export const calendarReducer = (state = initialSate, action) => {
	switch (action.type) {
		case types.eventSetActive:
			return {
				...state,
				activeEvent: action.payload,
			};
		// Agregar un evento
		case types.eventAddNew:
			return {
				...state,
				events: [...state.events, action.payload],
			};

		case types.eventClearActiveEvent:
			return {
				...state,
				activeEvent: null,
			};
		// Actualizar un evento
		case types.eventUpdated:
			return {
				...state,
				events: state.events.map((e) =>
					e.id === action.payload.id ? action.payload : e
				),
			};
		// Borrar un evento
		case types.eventDeleted:
			return {
				...state,
				events: state.events.filter((e) => e.id !== state.activeEvent.id),
				activeEvent: null,
			};

		case types.eventLoaded:
			return {
				...state,
				events: [...action.payload],
			};

		default:
			return state;
	}
};
