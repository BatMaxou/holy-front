import { useEffect, useState } from "react";

import style from "./Row.module.scss";
import { toFirstUpper } from "../../../utils/typography";
import cn from "../../../utils/classnames";
import { ReactSortable } from "react-sortablejs";

const Row = ({ tier, elements, renderElement, onEnd, isDefault = false }) => {
    const [state, setState] = useState(elements);

    useEffect(() => {
        setState(elements);
    }, [elements]);

    return <div className={cn(style.row, {[style.default]: isDefault})}>
        <h2 className={style.title}>{toFirstUpper(tier)}</h2>
        <ReactSortable
            id={tier}
            tag="ul"
            group="shared"
            animation={150}
            swapThreshold={0.5}
            list={state}
            setList={setState}
            className={style.row}
            onEnd={onEnd}
        >
            {state.map(element => <li key={element.id} id={element.id}>
                {renderElement(element)}
            </li>)}
        </ReactSortable>
    </div>

}

export default Row;
