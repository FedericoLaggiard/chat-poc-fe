import {useDispatch, useSelector} from "react-redux";
import {selectErrors} from "./selectors";
import {App as AntApp, Button, Modal} from "antd";
import {useEffect} from "react";
import ReactJson from '@microlink/react-json-view'
import {setErrorRead} from "./reducer";

const PLACEMENT = "bottomLeft";

function GenericErrorsHandler() {
    const errors = useSelector(selectErrors);
    const dispatch = useDispatch();
    const { notification } = AntApp.useApp();

    const showModal = (error) => {
        const errorcpy = {
            ...error,
            timestamp: error.timestamp.format('DD/MM/YYYY HH:mm:ss')
        };

        Modal.error({
            title: "Error details",
            content: <ReactJson
                style={{
                    maxHeight: "50vh",
                    overflow: "auto",
                    marginTop: "20px",
                }}
                displayObjectSize={false}
                displayDataTypes={false}
                collapsed={1}
                src={errorcpy}
            />
        });
        onClose(error);
    };

    const onClose = (error) => {
        dispatch(setErrorRead(error.id));
    }

    const btnShowMore = (
        <Button type="link" size="small">
            Show more...
        </Button>
    );

    const getErrorDescription = (err) => {
        if(err.code === "") {
            return err.error;
        }else {
            return (<><p>{err.code}</p><p>{err.error}</p></>);
        }
    }

    const showErrNotification = (err)  => {
        return notification.error({
            message: "Error",
            description: getErrorDescription(err),
            placement: PLACEMENT,
            btn: btnShowMore,
            onClick: () => showModal(err),
            onClose: () => onClose(err),
        })
    };

    useEffect(() => {
        errors.filter(error => error.read === false).map((error) => {
            return showErrNotification(error);
        })
    }, [errors]);

    return (
        <div style={{display: "none"}}>
            &nbsp;
        </div>
    );
}

export default GenericErrorsHandler;