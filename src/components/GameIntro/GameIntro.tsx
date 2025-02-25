import classes from "./GameIntro.module.css";

interface Props {
  onequestStart?: () => void;
}

function GameIntro(props: Props) {
  const { onRequestStart } = props;

  return (
    <div className={classes.root}></div>
  )
}

export default GameIntro;
