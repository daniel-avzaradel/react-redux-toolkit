import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { PostsState, reactionsAdded } from './postSlice';

const reactionEmoji = {
  thumbsUp: '👍',
  wow: '😲',
  heart: '❤️',
  rocket: '🚀',
  coffee: '☕'
}

interface ReactionButtonsProps {
  post: PostsState
}

const ReactionButtons = ({post}: ReactionButtonsProps) => {

  const dispatch = useDispatch<AppDispatch>();

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button style={{padding: '4px 10px'}} key={name} type='button'
      className='reactionButton'
      onClick={() => dispatch(reactionsAdded({postId: post.id, reaction: name}))}>
        {emoji} {post.reactions[name as keyof typeof post.reactions]}
      </button>
    )
  })

  return (
    <div style={{display: 'flex', fontSize: 'clamp(14px, 1.2vw, 18px)', gap: '2px'}}>{reactionButtons}</div>
  )
}

export default ReactionButtons