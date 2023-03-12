import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Constructor from '../Constructor/Constructor';


function App() {
  return (
    <div className="page">
      <DndProvider backend={HTML5Backend}>
        <Constructor />
			</DndProvider>
    </div>
  );
}

export default App;
