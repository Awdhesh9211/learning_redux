import { createRoot } from 'react-dom/client';
import {Provider} from "react-redux";
import './index.css';
import { store } from './store';
import Todo from './components/Todo.jsx';

createRoot(document.getElementById('root')).render(
     <Provider store={store}>
      <Todo/>
     </Provider>
)
