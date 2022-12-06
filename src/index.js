/** @format */
import './styles.css';

import React from 'react';
import ReactDOM from 'react-dom';

import { CalendarApp } from './CalendarApp';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';


ReactDOM.render(<CalendarApp />, document.getElementById('root'));

serviceWorkerRegistration.register();
