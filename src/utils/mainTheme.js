const mainTheme = {
  token: {
    // Seed Token
    // colorPrimary: '#00b96b',
    // Alias Token
    // colorBgContainer: '#f6ffed',
    screenLGMin: 1025, // for grid (row/col)
    screenLG: 1025, // default is 1600, for List
    fontFamily: "Roboto",
    colorBgContainerDisabled: "rgba(0, 0, 0, 0.02)",
    colorTextDisabled: "rgb(0 ,0 ,0 , 0.54)",
  },
  components: {
    Card: {
      paddingLG: "24px 40px 24px 40px",
    },
    Form: {
      labelFontSize: 12,
      controlHeight: 32,
      fontSize: 12,
    },
    Select: {
      controlHeight: 32,
      optionPadding: "0 12px",
      optionHeight: 24,
      multipleItemHeight: 24,
      optionFontSize: 12,
      controlPaddingHorizontalSM: 18,
      controlPaddingHorizontal: 22,
      fontSize: 12,
      optionSelectedBg: "#EBEBF0",
      colorPrimaryHover: "rgb(22, 119, 255)",
      colorPrimary: "rgb(22, 119, 255)",
      algorithm: true,
      multipleSelectorBgDisabled: "rgb(235 19 19 / 74%)",
    },
    Radio: { colorPrimary: "rgb(2, 2, 2)", algorithm: true },
    Checkbox: {
      colorPrimary: "rgb(2, 2, 2)",
      algorithm: true,
      colorPrimaryHover: "none",
    },
    Cascader: { colorPrimary: "rgb(2, 2, 2)", algorithm: true },
    DatePicker: {
      controlHeight: 32,
      fontSize: 12,
      colorPrimary: "rgb(2, 2, 2)",
      algorithm: true,
    },
    Input: {
      labelFontSize: "12",
      controlHeightMD: 24,
      controlHeightLG: 32,
      fontSize: 12,
    },
    Notification: {
      width: 640,
    },
    Layout: {
      bodyBg: "#EBEBF0",
      headerBg: "#1b1d21",
      siderBg: "#1b1d21",
    },
    Menu: {
      darkItemBg: "#1b1d21",
      darkItemSelectedBg: "#1b1d21",
    },
    Tabs: {
      itemSelectedColor: "#1b1d21",
      itemHoverColor: "#1b1d21",
      itemColor: "#5b5e61",
      inkBarColor: "#1b1d21",
      itemActiveColor: "#1b1d21",
    },
    Button: {
      colorPrimary: "#242426",
      algorithm: true,
    },
    Spin: {
      colorPrimary: "#242426",
      dotSize: 40,
      contentHeight: 1500,
      algorithm: true,
    },
    Typography: {
      //fontFamily: "ferrari-sans-bold",
      algorithm: true,
      fontSizeHeading5: "14px",
      fontSizeHeading3: "26px",
    },
    Table: {
      headerBg: "#dee1e5",
      headerColor: "#7f8998",
      headerSplitColor: "#dee1e5",
      bodySortBg: "",
      cellFontSize: "12px",
      cellPaddingBlock: "12",
      cellPaddingInline: "8",
      rowHoverBg: "",
      rowSelectedBg: "",
      rowSelectedHoverBg: "",
    },
    Segmented: {
      // itemActiveBg: "#242426",
      itemSelectedBg: "#242426",
      itemSelectedColor: "#FFFFFF",
    },
  },
};

export default mainTheme;
