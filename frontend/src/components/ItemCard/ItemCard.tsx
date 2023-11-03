import classes from "./ItemCard.module.css";
import classNames from "classnames"

interface ItemCardProps {
  name: string;
  description: string;
  img: string;
  status: "free" | "not-available" | "reserved";
}

function ItemCard({ img, description, name, status }: ItemCardProps) {
  const statusClass = classNames({
    [classes.status]: true,
    [classes.free]: status === "free",
    [classes.notAvailable]: status === "not-available",
    [classes.reserved]: status === "reserved",
  })
  return (
    <div className={classes.container}>
      <img className={classes.img} src={img} alt="img" />
      <div>
        <p className={classes.name}>{name}</p>
        <p className={classes.text}>{description}</p>
        <p className={statusClass}>{status}</p>
      </div>
    </div>
  );
}

export default ItemCard;
