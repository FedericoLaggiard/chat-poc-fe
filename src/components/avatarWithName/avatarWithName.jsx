import Avatar from "antd/es/avatar/avatar";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  avatarContainer: {
    backgroundColor: "#91CAFF",
    borderRadius: "20px",
    cursor: "pointer",
  },
});

function AvatarWithName({ name, ...props }) {
  const classes = useStyles();
  return (
    <Avatar
      shape="square"
      size="medium"
      className={classes.avatarContainer}
      style={{
        ...props.style,
        verticalAlign: "middle",
      }}
    >
      {name}
    </Avatar>
  );
}
export default AvatarWithName;
