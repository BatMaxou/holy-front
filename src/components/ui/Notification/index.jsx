import { useCallback, useEffect, useRef } from "react"
import { RxCross1 } from "react-icons/rx"

import './notification.scss'
import cn from '../../../utils/classnames'

const Notification = ({ message, type, onClose }) => {
    const notification = useRef(null)

    const handleClose = useCallback(() => {
        notification.current?.classList.add('notification__desappear')

        setTimeout(() => {
            onClose()
        }, 300)
    }, [onClose])

    useEffect(() => {
        setTimeout(() => {
            handleClose()
        }, 5000)
    }, [handleClose])

    return <div ref={notification} className={cn('notification', type)}>
        {message}
        <RxCross1
            className="notification__close"
            onClick={handleClose}
        />
    </div>
}

export default Notification
