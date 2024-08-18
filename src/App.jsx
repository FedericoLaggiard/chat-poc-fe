import './App.css'
import Chat from "./features/chat/chat";
import mainTheme from "./utils/mainTheme";
import {ConfigProvider} from "antd";

function App() {

  return (
    <>
        <ConfigProvider
            theme={mainTheme}
        >
            <Chat unreadCount={0}/>
        </ConfigProvider>
    </>
  )
}

export default App
