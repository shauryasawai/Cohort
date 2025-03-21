import openai

# Set your OpenAI API key
openai.api_key = "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"

def list_available_models():
    try:
        models = openai.models.list()
        for model in models.data:  # Correct way to access the list of models
            print(model.id)
    except Exception as e:
        print("Error fetching models:", str(e))

# Run the function
list_available_models()

