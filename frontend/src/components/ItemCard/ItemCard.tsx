import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material"
import { useNavigate } from "react-router-dom"

interface ItemCardProps {
  id: number
  description: string
  img: string
  quantity: number
  name: string
}

function ItemCard({ img, description, quantity, name, id }: ItemCardProps) {
  const navigate = useNavigate()

  return (
    <Card
      sx={{
        width: 400,
        bgcolor: "#f4f4f4",
        boxShadow: "none",
      }}
    >
      <CardActionArea onClick={() => navigate(`/reserve/${id}`)}>
        <CardMedia
          component="img"
          height="300"
          width="500"
          image={img}
          alt={description}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            height={170}
            pb={0}
          >
            {description}
          </Typography>
          <Box display="flex" justifyContent="flex-end">
            <Chip
              color={
                quantity > 30 ? "success" : quantity > 10 ? "warning" : "error"
              }
              label={
                quantity === 0 ? "Agotado" : `Reservas disponibles: ${quantity}`
              }
            ></Chip>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default ItemCard
