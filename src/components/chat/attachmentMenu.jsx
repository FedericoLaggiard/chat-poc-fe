import {AudioOutlined, FileImageOutlined, PaperClipOutlined} from "@ant-design/icons";
import {Dropdown} from "antd";

function AttachmentMenu({onAttachmentSelected, onOpenChange, disabled}) {
    return (
        <Dropdown

            trigger={["click"]}
            menu={{items: [
                    {
                        key: "photo-video",
                        label: (<div onClick={() => onAttachmentSelected("photo-video")}>
                            <FileImageOutlined style={{fontSize: "16px", marginRight: "8px"}} />
                            Photo/Video Gallery
                        </div>)
                    },
                    {
                        key: "audio",
                        label: (<div onClick={() => onAttachmentSelected("audio")}>
                            <AudioOutlined style={{fontSize: "16px", marginRight: "8px"}} />
                            Audio
                        </div>)
                    },
                    {
                        key: "documents",
                        label: (<div onClick={() => onAttachmentSelected("documents")}>
                            <PaperClipOutlined style={{fontSize: "16px", marginRight: "8px"}} />
                            Documents
                        </div>)
                    },
                ],}}
            onOpenChange={onOpenChange}
            disabled={true}
        >
            <PaperClipOutlined style={{fontSize: "16px"}} />
        </Dropdown>
    )
}

export default AttachmentMenu;