/** @format */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/es';
import { messages } from '../../helpers/calendar-messages-es';
import { Navbar } from '../ui/Navbar';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { uiOpenModal } from '../../actions/ui';
import {
	eventSetActive,
	eventClearActiveEvent,
	eventStartLoading,
} from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeletEventFab } from '../ui/DeletEventFab';

moment.locale('es');
const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
	const dispatch = useDispatch();
	const [lastView, setLastView] = useState(
		localStorage.getItem('lastView') || 'month'
	);
	const { events, activeEvent } = useSelector((state) => state.calendar);
	const { uid } = useSelector((state) => state.auth);

	useEffect(() => {
		dispatch(eventStartLoading());
	}, [dispatch]);

	const onDoubleClick = (e) => {
		dispatch(uiOpenModal());
	};

	const onSelectEvent = (e) => {
		dispatch(eventSetActive(e));
	};

	const onViewChange = (e) => {
		setLastView(e);
		localStorage.setItem('lastView', e);
	};

	const onSelectSlot = (e) => {
		dispatch(eventClearActiveEvent());
	};

	const eventStyleGetter = (event, start, end, isSelected) => {
		const style = {
			backgroundColor: uid === event.user?._id ? '#367cf7' : '#465660',
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
				onSelectSlot={onSelectSlot}
				selectable={true}
				view={lastView}
				components={{
					event: CalendarEvent,
				}}
			/>

			<AddNewFab />
			{activeEvent && <DeletEventFab />}
			<CalendarModal />
		</div>
	);
};
