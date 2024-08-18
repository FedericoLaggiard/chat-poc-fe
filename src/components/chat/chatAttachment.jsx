import {Col, Image} from "antd";
import {createUseStyles} from "react-jss";
import styles from "./styles";
import {FileTextFilled, VideoCameraFilled} from "@ant-design/icons";
import {IMAGE_FALLBACK} from "../../utils/constants";

const useStyles = createUseStyles(styles);
function ChatAttachment({attachment}) {
    const classes = useStyles();

    const checkAttachment = (attach) => {
        switch (true){
            case attach.contentType.indexOf("video") > -1:
                return (
                    <div className={classes.chatAttachmentBox}>
                        <VideoCameraFilled
                            style={{ fontSize: "50px", color: "white" }}
                        />
                    </div>
                );
            case attach.contentType.indexOf("image") > -1:
                return (
                    <Image
                        preview={false}
                        height={100}
                        src={attachment.signedUrl}
                        fallback={IMAGE_FALLBACK}
                    />
                );
            default:
                return (
                    <div className={classes.chatAttachmentBox}>
                        <FileTextFilled style={{ fontSize: "50px", color: "white" }}/>
                    </div>
                );
        }
    };

    if(attachment){
        return (
            <Col>
                <a href={attachment.signedUrl} target={"_blank"}>
                    <div className={classes.chatAttachmentContainer}>
                        {checkAttachment(attachment)}
                    </div>
                </a>
            </Col>
        )
    }

    return (
        <Col className={classes.chatAttachmentContainer} key={Math.random()}>
            <Image
                preview={false}
                height={100}
                src={""}
                fallback={IMAGE_FALLBACK}
            />
        </Col>
    )
}

export default ChatAttachment;