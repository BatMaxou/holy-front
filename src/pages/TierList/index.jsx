import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import style from "./TierList.module.scss";
import apiClient from "../../api/ApiClient";
import Card from "../../components/Card";
import TierListComponent from "../../components/TierList";
import Button from "../../components/ui/Button";
import { NotificationContext } from "../../context/NotificationContext";

const TierList = () => {	
    const [rankedProducts, setRankedProducts] = useState([]);
	const [tiers, setTiers] = useState([]);
	const router = useNavigate();
	const { addNotification } = useContext(NotificationContext);

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

	const onLogout = useCallback(() => {
		localStorage.removeItem('token');
		router('/');
		addNotification({ message: 'Vous avez bien été déconnecté', type: 'info' });
	}, [router, addNotification]);

	return <div className={style.tierList}>
		<h1>
			<img src='/images/logo.webp' alt='logo' />
		</h1>
		<Button className={style.logout} onClick={onLogout}>Déconnexion</Button>
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
