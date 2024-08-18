import {Button, Input, message} from "antd";
import AttachmentMenu from "./attachmentMenu";
import {SendOutlined} from "@ant-design/icons";
import Upload from "antd/es/upload/Upload";
import {useRef, useState} from "react";
import {createUseStyles} from "react-jss";
import styles from "./styles";

const useStyles = createUseStyles(styles);
function ChatControls({isLoading, onAttachmentMenuOpenChange, onMessageSend, onAddTempMedia, onRemoveTempMedia, enabled=true}) {
    const classes = useStyles();
    const [messageInput, setMessageInput] = useState("");
    const [fileList, setFileList] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [showUploadList, setShowUploadList] = useState(true);
    const uploadRef = useRef(null);

    const onSend = () => {
        if(messageInput || fileList.length > 0) {
            onMessageSend(messageInput);
            setMessageInput("");
            setShowUploadList(false);
            setTimeout(() => {
                setShowUploadList(true);
            }, 300);
        }
    }

    const onAttachmentSelected = (type) => {
        uploadRef.current?.upload?.uploader?.onClick();
    }

    const handleFileUpload = ({
                                  file,
                                  onProgress,
                                  onError,
                                  onSuccess,
                                  data,
                                  filename,
                              }) => {
        const formData = new FormData();
        if (data) {
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]);
            });
        }
        formData.append(filename, file);

        onAddTempMedia({
            file,
            formData,
            onProgress: (...arg) => {
                onProgress(arg);
            },
            onSuccess,
            onError,
        });

    };
    const handleChange = async (info) => {
        const { status } = info.file;
        switch(status){
            case "uploading":
                if(info.event){
                    const progress = info.event[0].percent;
                    if(progress) {
                        info.file.percent = progress;
                    }
                }
                break;
            case "done":
                message.success(`file ${info.file.name} added successfully.`);
                break;
            case "removed":
                message.info(`file ${info.file.name} removed successfully.`);
                break;
            case "error":
                message.error(`file ${info.file.name}  upload failed.`);
                break;
        }

        if (
            info.fileList.filter((f) => f.status === "uploading").length > 0
        ) {
            setIsUploading(true);
        } else {
            setIsUploading(false);
        }
        if (status !== "uploading") {
        }
        if (status === "done") {

        } else if (status === "error") {

        }
    };
    const beforeUpload = (file) => {
        setFileList([...fileList, file]);
    };
    const onRemove = async (file) => {
        onRemoveTempMedia(file);
        return true;
    };

    return (
        <div className={classes.chatFooter}>
            <div className={classes.chatControls}>
                <Input
                    value={messageInput}
                    disabled={isLoading || !enabled}
                    onKeyDown={(e) => {
                        if (e.key === "Enter")
                            onSend();
                    }}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder={"input"}
                    className={classes.chatInput}
                    suffix={
                        <AttachmentMenu
                            onAttachmentSelected={onAttachmentSelected}
                            onOpenChange={onAttachmentMenuOpenChange}
                            disabled={!enabled}
                        />
                    }
                />
                <Button
                    icon={<SendOutlined />}
                    onClick={onSend}
                    disabled={isLoading || !enabled}
                />
            </div>
            {showUploadList &&
                <div className={classes.fileList}>
                    <Upload
                        ref={uploadRef}
                        disabled={!enabled}
                        // fileList={fileList}
                        customRequest={handleFileUpload}
                        onChange={handleChange}
                        beforeUpload={beforeUpload}
                        onPreview={() => {}}
                        onRemove={onRemove}
                    />
                </div>
            }
        </div>
    );


}

export default ChatControls;