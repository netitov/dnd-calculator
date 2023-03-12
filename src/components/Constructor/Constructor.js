import Calculator from '../Calculator/Calculator';
import DragZone from '../DragZone/DragZone';
import { calcData } from '../../utils/constants';


function Constructor() {
  return (
    <div className="constructor">
      <Calculator
        calcData={calcData}
      />
      <DragZone />
    </div>
  );
}

export default Constructor;
