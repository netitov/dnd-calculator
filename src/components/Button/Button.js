import { useEffect } from 'react';

function Button(props) {

  const btnClass = (props.value === 0) ? 'btn btn_wide'
    : (props.value === '=') ? 'btn btn_color' : 'btn'
  ;
  const cursorClass = props.runtime ? ' btn_pointer' : '';

  function onBtnClick(data) {
    if (props.runtime) {
      const value = typeof(data) === 'object' ? props.value : data;
      props.clickBtn(value);
    }
  }

  //handle key press
  useEffect(() => {
    function handleKeyClick(e) {
      const keyValue = !isNaN(Number(e.key)) ? Number(e.key) : e.key === '*' ? 'x' : e.key;
      if ((keyValue === props.value || keyValue === 'Enter') && props.runtime) {
        onBtnClick(keyValue);
      }
    }
    document.addEventListener('keyup', handleKeyClick);
    return () => {
      document.removeEventListener('keyup', handleKeyClick);
    };
  }, [onBtnClick])

  return (
    <button className={`${btnClass}${cursorClass}`} type="button" onClick={onBtnClick}>
      {props.value}
    </button>
  );
}

export default Button;
