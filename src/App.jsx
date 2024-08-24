import './App.css'
import Chat from "./features/chat/chat";
import mainTheme from "./utils/mainTheme";
import {Button, ConfigProvider} from "antd";
import { notificationsSlice } from "./features/notifications/reducer";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectNotificationsPermissions} from "./features/notifications/selectors";

function App() {
    const dispatch = useDispatch();
    const notificationPermissions = useSelector(selectNotificationsPermissions);

    useEffect(() => {
        dispatch(notificationsSlice.actions.bootstrapNotificationsAction(""));
    }, []);

    const onEnableNotifications = () => {
        dispatch(notificationsSlice.actions.getPermissionAction());
    }

    return (
        <>
            <ConfigProvider
                theme={mainTheme}
            >
                {(notificationPermissions === null) ?
                    <Button onClick={onEnableNotifications}>Enable notifications</Button>
                    :
                    <Chat unreadCount={0}/>
                }
            </ConfigProvider>
        </>
      )
}

export default App
