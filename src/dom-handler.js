import Lib from "./dom-library"
import { distanceInWordsToNow, format } from 'date-fns'

const DOMHandler = (() => {
  const createProject = project => {
    const list = Lib.find(".sidebar-list")
    const element = Lib.create("li")
    const link = Lib.create("a", { href: "#", classes: "sidebar-link", text: project.name })
    link.dataset.id = project.id
    element.appendChild(link)
    list.appendChild(element)
  }

  const prio = prioValue => {
    const matrix = ["Low", "Normal", "High"]
    return matrix[prioValue - 1]
  }

  const prioClass = prioValue => {
    return prio(prioValue).toLowerCase() + "-prio"
  }

  const createTask = (task, prepend = false) => {
    const list = Lib.find(".task-list")
    let classes = ["task", prioClass(task.priority)]
    if (task.complete) classes.push("complete")

    const element = Lib.create("li", { classes: classes  })
    element.dataset["task_id"] = task.id

    const header = createTaskHeader(task)
    const body = createTaskBody(task)

    prepend ? list.prepend(element) : list.appendChild(element)
    Lib.append(element, [header, body])
  }

  const createTaskHeader = task => {
    const header = Lib.create("div", { classes: "task-header" })
    const handle = Lib.create("div", { classes: "handle" })
    const handleIcon = Lib.create("i", { classes: "fas fa-thumbtack" })
    const headerContent = Lib.create("div", { classes: "task-header-content" })
    const taskName = Lib.create("h3", { classes: "task-name", text: task.name })
    const taskInfo = Lib.create("div", { classes: "task-info" })
    const dueDate = Lib.create("div", { classes: "task-due-date", text: format(task.dueDate, "hh:mm a | MMM DD, YYYY") })
    const detailsToggler = Lib.create("button", { classes: "details-toggler", type: "button" })

    Lib.append(header, [handle, headerContent])
    Lib.append(handle, [handleIcon])
    Lib.append(headerContent, [taskName, taskInfo])
    Lib.append(taskInfo, [dueDate, detailsToggler])

    return header
  }

  const createTaskBody = task => {
    const body = Lib.create("div", { classes: "task-body" })

    const details = Lib.create("div", { classes: "task-details" })
    const urgency = Lib.create("div", { classes: "task-urgency" })
    const timeRemaining = Lib.create("div", { classes: "task-remaining-time", text: distanceInWordsToNow(task.dueDate, { addSuffix: true }) })
    const prio = Lib.create("div", { classes: "task-priority" })
    const desc = Lib.create("p", { classes: "task-desc", text: task.desc })
    const actions = Lib.create("div", { classes: "task-actions" })
    const completionIndicator = Lib.create("label", { classes: "completion-indicator", text: "Complete" })
    const checkbox = Lib.create("input", { classes: "hidden-checkbox", type: "checkbox", checked: task.complete })
    const overlayCheckbox = Lib.create("div", { classes: "completion-checkbox" })
    const check = Lib.create("i", { classes: "fas fa-check" })
    const deleteBtn = Lib.create("button", { classes: "delete-task-button", type: "button", text: "Delete" })
    deleteBtn.dataset["target_task_id"] = task.id

    Lib.append(body, [details])
    Lib.append(details, [urgency, desc, actions])
    Lib.append(urgency, [timeRemaining, prio])
    Lib.append(actions, [completionIndicator, deleteBtn])
    Lib.append(completionIndicator, [checkbox, overlayCheckbox])
    Lib.append(overlayCheckbox, [check])

    return body
  }

  const destroyTask = id => {
    const list = Lib.find(".task-list")
    const task = Lib.find(`[data-task_id='${id}']`)
    list.removeChild(task)
  }

  const destroyProject = id => {
    const list = Lib.find(".sidebar-list")
    const project = Lib.find(`[data-id='${id}']`).parentElement
    list.removeChild(project)
  }

  const clearProjectPanel = () => {
    clearTasks()
    Lib.find(".project-name u").textContent = "[No project loaded]"
  }

  const disableProjectPanel = () => {
    Lib.findAll(".project button").forEach(btn => btn.disabled = true)
  }

  const enableProjectPanel = () => {
    Lib.findAll(".project button").forEach(btn => btn.disabled = false)
  }

  const closeModal = modalSelector => {
    let modalBackground = Lib.find(modalSelector)
    setTimeout(() => { modalBackground.style.display = "none" }, 200)
    modalBackground.classList.add("hidden")
  }

  const openModal = modalSelector => {
    let modalBackground = Lib.find(modalSelector)
    modalBackground.style.display = "flex"
    setTimeout(() => { modalBackground.classList.remove("hidden") }, 10)
  }

  const resetProjectModal = () => {
    closeModal("#new-project-modal")
    Lib.find("#new-project-form").reset()
  }

  const resetTaskModal = () => {
    closeModal("#new-task-modal")
    Lib.find("#new-task-form").reset()
    resetSliderLabel()
  }

  const resetSliderLabel = () => {
    const priorityDisplay = Lib.find("#priority-value")
    priorityDisplay.textContent = "Normal"
    priorityDisplay.className = "normal-prio-color"
  }

  const clearTasks = () => {
    Lib.find(".task-list").innerHTML = ""
  }

  const toggleSidebar = () => {
    const sidebar = Lib.find(".sidebar")
    const menuButton = Lib.find(".menu-button")
    sidebar.classList.toggle("collapsed")
    menuButton.classList.toggle("open")
  }

  const closeSidebar = () => {
    const sidebar = Lib.find(".sidebar")
    const menuButton = Lib.find(".menu-button")
    sidebar.classList.add("collapsed")
    menuButton.classList.remove("open")
  }

  const updateProjectTitle = project => {
    Lib.find(".project-name u").textContent = project.name
    Lib.findAll(".sidebar-link").forEach(link => link.classList.remove("active-sidebar-link"))
    Lib.find(`[data-id="${project.id}"]`).classList.add("active-sidebar-link")
  }

  return { createProject, createTask, destroyTask, destroyProject, clearProjectPanel, disableProjectPanel, enableProjectPanel,
           closeModal, openModal, resetProjectModal, resetTaskModal, resetSliderLabel, clearTasks, closeSidebar, toggleSidebar,
           updateProjectTitle, prio, prioClass }
})()

export default DOMHandler
