import React from 'react';
import ReactDOM from 'react-dom';
import Draggable, { DraggableData, DraggableEvent, DraggableEventHandler } from 'react-draggable';

export default function App () {
  const handleStart: DraggableEventHandler = (e: DraggableEvent, data: DraggableData) => {
    // console.log('---', data)
  }
  const handleDrag = (e: DraggableEvent, data: DraggableData) => {
    // console.log(data)
  }
  const handleStop = (e: DraggableEvent, data: DraggableData) => {
    console.log(e)
    console.log('***', data)
  }
  return (
    <div style={{ width: 800, height: 800, background: '#eee' }}>
      <Draggable
        axis="both"
        handle=".handle"
        defaultPosition={{x: 0, y: 0}}
        position={{ x: 100, y: 100 }}
        grid={[5, 5]}
        scale={1}
        onStart={handleStart}
        onDrag={handleDrag}
        onStop={handleStop}
      >
        <div style={{ border: '1px solid', width: 200 }}>
          <div className="handle">Drag from here</div>
          <div>This readme is really dragging on...</div>
        </div>
      </Draggable>
      <Draggable
        axis="both"
        handle=".handle"
        defaultPosition={{x: 0, y: 0}}
        position={undefined}
        grid={[5, 5]}
        scale={1}
        onStart={handleStart}
        onDrag={handleDrag}
        onStop={handleStop}
      >
        <div style={{ border: '1px solid', width: 200 }}>
          <div className="handle">Drag from here</div>
          <div>This readme is really dragging on...</div>
        </div>
      </Draggable>
    </div>
  )
}
// class App extends React.xComponent {

//   eventLogger = (e: MouseEvent, data: Object) => {
//     console.log('Event: ', e);
//     console.log('Data: ', data);
//   };

//   render() {
//     return (
//       <Draggable
//         axis="x"
//         handle=".handle"
//         defaultPosition={{x: 0, y: 0}}
//         position={null}
//         grid={[25, 25]}
//         scale={1}
//         onStart={this.handleStart}
//         onDrag={this.handleDrag}
//         onStop={this.handleStop}>
//         <div>
//           <div className="handle">Drag from here</div>
//           <div>This readme is really dragging on...</div>
//         </div>
//       </Draggable>
//     );
//   }
// }