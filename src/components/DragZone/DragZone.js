import { useState } from 'react';
import { useDrop } from 'react-dnd';
import dragpic from '../../images/dragpic.svg';
import { ItemTypes, calcData } from '../../utils/constants';
import Calculator from '../Calculator/Calculator';


function DragZone(props) {

  return (
    <div className={`drag-zone${props.isOverClass}${props.isActiveClass}`} ref={props.drop} onClick={props.teste}>
      <div className="drag-zone__cont">
        <img className="drag-zone__img" src={dragpic} alt="dragg here"></img>
        <p className="drag-zone__text">Перетащите сюда<span> любой элемент<br></br> из левой панели</span></p>
      </div>

      <Calculator
        calcData={props.newCalc}
        calcActivity={props.calcActivity}
        moveCard={props.moveCard}
        candrop={true}
        removeItem={props.removeItem}
        runtime={props.runtime}
      />


    </div>
  );
}

export default DragZone;
