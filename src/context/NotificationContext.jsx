import { createContext, useCallback, useState } from "react"

import List from "../components/ui/List"
import Notification from "../components/ui/Notification"

export const NotificationContext = createContext({
    addNotification: () => {},
})

export const NotificationContextProvider = ({ children }) => {
    const [count, setCount] = useState(1)
    const [notifications, setNotification] = useState([])

    const addNotification = useCallback(notification => {
        setNotification(notifications => [...notifications, {
            ...notification,
            id: `${count}-${Math.random(1, 1000000)}`,
        }])
        setCount(count => count + 1)
    }, [count, setCount, setNotification])

    const removeNotification = useCallback(notification => {
        setNotification(notifications => notifications.filter(n => n !== notification))
    }, [setNotification])

    return <NotificationContext.Provider value={{
        addNotification,
    }}>
        {children}
        <List
            collection={notifications}
            renderItem={notification => <Notification
                message={notification.message ?? ''}
                type={notification.type ?? 'info'}
                onClose={() => removeNotification(notification)}
            />}
            className="notifications"
        />
    </NotificationContext.Provider>
}
