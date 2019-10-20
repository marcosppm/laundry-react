import React from 'react';
import ReactDOM from 'react-dom';
import './index.tsx';
import { Dashboard } from './app/dashboard/dashboard.component';

class LaundryApp extends React.Component {
	render() {
		return (
			<Dashboard />
		);
	}
}
  
ReactDOM.render(
	<LaundryApp />,
	document.getElementById('root'),
);
