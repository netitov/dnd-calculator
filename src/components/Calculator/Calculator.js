import CalcBlock from '../CalcBlock/CalcBlock';

function Calculator(props) {

  const activityClass = props.calcActivity || props.calcActivity === undefined  ? '' : ' calculator_inactive';
  const droppedClass = props.candrop ? ' calculator_dropped' : '';

  return (
    <div className={`calculator${activityClass}${droppedClass}`}>
      {props.calcData.map((i, index) => {
        return (
          <CalcBlock
            contClass={i.contClass}
            btnArr={i.btnArr}
            id={i.id}
            key={i.id}
            index={index}
            moveCard={props.moveCard}
            candrop={props.candrop}
            dropped={i.dropped}
            removeItem={props.removeItem}
          />
        )
      })}
    </div>
  );
}

export default Calculator;
