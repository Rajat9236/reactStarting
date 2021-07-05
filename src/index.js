import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

function initialize() {
	let widget = document.getElementById('searchunify-chatbot');

	if (!widget) {
		widget = document.createElement('div');
		widget.id = 'searchunify-chatbot';
		document.body.appendChild(widget);
	}

	// Render the main component into the dom
	ReactDOM.render(<App />, document.getElementById('searchunify-chatbot'));
}

window.onload = initialize;