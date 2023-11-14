import React, {FC} from 'react';

interface IBtnProp {
    cls?: string,
    handleClick?: () => void,
    text?: string
}
const Btn : FC<IBtnProp> = React.memo(({cls, handleClick, text}) => {
    return (
        <button className={cls} onClick={handleClick}>{text}</button>
    );
})

export default Btn;
