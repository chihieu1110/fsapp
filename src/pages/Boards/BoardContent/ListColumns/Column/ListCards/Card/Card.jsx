import { Button, CardMedia, Typography } from '@mui/material'
import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import GroupIcon from '@mui/icons-material/Group'
import { Attachment, ModeComment } from '@mui/icons-material'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
function Card({ card }) {
  const { attributes, listeners, setNodeRef, transform, transition,isDragging } =
    useSortable({ id: card._id, data: { ...card } })

  const cardStyles = {
    touchAction:'none',
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 :undefined,
    border: isDragging ? '1px solid #000' : undefined && !isDragging ? '1px solid #fff' : undefined
  }
  const shouldShowCardActions = () => {
    return !!card?.memberIds?.length || !!card?.comments?.length || !!card?.comments?.length
  }
  return (
    <MuiCard
      ref={setNodeRef}
      style={cardStyles}
      {...attributes}
      {...listeners}
      sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
        overflow: 'unset',
        display:card?.FE_PlaceholderCard ? 'none' :'block',
        border:'1px solid transparent',
        ":hover":{ borderColor: (theme) => theme.palette.primary.main}

      }}
    >
      {card?.cover && (
        <CardMedia
          sx={{
            height: 140
          }}
          image={card?.cover}
        />
      )}
      <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
        <Typography gutterBottom variant="h5" component="div">
          {card?.title}
        </Typography>
      </CardContent>
      {shouldShowCardActions() &&
      <CardActions sx={{ p: '0 4px 8px 4px' }}>
        {!!card?.memberIds?.length && <Button size="small" startIcon={<GroupIcon />}>
          {card?.memberIds?.length}
        </Button> }
        {!!card?.comments?.length && <Button size="small" startIcon={<ModeComment />}>
          {card?.comments?.length}
        </Button> }
        {!!card?.comments?.length && <Button size="small" startIcon={<Attachment />}>
          {card?.attachments?.length}
        </Button>}
      </CardActions>
      }
    </MuiCard>
  )
}

export default Card
