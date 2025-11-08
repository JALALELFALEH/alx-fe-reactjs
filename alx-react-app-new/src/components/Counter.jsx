import React from "react";
import { useState } from "react";



function Counter() {
    
const [Count, setCount] = useState(0)

    return (
        <div>
            <p>Current count :{Count}</p>
            <button onClick={() => {setCount(Count+1)}}>Incrementing</button>
            <button onClick={() => {setCount(Count-1)}}>Decrementing</button>
            <button onClick={() =>{setCount(0)}}>Reset</button>
        </div>
    );
};

export default Counter