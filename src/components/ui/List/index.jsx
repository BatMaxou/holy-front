import './list.scss'
import cn from '../../../utils/classnames'

const List = ({ collection = [], uniqueAttr = null, renderItem, className }) => {
    if (!uniqueAttr) {
        uniqueAttr = element => element.id
    }

    return <ul className={cn('list', className)}>
        {collection.map((element, index) => <li key={uniqueAttr(element)} className='list__element'>{renderItem(element, index)}</li>)}
    </ul>
}

export default List;
