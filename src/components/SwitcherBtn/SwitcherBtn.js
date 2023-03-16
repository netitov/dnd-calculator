function SwitcherBtn(props) {

  function onSwitchClick() {
    if(props.activeMode !== props.title) {
      props.switchMode(props.title);
    }
  }

  return (
    <div className={`switcher__cont${props.activeMode === props.title ? ' switcher__cont_active' : ''}`} onClick={onSwitchClick}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        {props.children}
      </svg>
      <p className="switcher__title">{props.title}</p>
    </div>

  );
}

export default SwitcherBtn;
