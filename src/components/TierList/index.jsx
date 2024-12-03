import style from "./TierList.module.scss";
import Row from "./Row";

const TierList = ({tiers, elements, onEnd, renderElement, sortElements = (array) => array }) => {
    return <div className={style.tierList}>
        {(tiers.ranks ?? []).map(tier => <Row
            key={tier}
            tier={tier}
            elements={sortElements(elements[tier] ?? [])}
            renderElement={renderElement}
            onEnd={onEnd}
        />)}
        <Row
            key={tiers.default ?? ''}
            tier={tiers.default ?? ''}
            elements={sortElements(elements[tiers.default] ?? [])}
            renderElement={renderElement}
            onEnd={onEnd}
            isDefault
        />
    </div>;
};

export default TierList;
