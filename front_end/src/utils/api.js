export const generatePost = async (postData) => {
  console.log("Sending request with:", postData);
  try {
    const response = await fetch(`${API_BASE_URL}/generate-post/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product_name: postData.productName,
        description: postData.description,
        target_audience: postData.targetAudience
      })
    });

    console.log("Response status:", response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error:", errorText);
      throw new Error(errorText || 'Request failed');
    }

    const data = await response.json();
    console.log("API Response:", data);
    return data;
    
  } catch (error) {
    console.error("Full error:", error);
    throw error;
  }
};