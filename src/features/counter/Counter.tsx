import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { RootStore } from "../../app/store";
import { decrement, increment, incrementByAmount, reset } from "./counterSlice";
import { CounterSection } from "./counter.module";

const Counter = () => {
    const count = useSelector((state: RootStore) => state.count.count);
    const dispatch = useDispatch();

    const [incrementAmount, setIncrementAmount] = useState(0);

    const addValue = Number(incrementAmount) || 0;

    const resetAll = () => {
        setIncrementAmount(0);
        dispatch(reset());
    }

    return (
        <CounterSection>
          <h1>COUNTER</h1>
            <h2>{count}</h2>
            <div>
                <button onClick={() => dispatch(increment())}>+</button>
                <button onClick={() => dispatch(decrement())}>-</button>
            </div>
            <br />

            <input
                type="text"
                value={incrementAmount}
                onChange={(e) => setIncrementAmount(+e.target.value)}
            />
            <br />
            <div>
                <button onClick={() => dispatch(incrementByAmount(addValue))}>Add Amount</button>
                <button onClick={resetAll}>Reset</button>
            </div>
        </CounterSection>
    )
}
export default Counter