import LayoutEffects from "./layout-effects"
import Project from "./project"
import DOMHandler from "./dom-handler"
import Lib from "./dom-library"
import Sortable from "./Sortable.min"
import Storage from "./storage"

let activeProject

// NEW PROJECT FORM
Lib.attachEvent("#new-project-form", e => {
  e.preventDefault()
  generateProject()
  DOMHandler.resetProjectModal()
}, 'submit')

// NEW TASK FORM
Lib.attachEvent("#new-task-form", e => {
  e.preventDefault()
  if (activeProject) {
    generateTask()
    DOMHandler.resetTaskModal()
  }
  else alert("No project is loaded. Please create or load a project first.")

}, 'submit')

// LOAD PROJECT
Lib.attachEvent(".sidebar-link", e => {
  e.preventDefault()
  loadProjectData(e.target.dataset.id)
}, 'click', true)

// COMPLETION STATUS TOGGLER
Lib.attachEvent(".hidden-checkbox", e => {
  let taskDOM = Lib.findAncestor(e.target, "task")
  let taskId = taskDOM.dataset["task_id"]
  if(e.target.checked) {
    activeProject.findTask(taskId).complete = true
    taskDOM.classList.add("complete")
  }
  else if(!e.target.checked){
    activeProject.findTask(taskId).complete = false
    taskDOM.classList.remove("complete")
  }
  activeProject.save()
}, 'change', true)

// DESTROY PROJECT
Lib.attachEvent(".delete-project-button", e => {
  if (activeProject && confirm('Are you sure you want to delete this project and all of its tasks?')) {
    const id = activeProject.id
    Project.destroy(activeProject)
    tryLoadingFirstProject()
    DOMHandler.destroyProject(id)
  }
})

// DESTROY TASK
Lib.attachEvent(".delete-task-button", e => {
  if (confirm('Are you sure you want to delete this task?')) {
    const id = e.target.dataset["target_task_id"]
    activeProject.remove(id)
    DOMHandler.destroyTask(id)
  }
}, 'click', true)

// SORTABLE TASK LIST
const sortable = Sortable.create(Lib.find(".task-list"), {
  animation: 150,
  delay: 0,
  draggable: ".task",
  dataIdAttr: 'data-task_id',
  handle: ".handle",
  onSort: e => sortTasks(e)
})

// MANUALLY SORT TASKS
const sortTasks = e => {
  let item = activeProject.tasks.splice(e.oldIndex, 1)[0]
  activeProject.tasks.splice(e.newIndex, 0, item)
  activeProject.save()
}

// AUTO SORT
Lib.attachEvent(".sort-button", e => {
  activeProject.tasks.sort((a, b) => {
    return a.complete - b.complete || b.priority - a.priority || (b.dueDate < a.dueDate ? 1 : -1)
  });
  sortable.sort(activeProject.tasks.map(task => task.id))
  activeProject.save()
})

// CREATE PROJECT
const generateProject = () => {
  let project = Project.create(document.forms["project"]["name"].value)
  DOMHandler.createProject(project)
  loadProjectData(project.id)
}

// CREATE TASK
const generateTask = () => {
  let task = activeProject.newTask(...taskFormData())
  DOMHandler.createTask(task, true)
}

// RETRIEVE TASK FORM DATA
const taskFormData = () => {
  const name = document.forms["task"]["name"].value
  const desc = document.forms["task"]["description"].value
  const dueDate = document.forms["task"]["due_date"].value
  const priority = parseInt(document.forms["task"]["priority"].value)
  return [name, desc, dueDate, priority]
}

// LOAD PROJECT
const loadProjectData = id => {
  let project = Project.find(id)
  Storage.saveLastOpen(id)
  activeProject = project
  DOMHandler.enableProjectPanel()
  loadTasks(project)
  DOMHandler.updateProjectTitle(project)
  DOMHandler.closeSidebar()
}

// LOAD ANOTHER PROJECT (AFTER DELETING CURRENT ACTIVE)
const tryLoadingFirstProject = () => {
  if (Project.meta.length > 0)
    loadProjectData(Project.meta[0].id)
  else {
    DOMHandler.disableProjectPanel()
    DOMHandler.clearProjectPanel()
  }
}

// LOAD TASKS
const loadTasks = project => {
  DOMHandler.clearTasks()
  project.tasks.forEach(task => DOMHandler.createTask(task))
}


(() => {
  Project.meta.forEach(project => DOMHandler.createProject(project))
  const lastOpen = Storage.loadLastOpen()
  lastOpen ?  loadProjectData(lastOpen) : tryLoadingFirstProject()
})()
