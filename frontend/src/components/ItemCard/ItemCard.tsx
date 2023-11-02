import classes from "./ItemCard.module.css"

interface ItemCardProps {
  name: string
  description: string
  img: string
}

function ItemCard({ img, description, name }: ItemCardProps) {
  return (
    <div className={classes.container}>
      <img className={classes.img} src={img} alt="img" />
      <div>
        <p className={classes.name}>{name}</p>
        <p className={classes.text}>{description}</p>
      </div>
    </div>
  )
}

export default ItemCard
