const PostPreview = ({ data }) => {
    return (
      <div className="post-preview">
        <h3>Preview</h3>
        <div className="preview-image">
          <img src={data.imageUrl} alt={data.productName} />
        </div>
        <div className="preview-caption">
          <p>{data.caption}</p>
          <p>{data.hashtags}</p>
        </div>
      </div>
    );
  };
  
  export default PostPreview;