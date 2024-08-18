import { MessageOutlined } from "@ant-design/icons";
import styles from "./styles";
import { createUseStyles } from "react-jss";
import { useContext, useEffect, useRef, useState } from "react";
import { Badge, Divider } from "antd";
// import { useOnClickOutside } from "../../utils/useOnClickOutside";
// import { useDispatch, useSelector } from "react-redux";
import {
  DATE_FORMAT_DD_MM_YYYY,
  HOURS_MINS_FORMAT,
} from "../../utils/constants";
// import { chatSlice } from "./reducer";
// import {
//   selectChatAttachments,
//   selectChatIsLoading,
//   selectChatMembers,
//   selectChatMessages,
// } from "./selectors";
// import Loader from "../../components/loader/loader";
import ChatMessage from "../../components/chat/chatMessage";
import ChatControls from "../../components/chat/chatControls";
// import { FormattedMessage } from "react-intl";
// import { PermissionContext } from "../../components/permission/permission";
import dayjs from "dayjs";
import isLastOfGroup from "../../utils/chatUtils/isLastOfGroup";
import isFirstOfGroup from "../../utils/chatUtils/isFirstOfGroup";
import {messageModel} from "./model";

const useStyles = createUseStyles(styles);
let attachMenuOpen = false;

function Chat({ unreadCount }) {
  const classes = useStyles();
  // const dispatch = useDispatch();
  const currentUser = {
    username: "Jhon Doe",
  };
  const [toggle, setToggle] = useState(false);
  const wrapperRef = useRef(null);
  const lastMessageRef = useRef(null);
  // const isLoading = useSelector(selectChatIsLoading);
  const messages = [
    messageModel({"id":376,"from":"TSROLD01","message":"test message from chat","date":"2024-05-16 15:36:27","attachments":[]}),
  ];//useSelector(selectChatMessages) || [];
  // const members = useSelector(selectChatMembers);
  // const attachments = useSelector(selectChatAttachments);
  // const permission = useContext(PermissionContext);

  // sync scrolling to last message
  useEffect(() => {
    if (messages.length) {
      lastMessageRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages.length]);

  const onToggle = () => {
    setToggle(() => !toggle);
  };


  const renderDaySeparator = (date) => {
    return (
      <Divider
        plain
        key={dayjs(date).format("ddmmyyyy")}
        style={{
          fontSize: "10px",
          color: "rgba(174, 174, 178, 1)",
        }}
      >
        {dayjs(date).format("DD MMMM YYYY")}
      </Divider>
    );
  };

  const renderMessages = (messages, attachments) => {
    if (messages) {
      let lastDate = null;

      return messages.reduce((accumulator, message, index) => {
        const isCurrentUser = message.username === currentUser.username;
        let _isLastOfGroup = isLastOfGroup(messages, index, message);
        let _isFirstOfGroup = isFirstOfGroup(messages, index, message);
        const date = dayjs(message.date).format(DATE_FORMAT_DD_MM_YYYY);
        const time = dayjs(message.date).format(HOURS_MINS_FORMAT);

        if (lastDate !== date) {
          accumulator = accumulator.concat(renderDaySeparator(message.date));
        }
        lastDate = date;
        const attach = message.attachments?.map((x) =>
          attachments.find((att) => att.id === x)
        );

        accumulator = accumulator.concat(
          <ChatMessage
            key={message.id}
            message={message.message}
            date={date}
            time={time}
            firstName={message.firstName}
            lastName={message.lastName}
            isLastOfGroup={_isLastOfGroup}
            isFirstOfGroup={_isFirstOfGroup}
            avatarColor={message.avatarColor}
            isCurrentUser={isCurrentUser}
            attachments={attach}
            showAvatar={false}
          />
        );

        return accumulator;
      }, []);
    }
  };

  const onAttachmentMenuOpenChange = (open, info) => {
    attachMenuOpen = open;
  };

  const onMessageSend = (messageInput) => {
    // if(messageInput) {
    // dispatch(chatSlice.actions.sendMessageAction(messageInput));
    // }
  };

  const onAddTempMedia = (data) => {
    // dispatch(chatSlice.actions.addMediaAction(data));
  };
  const onRemoveTempMedia = (file) => {
    // dispatch(chatSlice.actions.removeTempMediaAction(file));
  };

  // const getOtherMember = (currentUser, otherUsers) => {
  //   const usersWithoutMe = otherUsers.filter(
  //     (x) => x.username !== currentUser.username
  //   );
  //   switch (currentUser.roleCode) {
  //     case MASTER_TECHICIAN:
  //       const lastSEIndex = usersWithoutMe.findLastIndex(
  //         (x) => x.roleCode === SERVICE_ENGINEER
  //       );
  //       if (lastSEIndex > -1) {
  //         return usersWithoutMe[lastSEIndex];
  //       }
  //       break;
  //     case SERVICE_ENGINEER:
  //       const lastMTIndex = usersWithoutMe.findLastIndex(
  //         (x) => x.roleCode === MASTER_TECHICIAN
  //       );
  //       if (lastMTIndex > -1) {
  //         return usersWithoutMe[lastMTIndex];
  //       }
  //       break;
  //   }
  //
  //   return null;
  // };
  // const getOtherMemberNameSurname = (currentUser, otherUsers) => {
  //   const other = getOtherMember(currentUser, otherUsers);
  //   if (other) {
  //     return `${other.firstName || ""} ${other.lastName || ""}`;
  //   }
  //   return "-";
  // };

  return (
    <div
      className={`${classes.panelContainer} ${toggle ? "" : "closed"} ${
        unreadCount > 0 && "hasUnread"
      }`}
      ref={wrapperRef}
    >
      <div className={classes.panelHead} onClick={onToggle}>
        <div className={classes.panelHeadTitle}>
          <MessageOutlined className={classes.panelHeadIcon} width={24} />
          Chat with
        </div>
        <Badge className={classes.panelHeadBadge} count={unreadCount} />
      </div>
      <div className={classes.panelBody}>
        <div className={classes.chatView}>
          {/*{isLoading && <Loader fullScreen={false} />}*/}
          <div className={classes.chatScroller}>
            {messages.length > 0 && renderMessages(messages, null)}
            <div ref={lastMessageRef} />
          </div>
          <ChatControls
            enabled={true}
            isLoading={false}
            onAttachmentMenuOpenChange={onAttachmentMenuOpenChange}
            onMessageSend={onMessageSend}
            onAddTempMedia={onAddTempMedia}
            onRemoveTempMedia={onRemoveTempMedia}
          />
        </div>
      </div>
    </div>
  );
}

export default Chat;
