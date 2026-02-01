function LikeDislike({ reaction, onLike, onDislike }) {
  return (
    <div style={{ display: 'flex', gap: '5px' }}>
      <button onClick={onLike}>
        {reaction === 'like' ? '👍' : '👍🏻'}
      </button>
      <button onClick={onDislike}>
        {reaction === 'dislike' ? '👎' : '👎🏻'}
      </button>
    </div>
  )
}

export default LikeDislike