import { formatDistanceToNow, parseISO } from 'date-fns'

interface TimeAgoProps {
  timestamp: string
}

const TimeAgo = ({ timestamp }: TimeAgoProps) => {
  let timeAgo = ''
  if(timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`
  }
  return (
    <span title={timestamp}>
      {" "} <i>{timeAgo}</i>
    </span>
  )
}

export default TimeAgo