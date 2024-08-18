export const panelContainer = {
    height: "90%",
    width: "477px",
    borderRadius: "16px 0 0 0",
    backgroundColor: "white",
    boxShadow:
        " 0px 9px 28px 8px rgba(0, 0, 0, 0.05), 0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 6px 16px 0px rgba(0, 0, 0, 0.08)",
    transition: "height .5s ease-out",

    "&.hasUnread": {
      color: "rgba(245, 34, 45, 1)",
    },

    "&.closed": {
        // height: "72px",
    },

    "& h2": {
        fontSize: "14px",
    },

    "& h3": {
        fontSize: "12px",
        fontWeight: "600",
    },

    "& .ant-card": {
        boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.10)",
    },
};

export const panelHead = {
    height: "32px",
    padding: "24px",
    display: "flex",
    fontSize: "14px",
    fontWeight: "bold",
    justifyContent: "space-between",
    alignItems: "center",
    flexShrink: "0",
    borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
    "@media screen and (max-width: 1024px)": {
        fontSize: "12px",
    },
};

export const panelHeadIcon = {
    marginRight: "17px",
    fontSize: "20px",
};
export const panelHeadTitle = {
    textOverflow: "ellipsis",
    overflow: "hidden",
    wordBreak: "break-all",
    whiteSpace: "nowrap",
    maxWidth: "309px",
    paddingRight: "5px",
};
export const panelHeadBadge = {
    //marginLeft: "17px",
};

export const panelBody = {
    height: "89%",
    overflowY: "auto",
    overflowX: "hidden",
};

export const chatView = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    width: "100%",
};

export const chatScroller = {
    width: "100%",
    height: "100%",
    padding: "0 15px 15px 15px",
    overflowY: "auto",
    overflowX: "hidden",
    backgroundColor: "rgba(240, 245, 255, 1)",

    "& .chatItemHead": {
        display: "none",
    },

    "& .current-user .ant-card": {
        backgroundColor: "rgba(214, 228, 255, 1)",
    },

    // "& .chatItem-0-2-114 > .ant-row:nth-child(1)": {
    //     display: "none",
    // },
    //
    // "& .lastOfGroup-0-2-115 > .ant-row:nth-child(1)": {
    //     display: "none",
    // },
};

export default {
    panelContainer,
    panelHead,
    panelHeadTitle,
    panelHeadIcon,
    panelHeadBadge,
    panelBody,
    chatView,
    chatScroller,
}