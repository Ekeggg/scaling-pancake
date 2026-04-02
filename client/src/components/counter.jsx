import "./counter.css"
import React from "react"

const Counter = () => {
    const [num,numSet] = React.useState(0)
    
    const clicked = () => {
        numSet(n => n+1)
    }

    return(
        <>
            <button onClick={clicked}>You clicked {num} times</button>
        </>
    )
}
export default Counter;