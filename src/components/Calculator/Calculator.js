import CalcBlock from '../CalcBlock/CalcBlock';

function Calculator(props) {

  const activityClass = props.calcActivity || props.calcActivity === undefined  ? '' : ' calculator_inactive';

  return (
    <div className={`calculator${activityClass}`}>
      {props.calcData.map((i, index) => {
        return (
          <CalcBlock
            contClass={i.contClass}
            btnArr={i.btnArr}
            id={i.id}
            key={i.id}
            index={index}
            moveCard={props.moveCard}
          />
        )
      })}
    </div>
  );
}

export default Calculator;
