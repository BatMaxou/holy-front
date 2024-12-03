import { useCallback, useEffect, useState } from "react";

import style from "./TierList.module.scss";
import apiClient from "../../api/ApiClient";
import Card from "../../components/Card";
import TierListComponent from "../../components/TierList";

const TierList = () => {	
    const [rankedProducts, setRankedProducts] = useState([]);
	const [tiers, setTiers] = useState([]);

	useEffect(() => {
		apiClient.tierList.getItems().then((result) => setRankedProducts((Object.values(result) ?? []).reduce((acc, element) => {
            if (acc[element.tier]) {
                return {
                    ...acc,
                    [element.tier]: [...acc[element.tier], element]
                }
            }
    
            return {
                ...acc,
                [element.tier]: [element]
            };
        }, {})));
		apiClient.tier.getAll().then((result) => setTiers(result ?? []));
	}, []);

	const onEnd = useCallback(event => {
		const { to, newIndex, item } = event;

		apiClient.tierList.updateItem({
			id: item.id,
			tier: to.id,
			order: newIndex + 1,
		})
	}, []);

	const sortElements = useCallback(elements => {
		const [nullValues, withOrder] = elements.reduce((acc, element) =>{
			if (element.order === null) {
				return [[...acc[0], element], acc[1]];
			}

			return [acc[0], [...acc[1], element]];
		}, [[], []]);

		return [...withOrder.sort((a, b) => a.order - b.order), ...nullValues];
	}, []);

	return <div className={style.tierList}>
		<h1>HOLY Tier Liste</h1>
		<TierListComponent
			tiers={tiers}
			elements={rankedProducts}
			renderElement={(rankedProduct) => <Card product={rankedProduct} />}
			onEnd={onEnd}
			sortElements={sortElements}
		/>
	</div>;
}

export default TierList;
