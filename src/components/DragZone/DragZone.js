import { useState, useCallback } from 'react';
import update from 'immutability-helper';
import { useDrop } from 'react-dnd';
import dragpic from '../../images/dragpic.svg';
import { ItemTypes, calcData } from '../../utils/constants';
import Calculator from '../Calculator/Calculator';


function DragZone(props) {

  const [newCalc, setNewCalc] = useState(calcData);

  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.CALCBLOCK,
      drop: (item) => {
        //const test = calcData.filter((i) => i.id === item.id);
        //setNewCalc(newCalc => [...newCalc, test[0]])
        //console.log(item)
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),

      }),
    }),
  )
  const isActive = canDrop && isOver

  function moveCard(dragIndex, hoverIndex) {
    //const newArr = newCalc.splice([dragIndex, 1], [hoverIndex, 0, newCalc[dragIndex]]);
    /* setNewCalc((cards) => {
      cards.splice(dragIndex, 1, cards[hoverIndex])
    }) */
    //console.log(newCalc[dragIndex], newCalc[hoverIndex])
    //console.log(dragIndex, hoverIndex)

    /* setNewCalc((prevCards) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex]],
          ],
        }),
      ) */

      const element = newCalc[dragIndex];
      newCalc.splice(dragIndex, 1);
      newCalc.splice(hoverIndex, 0, element);

  }

  const calcActivity = newCalc.length === 0 ? false : true;
  const isOverClass = isOver && !calcActivity  ? ' drag-zone_dragging' : '';
  const isActiveClass = calcActivity ? ' drag-zone_inactive' : '';


  return (
    <div className={`drag-zone${isOverClass}${isActiveClass}`} ref={drop}>
      <div className="drag-zone__cont">
        <img className="drag-zone__img" src={dragpic} alt="dragg here"></img>
        <p className="drag-zone__text">Перетащите сюда<span> любой элемент<br></br> из левой панели</span></p>
      </div>

      <Calculator
        calcData={newCalc}
        calcActivity={calcActivity}
        moveCard={moveCard}
      />


    </div>
  );
}

export default DragZone;
