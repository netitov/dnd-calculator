import Button from '../Button/Button';
import { numberArr, symbolsArr } from '../../utils/constants';

function Calculator(props) {


  return (
    <div className="calculator">

      <div className="calculator__container calculator__disp-cont">
        <div className="calculator__disp-wrapper">
          <h1 className="calculator__display">0</h1>
        </div>
      </div>

      <div className="calculator__container calculator__symb-cont">
        {symbolsArr.map((i) => {
          return (
            <Button
              value={i}
              key={i}
            />
          )
        })}
      </div>

      <div className="calculator__container calculator__num-cont">
        {numberArr.map((i) => {
          return (
            <Button
              value={i}
              key={i}
            />
          )
        })}
      </div>

      <div className="calculator__container calculator__equal-cont">
        <Button
          value="="
        />
      </div>

    </div>
  );
}

export default Calculator;
