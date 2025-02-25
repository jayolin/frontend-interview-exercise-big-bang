import classes from "./GameIntro.module.css";

interface Props {
  onRequestStart?: () => void;
}

function GameIntro(props: Props) {
  const { onRequestStart } = props;

  return (
    <div className={classes.root}></div>
  )
}

export default GameIntro;
