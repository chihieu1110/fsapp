import { Button, CardMedia, Typography } from '@mui/material'
import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import GroupIcon from '@mui/icons-material/Group'
import { Attachment, ModeComment } from '@mui/icons-material'

function Card({ card }) {
  const shouldShowCardActions = () => {
    return !!card?.memberIds?.length || !!card?.comments?.length || !!card?.comments?.length
  }
  return (
    <MuiCard
      sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
        overflow: 'unset'
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