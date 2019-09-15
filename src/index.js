import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
  
class LaundryApp extends React.Component {
    render() {
        return (
        <div className="laundry">
            {"LaundryApp"}
        </div>
        );
    }
}
  
// ========================================
  
ReactDOM.render(
    <LaundryApp />,
    document.getElementById('root')
);
  