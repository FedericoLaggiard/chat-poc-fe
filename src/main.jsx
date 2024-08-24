import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PAGE_TITLE } from "./env";
import { App as AntApp } from "antd";
import store from "./redux";
import App from './App.jsx'
import PageTitle from "./components/pageTitle"
import './index.css'
import {Provider} from "react-redux";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PageTitle title={PAGE_TITLE} />
      <Provider store={store}>
          <AntApp
              style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#EBEBF0",
              }}
          >
            <App />
          </AntApp>
      </Provider>
  </StrictMode>,
)
