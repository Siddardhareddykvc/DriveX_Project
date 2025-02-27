
# DriveX Assignment Submission

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies](#technologies)
- [Setup Instructions](#setup-instructions)
- [How to Use](#how-to-use)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Overview
The **DriveX Assignment Submission** is a practical implementation of the assignment requirements, focusing on modularity, scalability, and code readability. The project enables users to upload XLSX files, process them, and ask questions based on the extracted content. AI is leveraged to answer these questions, providing a user-friendly experience while maintaining robust performance.

## Features
- **File Upload**: Allows users to upload Excel files (XLSX) for processing.
- **AI-powered Q&A**: Users can ask questions, and the AI will respond with relevant answers derived from the document content.
- **Validation and Error Handling**: Proper validation is applied to user inputs, ensuring smooth functionality and preventing errors.
- **Extensibility**: The code is modular, allowing easy future enhancements and improvements.
- **Optimized for Scalability**: Capable of handling large documents efficiently with proper optimization.

## Technologies
The project utilizes the following tools and technologies:
- **Programming Language**: Python / JavaScript (Node.js), depending on your choice.
- **Frameworks**:
  - **Frontend**: React.js, HTML5, CSS3 (or other preferred frameworks)
  - **Backend**: Flask (Python) or Express.js (Node.js)
  - **AI**: OpenAI API (or equivalent NLP service for Q&A)
- **Deployment**: Hosted on platforms such as AWS, Vercel, or Netlify for easy access.
  
## Setup Instructions

To run the project locally, follow the steps below:

### 1. Clone the repository:
```bash
git clone https://github.com/Siddardhareddykvc/DriveX_Project.git
```

### 2. Navigate to the project directory:
```bash
cd DriveX_Project
```

### 3. Install dependencies:

#### For Python:
```bash
pip install -r requirements.txt
```

#### For Node.js:
```bash
npm install
```

### 4. Set up environment variables:
- Create a `.env` file in the root directory.
- Define necessary environment variables (e.g., API keys or database configurations).

### 5. Launch the application:

#### For Python:
```bash
python app.py
```

#### For Node.js:
```bash
npm start
```

## How to Use
- Start the app using the commands provided above.
- Open your browser and navigate to `http://localhost:5173` (or another specified port).
- Upload an Excel document and start asking questions via the user interface. The AI will provide responses based on the content.

## Project Structure
The project is organized to maintain clarity and scalability:

```
DriveX-Assignment-Submission/
├── src/                        # Core components, services, models
│   ├── components/             # React components or main frontend logic
│   ├── services/               # Backend logic and APIs
│   ├── models/                 # Database models (if any)
│   ├── routes/                 # API routes
│   └── utils/                  # Helper functions and utilities
├── tests/                      # Unit and integration tests
├── public/                     # Static assets (images, fonts, etc.)
├── .env                        # Environment configuration
├── README.md                   # Project documentation
├── requirements.txt            # Python dependencies (if applicable)
└── package.json                # Node.js dependencies (if applicable)
```


## Screenshots of Deployment
Below are some images showcasing the deployed application:
![Screenshot 2025-01-18 202527](https://github.com/user-attachments/assets/8d36debd-33a8-4e37-894d-cb6af2309ef2)
![Screenshot 2025-01-18 202616](https://github.com/user-attachments/assets/41a50cba-68a0-4ed5-9e8e-268619b96fb5)



## License
This project is licensed under the MIT License. You can view the full license in the [LICENSE](LICENSE) file.

