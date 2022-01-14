import useStyles from "../styles/components/roundButton";

const RoundButton = ({ color, handleClick, selected }: any) => {
  const classes = useStyles();
  return (
    <button
      type="button"
      className={classes.root}
      style={{
        backgroundColor: color,
        border: selected ? "2px solid grey" : "none",
      }}
      onClick={handleClick}
    />
  );
};

export default RoundButton;
