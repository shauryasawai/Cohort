import google.generativeai as genai

genai.configure(api_key="AIzaSyD6eLsSvvFHRJNZSRDBTDNV55nJtAeIJ3I")

models = list(genai.list_models())  # Convert generator to a list
for model in models:
    print(model.name)  # Print available model names
