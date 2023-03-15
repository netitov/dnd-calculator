import Calculator from '../Calculator/Calculator';
import DragZone from '../DragZone/DragZone';
import Switcher from '../Switcher/Switcher';
import { useState } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes, calcData } from '../../utils/constants';


function Constructor() {
  const [newCalc, setNewCalc] = useState([]);

  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.CALCBLOCK,
      drop: (item) => {
        if (newCalc.filter((i) => i.id === item.id).length === 0) {
          const element = calcData.filter((i) => i.id === item.id);
          //disable initial element after dropping
          calcData[item.index].dropped = true;

          setNewCalc(newCalc => {
            if (item.id === 1) {
              //display at the first position
              return [element[0], ...newCalc];
            } else {
              return [...newCalc, element[0]];
            }
          });
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver()
      }),
    }),[newCalc]
  )
  const isActive = canDrop && isOver;

  function moveCard(dragIndex, hoverIndex, item, bottomLineActive) {

    const element = !item.candrop ? calcData[dragIndex] : newCalc[dragIndex];
    const indexInInitArray = calcData.findIndex((i) => i.id === item.id);

    const addedIndex = !item.candrop && bottomLineActive ? hoverIndex + 1 : hoverIndex;
    const removedIndex = !item.candrop ? calcData.length : dragIndex;

    //disable initial element after dropping
    if(!calcData[indexInInitArray].dropped)  {
      calcData[indexInInitArray].dropped = true;
    };

    newCalc.splice(removedIndex, 1);
    newCalc.splice(addedIndex, 0, element);
  }

  const calcActivity = newCalc.length === 0 ? false : true;
  const isOverClass = isOver && !calcActivity  ? ' drag-zone_dragging' : '';
  const isActiveClass = calcActivity ? ' drag-zone_inactive' : '';

  function removeItem(itemId) {
    const currIndex = calcData.findIndex((i) => i.id === itemId);
    calcData[currIndex].dropped = false;
    setNewCalc(newCalc.filter((i) => i.id !== itemId));
  }

  return (
    <div className="constructor">
      <Switcher />
      <Calculator
        calcData={calcData}
        candrop={false}
      />
      <DragZone
        isOverClass={isOverClass}
        isActiveClass={isActiveClass}
        drop={drop}
        newCalc={newCalc}
        calcActivity={calcActivity}
        moveCard={moveCard}
        removeItem={removeItem}
      />
    </div>
  );
}

export default Constructor;
