import React from 'react'

const ControlsPanel = ({ onUndo }) => {
  const [text, setText] = React.useState('')
  const [textColor, setTextColor] = React.useState('#000000')
  const [textSize, setTextSize] = React.useState(20)
  const [bgColor, setBgColor] = React.useState('#ffffff')

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        // Handle the uploaded image
        console.log('Image uploaded:', event.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const addText = () => {
    if (text.trim()) {
      // Add text to canvas
      console.log('Adding text:', { text, color: textColor, size: textSize })
      setText('')
    }
  }

  return (
    <div id="controls" style={{
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: '15px',
      margin: '20px 0'
    }}>
      <input 
        type="file" 
        id="uploadLogo" 
        accept="image/*" 
        onChange={handleFileUpload}
        style={{
          margin: '10px',
          padding: '12px 20px',
          fontSize: '16px',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      />
      
      <input 
        type="color" 
        id="bgColor" 
        value={bgColor}
        onChange={(e) => setBgColor(e.target.value)}
        style={{
          margin: '10px',
          padding: '5px',
          height: '40px',
          width: '60px',
          borderRadius: '8px',
          border: '2px solid #2c3e50'
        }}
      />
      
      <input 
        type="text" 
        id="customText" 
        placeholder="Enter text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          margin: '10px',
          padding: '12px',
          fontSize: '16px',
          borderRadius: '8px',
          border: '2px solid #2c3e50'
        }}
      />
      
      <button 
        className="btn-green" 
        onClick={addText}
        style={{
          margin: '10px',
          padding: '12px 20px',
          fontSize: '16px',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          border: 'none',
          backgroundColor: '#28a745',
          color: 'white'
        }}
      >
        Add Text
      </button>
      
      <label htmlFor="textColor">Text Color:</label>
      <input 
        type="color" 
        id="textColor" 
        value={textColor}
        onChange={(e) => setTextColor(e.target.value)}
        style={{
          margin: '10px',
          padding: '5px',
          height: '40px',
          width: '60px',
          borderRadius: '8px',
          border: '2px solid #2c3e50'
        }}
      />
      
      <label htmlFor="textSize">Text Size:</label>
      <input 
        type="range" 
        id="textSize" 
        min="10" 
        max="100" 
        value={textSize}
        onChange={(e) => setTextSize(parseInt(e.target.value))}
        style={{
          width: '150px',
          margin: '10px'
        }}
      />
      
      <button 
        className="btn-green" 
        onClick={() => console.log('Remove selected')}
        style={{
          margin: '10px',
          padding: '12px 20px',
          fontSize: '16px',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          border: 'none',
          backgroundColor: '#28a745',
          color: 'white'
        }}
      >
        Remove Selected
      </button>
      
      <button 
        className="btn-green" 
        onClick={onUndo}
        style={{
          margin: '10px',
          padding: '12px 20px',
          fontSize: '16px',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          border: 'none',
          backgroundColor: '#28a745',
          color: 'white'
        }}
      >
        Undo
      </button>
    </div>
  )
}

export default ControlsPanel