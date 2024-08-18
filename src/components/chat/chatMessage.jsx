import {Card, Col, Row} from "antd";
import {UserOutlined} from "@ant-design/icons";
import AvatarWithName from "../../components/avatarWithName/avatarWithName";
import {createUseStyles} from "react-jss";
import styles from "./styles";
import ChatAttachment from "./chatAttachment";

const useStyles = createUseStyles(styles);

function ChatMessage({
    firstName,
    lastName,
    date,
    time,
    message,
    avatarColor,
    isLastOfGroup,
    isFirstOfGroup,
    isCurrentUser,
    attachments = [],
    showAvatar = true,
}) {
    const classes = useStyles();

    const renderChatHead = () => {
        if(!isFirstOfGroup) return <></>;
        return (
            <Row style={{ textAlign: `${ isCurrentUser ? 'right' : 'left' }` }}>
                <Col span={1}>&nbsp;</Col>
                <Col span={22} className={"chatItemHead"}>
                    <span className={classes.chatName}>{`${firstName} ${lastName}`}</span>
                    <span className={classes.chatDate}>{date}</span>
                </Col>
                <Col span={1}>&nbsp;</Col>
            </Row>
        )
    }

    const renderAvatar = (isCurrentUser = false) => {
        if(showAvatar) {
            if (!isLastOfGroup) return <Col span={1} className={classes.chatAvatar}/>
            return (
                <Col span={1} className={classes.chatAvatar} style={{textAlign: `${isCurrentUser ? "right" : "left"}`}}>
                    <AvatarWithName
                        name={`${firstName?.substring(
                            0,
                            1
                        )} ${lastName?.substring(0, 1)}`}
                        style={{
                            backgroundColor: avatarColor,
                        }}
                        icon={<UserOutlined/>}
                    />
                </Col>
            )
        }
    }

    const renderAttachments = (attachments) => {
        if(attachments.length > 0) {
            const attachmentsList = attachments.map((attachment, index) =>
                <ChatAttachment
                    attachment={attachment}
                    key={attachment.id}
                />
            );

            return (
                <Row>
                    {attachmentsList}
                </Row>
            )
        }

        return <></>
    }

    const renderCurrentUser = () => {
        return (
            <div className={`${isLastOfGroup ? classes.lastOfGroup : classes.chatItem} ${isCurrentUser && "current-user"}`}>
                { renderChatHead() }
                <Row>
                    <Col span={1} />
                    <Col span={22} className={classes.chatCardUser}>
                        <Card>
                            <Row>
                                <Col className={classes.chatTime}>
                                    {time}
                                </Col>
                                <Col className={classes.chatMessage}>
                                    <Row>
                                        <Col>
                                            {message}
                                        </Col>
                                    </Row>
                                    { renderAttachments(attachments) }
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    {renderAvatar(true)}
                </Row>
            </div>
        )
    };

    const renderOtherUsers = () => {
        return (
            <div className={isLastOfGroup ? classes.lastOfGroup : classes.chatItem}>
                {renderChatHead()}
                <Row>
                    {renderAvatar()}
                    <Col span={22} className={classes.chatCard}>
                        <Card>
                            <Row>
                                <Col className={classes.chatMessage}>
                                    <Row>
                                        <Col>
                                            {message}
                                        </Col>
                                    </Row>
                                    { renderAttachments(attachments) }
                                </Col>
                                <Col className={classes.chatTime}>
                                    {time}
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col span={1} />
                </Row>
            </div>
        )
    };

    if (isCurrentUser) {
        return renderCurrentUser();
    }

    return renderOtherUsers();
}

export default ChatMessage;