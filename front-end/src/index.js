import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import TypingModule from './components/TypingModule';

ReactDOM.render(
<div>
    <TypingModule/>
</div>, 
document.getElementById('root'));

serviceWorker.unregister();
