import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { DashboardContainer } from './app/dashboard/dashboard.container';

class LaundryApp extends React.Component {
	render() {
		return (
			<DashboardContainer />
		);
	}
}
  
ReactDOM.render(
	<LaundryApp />,
	document.getElementById('root'),
);
