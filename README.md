# Django App README

## Introduction

This README provides a step-by-step guide on how to install and set up a Django application. It also includes instructions on how to create and use a virtual environment, and how to install all necessary dependencies.

## Prerequisites

Before starting, ensure you have the following installed:

- Python (version 3.x)
- pip (Python package installer)
- virtualenv

## Installation Steps

### Step 1: Clone the Repository

Clone the Django application repository to your local machine using the following command:

```bash
git clone https://github.com/shauryasawai/Cohort
```

### Step 2: Navigate to the Project Directory

Change into the directory of the cloned repository:

```bash
cd Cohort
```

### Step 3: Create a Virtual Environment

Create a virtual environment using `virtualenv`:

```bash
python -m venv my_env
```
```bash
pip install virtualenv
```
This will create a virtual environment named `my_env`.

### Step 4: Activate the Virtual Environment

Activate the virtual environment using the following command:

- On Windows:
  ```bash
  my_env\Scripts\activate
  ```
- On macOS and Linux:
  ```bash
  source venv/bin/activate
  ```

### Step 5: Install Dependencies

With the virtual environment activated, install the required dependencies using `pip`:

```bash
pip install -r requirement.txt
```

This will install all the dependencies listed in the `full-requirements.txt` file.

### Step 6: Run Migrations

Apply the database migrations:

```bash
python manage.py migrate
```

### Step 7: Start the Development Server

Run the development server to start the application:

```bash
python manage.py runserver
```

Access the application at `http://127.0.0.1:8000/` in your web browser.

## Deactivating the Virtual Environment

To deactivate the virtual environment, simply run:

```bash
deactivate
```

## Additional Notes

- Ensure you have the latest version of `pip` by running `pip install --upgrade pip`.
- If you encounter any issues during the installation process, check the error messages for guidance and ensure all prerequisites are met.

# Social Media Post Generator - API Guide




## API Endpoints

### 1. **Home Page (Frontend UI)**
- **Endpoint:** `/`
- **Method:** `GET`
- **Description:** Renders the home page where users can input product details.
- **Usage:** This is for the frontend UI, where users can enter details via a form.

### 2. **Generate Social Media Post**
- **Endpoint:** `/api/generate_post/`
- **Method:** `POST`
- **Description:** Accepts product details and generates a social media post.
- **Request Body (JSON):**
  ```json
  {
    "product_name": "Awesome Phone X",
    "description": "A powerful smartphone with an amazing camera!",
    "target_audience": "Tech Enthusiasts"
  }
  ```
- **Response (JSON):**
  ```json
  {
    "generated_post": "🚀 Introducing Awesome Phone X! A powerful smartphone with an amazing camera 📸. Perfect for tech enthusiasts! #AwesomePhoneX #Tech"
  }
  ```

## Frontend Integration
- **For UI Rendering:** Use `fetch('/api/generate_post/', { method: 'POST', body: JSON.stringify(data) })` in JavaScript to send data and retrieve the generated post.
- **For Error Handling:** Ensure the API responses are properly validated before displaying messages.

## Setup Instructions (For Development)
1. **Install Dependencies:**
   ```sh
   pip install django django-cors-headers
   ```
2. **Run Migrations:**
   ```sh
   python manage.py migrate
   ```
3. **Start Server:**
   ```sh
   python manage.py runserver
   ```

## Notes for Frontend Developers
- The backend uses Django, and CORS is enabled to allow API calls from different domains.
- Ensure you include `Content-Type: application/json` in headers when making API requests.

For any issues, contact me on Whatsapp! 🚀


