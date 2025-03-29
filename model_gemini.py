import google.generativeai as genai

genai.configure(api_key="AIzaSyAlR2NwfGDst7B0VD8AJg5AXPSDxpe4G-g")  # Replace with your actual API key

def list_available_models():
    """
    Lists all available Gemini models that can be used.
    """
    try:
        models = genai.list_models()
        print("Available Gemini Models:")
        for model in models:
            print(f"- {model.name}")
    except Exception as e:
        print(f"🚨 Error fetching models: {e}")

# Run the function to check available models
list_available_models()