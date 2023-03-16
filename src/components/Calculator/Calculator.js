import CalcBlock from '../CalcBlock/CalcBlock';

function Calculator(props) {

  const activityClass = props.calcActivity || props.calcActivity === undefined
  || props.activeMode === 'Constructor'  ? '' : ' calculator_inactive';
  const droppedClass = props.candrop ? ' calculator_dropped' : '';
  const visibleClass = props.activeMode === 'Runtime' ? ' calculator_invisible' : '';

  return (
    <div className={`calculator${activityClass}${droppedClass}${visibleClass}`}
    >
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
            runtime={props.runtime}
          />
        )
      })}
    </div>
  );
}

export default Calculator;
