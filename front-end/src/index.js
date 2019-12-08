import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import WordGenerator from './Components/WordGenerator';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
<WordGenerator />, 
document.getElementById('root'));

serviceWorker.unregister();
