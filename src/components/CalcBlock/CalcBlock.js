import Button from '../Button/Button';
import { ItemTypes } from '../../utils/constants';
import { useDrag, useDrop } from 'react-dnd';
import { useRef, useState, useEffect } from 'react';
import line from '../../images/line.svg';

function CalcBlock(props) {

  const ref = useRef(null);

  const [upLineActive, setUpLineActive] = useState(false);
  const [bottomLineActive, setbottomLineActive] = useState(false);


  const [{isDragging}, drag] = useDrag({
    type: props.id === 1 ? ItemTypes.CALCDISPLAY : ItemTypes.CALCBLOCK,
    item: {
      id: props.id,
      index: props.index
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    })
  })

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CALCBLOCK,
    hover(item, monitor) {

      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = props.index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      };

      //unable drop for display
      if (props.id === 1) {
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
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      };
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      };

      if (dragIndex < hoverIndex && hoverClientY > hoverMiddleY) {
        setUpLineActive(false);
        setbottomLineActive(true);
      };

      if (dragIndex > hoverIndex && hoverClientY < hoverMiddleY) {
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
        props.moveCard(item.index, props.index);
      }
      setUpLineActive(false);
      setbottomLineActive(false);
    }
  })

  const upLineClass = upLineActive && isOver ? ' calculator__line_active' : '';
  const bottomLineClass = bottomLineActive && isOver ? ' calculator__line_active' : '';

  drag(drop(ref));

  return (

    <div className={`calculator__container ${props.contClass}`}
      ref={ref}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: props.id === 1 ? 'not-allowed' : 'move'
      }}
    >
      <img src={line} alt="line" className={`calculator__line calculator__line_top${upLineClass}`}></img>
      <img src={line} alt="line" className={`calculator__line calculator__line_bottom${bottomLineClass}`}></img>

      {props.id === 1 ? // if id = 1, then render display (without buttons), else render buttons
        (
          <div className="calculator__disp-wrapper">
            <h1 className="calculator__display">0</h1>
          </div>
        ) :
        (
          props.btnArr.map((i) => {
            return (
              <Button
                value={i}
                key={i}
              />
            )
          })
        )
      }
    </div>
  );
}

export default CalcBlock;
