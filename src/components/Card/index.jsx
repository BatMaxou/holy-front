import { getFilePath } from '../../utils/file';
import style from './Card.module.scss';

const Card = ({product}) => {
    return <div className={style.card}>
        <img src={getFilePath(product.imageUrl)} alt={product.name} />
    </div>;
}

export default Card;
