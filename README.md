Task Manager Web App

Live Demo

[https://your-app-name.onrender.com](https://task-manager-web-app-production-591e.up.railway.app/)

GitHub Repository

https://github.com/YourUsername/task-manager-web-app

Overview

Task Manager Web App is a full-stack application built with FastAPI, SQLite, HTML, CSS, and JavaScript. It allows users to manage daily tasks through a clean and simple interface. Tasks are stored in a SQLite database, so they remain available after refreshing the page or restarting the server.

Features

- Add new tasks
- Edit existing tasks
- Mark tasks as complete or incomplete
- Delete tasks
- Persistent task storage using SQLite
- Input validation for task titles
- Clean and responsive user interface

Technologies Used

- FastAPI
- SQLAlchemy
- SQLite
- Pydantic
- Jinja2
- HTML5
- CSS3
- JavaScript

Project Structure

task-manager-web-app/
│── main.py
│── database.py
│── models.py
│── schemas.py
│── requirements.txt
│── tasks.db
│
├── templates/
│   └── index.html
│
└── static/
    ├── style.css
    └── script.js

Installation

1. Clone the repository:
   
   git clone https://github.com/YourUsername/task-manager-web-app.git

2. Open the project folder:
   
   cd task-manager-web-app

3. Create a virtual environment:
   
   python -m venv venv

4. Activate the virtual environment:
   
   Windows
   
   venv\Scripts\activate

5. Install dependencies:
   
   pip install -r requirements.txt

6. Run the application:
   
   python -m uvicorn main:app --reload

7. Open your browser:
   
   http://127.0.0.1:8000

API Endpoints

Method| Endpoint| Description
GET| /tasks| Get all tasks
POST| /tasks| Create a new task
PUT| /tasks/{task_id}| Update a task
DELETE| /tasks/{task_id}| Delete a task

Author

Sadia Shabir

License

This project is created for educational purposes as part of the Week 3 Module Project.
