import Calculator from '../Calculator/Calculator';
import DragZone from '../DragZone/DragZone';
import Switcher from '../Switcher/Switcher';
import { useState } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes, calcData, numberArr, symbolsArr, equalArr, maxNumber } from '../../utils/constants';


function Constructor() {
  const [newCalc, setNewCalc] = useState([]);
  const [activeMode, setActiveMode] = useState('Constructor');
  const [runtime, setRuntime] = useState(false);

  const [result, setResult] = useState(0);//count result
  const [num, setNum] = useState(0);//current number
  const [prevNum, setPrevNum] = useState(0);//previous number
  const [operator, setOperator] = useState();

  //calculate
  function defineBtnType(data) {
    if (numberArr.includes(data)) {
      if (data === ',') {
        inputNum('.');
      } else {
        inputNum(data);
      }
    }
    if (symbolsArr.includes(data)) {
      operatorHandler(data);
    }
    if (equalArr.includes(data) || data === 'Enter') {
      calculate();
    }
  }

  function inputNum(data) {
    if (num.length >= maxNumber) return;
    if (num !== 0) {
      setNum(String(num) + data);
      setResult(String(num) + data);
    } else if (data === '.') {
      setNum('0.');
      setResult('0.');
    } else {
      setNum(data);
      setResult(data);
    }
    if (operator === undefined) {
      setPrevNum(0);
    }
  }

  function operatorHandler(data) {
    setOperator(data);
    if (prevNum !== 0) {
      calculate(data);
    } else {
      setPrevNum(num);
      setNum(0);
    }
  }

  function limitValue(count) {
    const numberDecimal = (String(count).length - (maxNumber + 1) - String(count).indexOf('.'));
    if (String(count).indexOf('.') > maxNumber) {
      return 'Не определено';
    }
    if (!String(count).includes('.') && String(count).length > maxNumber) {
      return 'Не определено';
    }
    return String(count).length > maxNumber ? count.toFixed(numberDecimal) : count;
  }

  function calculate(data) {
    if (operator === '/') {
      const count = parseFloat(prevNum) / parseFloat(num);
      setResult(limitValue(count));
    } else if (operator === 'x') {
      const count = parseFloat(prevNum) * parseFloat(num);
      setResult(limitValue(count));
    } else if (operator === '-') {
      const count = parseFloat(prevNum) - parseFloat(num);
      setResult(limitValue(count));
    } else if (operator === '+') {
      const count = parseFloat(prevNum) + parseFloat(num);
      setResult(limitValue(count));
    }
    setNum(0);
    setOperator(data);
    setPrevNum(result);
  }

  function switchMode(data) {
    setActiveMode(data);
    setRuntime(data === 'Runtime');
  }

  const [{ isOver }, drop] = useDrop(
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
      <Switcher
        switchMode={switchMode}
        activeMode={activeMode}
      />
      <Calculator
        calcData={calcData}
        candrop={false}
        activeMode={activeMode}

      />
      <DragZone
        isOverClass={isOverClass}
        isActiveClass={isActiveClass}
        drop={drop}
        newCalc={newCalc}
        calcActivity={calcActivity}
        moveCard={moveCard}
        removeItem={removeItem}
        runtime={runtime}
        clickBtn={defineBtnType}
        result={result}
      />
    </div>
  );
}

export default Constructor;
