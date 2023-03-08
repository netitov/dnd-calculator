import dragpic from '../../images/dragpic.svg';

function DragZone(props) {


  return (
    <div className="drag-zone">
      <div className="drag-zone__cont">
        <img className="drag-zone__img" src={dragpic} alt="dragg here"></img>
        <p className="drag-zone__text">Перетащите сюда<span> любой элемент<br></br> из левой панели</span></p>
      </div>
    </div>
  );
}

export default DragZone;
