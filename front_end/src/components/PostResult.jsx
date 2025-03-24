const PostResult = ({ postData }) => {
    return (
      <div className="result-container">
        <h3>📢 Generated Post:</h3>
        <p>{postData.post_text}</p>
        {postData.image_url && <img src={postData.image_url} alt="Generated Post" />}
      </div>
    );
  };
  
  export default PostResult;
  