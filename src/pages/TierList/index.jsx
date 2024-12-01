import { useEffect, useState } from "react";

import style from "./TierList.module.scss";
import apiClient from "../../api/ApiClient";
import Card from "../../components/Card";

const TierList = () => {
    const [flavours, setFlavours] = useState([]);

	useEffect(() => {
		apiClient.flavour.getAll().then((result) => setFlavours(result));
	}, []);

	return <div className={style.tierList}>
		{flavours.map((flavour) => <Card key={flavour.name} product={flavour} />)}
	</div>;
}

export default TierList;
