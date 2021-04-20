import { useState } from 'react';

export default function ButtonTest2(proprieties){

    const [pressedTimes, setPressedTimes] = useState(1);

    function incrementPressedTimes() {

        setPressedTimes(pressedTimes + 1);

    }

    return (

    <>    
    <button onClick={incrementPressedTimes}>{proprieties.children}</button>
    <span>Pressed Times: {pressedTimes}</span>
    </>
    )
}