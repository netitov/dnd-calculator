import Button from '../Button/Button';
import { ItemTypes } from '../../utils/constants';
import { useDrag, useDrop } from 'react-dnd';
import { useRef, useState, useEffect } from 'react';
import line from '../../images/line.svg';

let initFont = 36;
function CalcBlock(props) {

  const ref = useRef(null);

  const [upLineActive, setUpLineActive] = useState(false);
  const [bottomLineActive, setbottomLineActive] = useState(false);
  const staticItemId = 1;

  const [{isDragging}, drag] = useDrag({
    type: props.id === staticItemId && props.candrop ? ItemTypes.CALCDISPLAY : ItemTypes.CALCBLOCK,
    item: {
      id: props.id,
      index: props.index,
      candrop: props.candrop
    },
    canDrag () {
      if (props.dropped && !props.candrop || props.runtime) {
        return false
      } else {
        return true
      }
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
      canDrag: !!monitor.canDrag(),
    })
  })

  const [{ isOver }, drop] = useDrop({
    accept: props.id === staticItemId && props.candrop ? ItemTypes.CALCDISPLAY : ItemTypes.CALCBLOCK,
    hover(item, monitor) {

      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = props.index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex && item.id !== staticItemId) {
        return;
      };

      //unable drop for display
      if (props.id === staticItemId && props.candrop) {
        return;
      };

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY && item.candrop) {
        return;
      };
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY && item.candrop) {
        return;
      };

      if (hoverClientY > hoverMiddleY && item.id !== staticItemId) {
        setUpLineActive(false);
        setbottomLineActive(true);
      };

      if ((hoverClientY < hoverMiddleY && item.id !== staticItemId) ||
        (hoverClientY < hoverMiddleY && item.id === staticItemId && hoverIndex === 0)) {
        setbottomLineActive(false);
        setUpLineActive(true);
      };
      // to avoid expensive index searches.
      //item.index = hoverIndex;

    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
    drop(item) {
      if (upLineActive || bottomLineActive) {
        props.moveCard(item.index, props.index, item, bottomLineActive);
      }
      setUpLineActive(false);
      setbottomLineActive(false);
    }
  })

  function handleRemove() {
    if (props.candrop && !props.runtime) {
      props.removeItem(props.id);
    }
  }

  const upLineClass = upLineActive && isOver ? ' calculator__line_active' : '';
  const bottomLineClass = bottomLineActive && isOver ? ' calculator__line_active' : '';
  const droppedClass = props.dropped && !props.candrop ? ' calculator__container_inactive' : '';
  const draggingClass = isDragging ? ' calculator__container_dragging' : '';

  const dndref = props.candrop ? drag(drop(ref)) : drag;

  //decrease font size
  useEffect(() => {
    if (props.id === 1 && props.dropped) {
      const display = dndref.current;
      const displayContent = display.lastChild.lastChild;
      if (props.result === 'Не определено') {
        displayContent.style.fontSize = '26px';
      }
      else if (String(props.result).length > 8) {
        displayContent.style.fontSize = '33.5px';
      } else {
        displayContent.style.fontSize = '36px';
      }
    }
  }, [props.result])

  function numberWithSpaces() {
    const newStr = props.result === undefined ? 0 : props.result.toString().replace('.', ',');
    return String(newStr).includes(',') ? newStr : String(newStr).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  return (

    <div className={`calculator__container ${props.contClass}${droppedClass}${draggingClass}`}
      ref={dndref}
      style={{
        cursor: (props.id === 1 && props.candrop) || (!props.candrop && props.dropped) ? 'not-allowed' :
        props.runtime ? 'initial' : 'move'
      }}
      onDoubleClick={handleRemove}
    >
      <img src={line} alt="line" className={`calculator__line calculator__line_top${upLineClass}`}></img>
      <img src={line} alt="line" className={`calculator__line calculator__line_bottom${bottomLineClass}`}></img>

      {props.id === staticItemId ? // if id = 1, then render display (without buttons), else render buttons
        (
          <div className="calculator__disp-wrapper">
            <h1 className="calculator__display">{numberWithSpaces()}</h1>
          </div>
        ) :
        (
          props.btnArr.map((i) => {
            return (
              <Button
                value={i}
                key={i}
                runtime={props.runtime}
                clickBtn={props.clickBtn}
              />
            )
          })
        )
      }
    </div>
  );
}

export default CalcBlock;
