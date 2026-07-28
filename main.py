from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session

import models
import schemas
from database import Base, engine, get_db

app = FastAPI(title="Task Manager")

# Create database tables
Base.metadata.create_all(bind=engine)

# Static files and templates
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")


# Home Page
@app.get("/", response_class=HTMLResponse)
def home(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="index.html"
    )

# Get all tasks
@app.get("/tasks", response_model=list[schemas.TaskResponse])
def get_tasks(db: Session = Depends(get_db)):
    return db.query(models.Task).all()


# Add task
@app.post("/tasks", response_model=schemas.TaskResponse)
def add_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    title = task.title.strip()

    if not title:
        raise HTTPException(status_code=400, detail="Task title cannot be empty")

    new_task = models.Task(
        title=title,
        completed=False
    )

    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    return new_task


# Update task
@app.put("/tasks/{task_id}", response_model=schemas.TaskResponse)
def update_task(task_id: int, task: schemas.TaskUpdate, db: Session = Depends(get_db)):
    db_task = db.query(models.Task).filter(models.Task.id == task_id).first()

    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")

    db_task.title = task.title.strip()
    db_task.completed = task.completed

    db.commit()
    db.refresh(db_task)

    return db_task


# Delete task
@app.delete("/tasks/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    db_task = db.query(models.Task).filter(models.Task.id == task_id).first()

    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")

    db.delete(db_task)
    db.commit()

    return {"message": "Task deleted successfully"}