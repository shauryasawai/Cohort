import React from 'react'
import { finalizePost } from '../../utils/api'

const FinalizeForm = ({ productName, caption, hashtags, onCaptionChange, onHashtagsChange }) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [error, setError] = React.useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    
    try {
      const response = await finalizePost({
        product_name: productName,
        caption,
        hashtags
      })
      
      console.log('Post finalized:', response)
      // Handle successful submission (redirect, show success message, etc.)
    } catch (err) {
      setError(err.message || 'Failed to finalize post')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{
      background: 'rgba(255, 255, 255, 0.8)',
      padding: '20px',
      borderRadius: '15px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
      margin: '20px auto',
      maxWidth: '800px'
    }}>
      <p><strong>Product Name:</strong> {productName}</p>

      <label htmlFor="edited_caption" style={{
        fontSize: '1.2rem',
        color: '#2c3e50',
        marginTop: '10px',
        display: 'block'
      }}>
        <strong>Edit Caption:</strong>
      </label>
      <textarea 
        name="edited_caption" 
        rows="4" 
        value={caption}
        onChange={(e) => onCaptionChange(e.target.value)}
        style={{
          width: '90%',
          maxWidth: '600px',
          padding: '12px',
          fontSize: '16px',
          border: '2px solid #2c3e50',
          borderRadius: '8px',
          margin: '10px 0',
          transition: 'border-color 0.3s ease'
        }}
      />
      
      <label htmlFor="edited_hashtags" style={{
        fontSize: '1.2rem',
        color: '#2c3e50',
        marginTop: '10px',
        display: 'block'
      }}>
        <strong>Edit Hashtags:</strong>
      </label>
      <textarea 
        name="edited_hashtags" 
        rows="2" 
        value={hashtags}
        onChange={(e) => onHashtagsChange(e.target.value)}
        style={{
          width: '90%',
          maxWidth: '600px',
          padding: '12px',
          fontSize: '16px',
          border: '2px solid #2c3e50',
          borderRadius: '8px',
          margin: '10px 0',
          transition: 'border-color 0.3s ease'
        }}
      />
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <button 
        className="btn-green" 
        type="submit" 
        disabled={isSubmitting}
        style={{
          margin: '10px',
          padding: '12px 20px',
          fontSize: '16px',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          border: 'none',
          backgroundColor: isSubmitting ? '#6c757d' : '#28a745',
          color: 'white'
        }}
      >
        {isSubmitting ? 'Submitting...' : 'Finalize Post'}
      </button>
    </form>
  )
}

export default FinalizeForm