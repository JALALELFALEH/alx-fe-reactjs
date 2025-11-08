import React from "react";
import { useState } from "react";



function Counter() {
    
const [count, setcount] = useState(0)

    return (
        <div>
            <p>Current count :{count}</p>
            <button onClick={() => {setcount(count+1)}}>Incrementing</button>
            <button onClick={() => {setcount(count-1)}}>Decrementing</button>
            <button onClick={() =>{setcount(0)}}>Reset</button>
        </div>
    );
};

export default Counter