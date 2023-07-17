import { forwardRef, useEffect, useRef } from 'react';

function SelectBox({ className = '', ...props }) {
    return (
        <select {...props}  id="countries" className={`input ${className}`}>
            {props.children}
        </select>
    );
}

SelectBox.Option = function (props) {
    return <option {...props}>{props.children}</option>
}

export default SelectBox;
