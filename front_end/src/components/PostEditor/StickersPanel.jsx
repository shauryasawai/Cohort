import React from 'react'

const StickersPanel = () => {
  const stickers = [
    { id: 1, url: 'https://img.freepik.com/premium-photo/stickers-instagram-post-15_1202918-286.jpg' },
    { id: 2, url: 'https://img.freepik.com/premium-photo/stickers-instagram-post-15_1202918-286.jpg' }
  ]

  const addSticker = (stickerUrl) => {
    console.log('Adding sticker:', stickerUrl)
  }

  return (
    <div className="element-container" style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '15px',
      justifyContent: 'center',
      margin: '20px 0',
      padding: '15px',
      background: 'rgba(255, 255, 255, 0.8)',
      borderRadius: '15px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
    }}>
      <h3 style={{
        width: '100%',
        fontSize: '1.5rem',
        color: '#2c3e50',
        marginBottom: '10px'
      }}>Stickers</h3>
      
      {stickers.map(sticker => (
        <img 
          key={sticker.id}
          src={sticker.url} 
          alt={`Sticker ${sticker.id}`}
          onClick={() => addSticker(sticker.url)}
          style={{
            width: '100px',
            height: '100px',
            cursor: 'pointer',
            border: '2px solid transparent',
            borderRadius: '10px',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.borderColor = '#28a745'
            e.target.style.transform = 'scale(1.1)'
            e.target.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)'
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = 'transparent'
            e.target.style.transform = 'scale(1)'
            e.target.style.boxShadow = 'none'
          }}
        />
      ))}
    </div>
  )
}

export default StickersPanel