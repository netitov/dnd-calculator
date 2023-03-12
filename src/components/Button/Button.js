function Button(props) {

  const btnClass = (props.value === 0) ? 'btn btn_wide'
    : (props.value === '=') ? 'btn btn_color' : 'btn'
  ;

  return (
    <button
      style={{
        cursor: 'move',
      }}
      className={btnClass}
      type="button"
      onClick={props.onBtnClick}
    >
      {props.value}
    </button>
  );
}

export default Button;
