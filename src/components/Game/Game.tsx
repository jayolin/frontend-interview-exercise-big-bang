import classes from "./Game.module.css";

interface Props {
  onReset?: () => void;
}

function Game(props: Props) {
  const { onReset } = props;

  return (
    <div className={classes.root}></div>
  )
}

export default Game;
