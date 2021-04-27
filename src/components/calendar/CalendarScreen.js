/** @format */

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/es';
import { messages } from '../../helpers/calendar-messages-es';
import { Navbar } from '../ui/Navbar';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { uiOpenModal } from '../../actions/ui';
import { eventSetActive } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';

moment.locale('es');

const localizer = momentLocalizer(moment);
const events = [
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
];

export const CalendarScreen = () => {
	const dispatch = useDispatch();

	const [lastView, setLastView] = useState(
		localStorage.getItem('lastView') || 'month'
	);

	const onDoubleClick = (e) => {
		dispatch(uiOpenModal());
	};

	const onSelectEvent = (e) => {
		dispatch(eventSetActive(e));
		dispatch(uiOpenModal());
	};

	const onViewChange = (e) => {
		setLastView(e);
		localStorage.setItem('lastView', e);
	};

	const eventStyleGetter = (event, start, end, isSelected) => {
		const style = {
			backgroundColor: '#367cf7',
			bordeRadius: '0px',
			opacity: 0.8,
			display: 'block',
			color: 'white',
		};
		return {
			style,
		};
	};

	return (
		<div className='calendar-screen'>
			<Navbar />
			<Calendar
				localizer={localizer}
				events={events}
				startAccessor='start'
				endAccessor='end'
				messages={messages}
				eventPropGetter={eventStyleGetter}
				onDoubleClickEvent={onDoubleClick}
				onSelectEvent={onSelectEvent}
				onView={onViewChange}
				view={lastView}
				components={{
					event: CalendarEvent,
				}}
			/>

			<AddNewFab />

			<CalendarModal />
		</div>
	);
};
