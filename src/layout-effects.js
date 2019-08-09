import DOMHandler from "./dom-handler"
import Lib from "./dom-library"
import { format } from 'date-fns'

// SHOW/HIDE SIDEBAR TOGGLER
Lib.attachEvent(".menu-button", DOMHandler.toggleSidebar)

// SHOW/HIDE DETAILS TOGGLER
Lib.attachEvent(".details-toggler", e => {
  let task = Lib.findAncestor(e.target, "task")
  task.classList.toggle("show")
}, 'click', true)

// SLIDER TEXT DISPLAY
Lib.attachEvent("#priority-slider", e => {
  let priorityValue = parseInt(e.target.value)
  const priorityDisplay = Lib.find("#priority-value")
  priorityDisplay.textContent = DOMHandler.prio(priorityValue)
  priorityDisplay.className = DOMHandler.prioClass(priorityValue) + "-color"
}, 'input')

// CLOSE TASK MODAL
Lib.attachEvent("#close-task-modal", e => {
  e.preventDefault()
  DOMHandler.closeModal("#new-task-modal")
})

// OPEN TASK MODAL
Lib.attachEvent(".new-task-button", e => {
  DOMHandler.openModal("#new-task-modal")
  Lib.find("#due-date-field").value = format(new Date(), "YYYY-MM-DD[T]HH:mm")
})

// CLOSE PROJECT MODAL
Lib.attachEvent("#close-project-modal", e => {
  e.preventDefault()
  DOMHandler.closeModal("#new-project-modal")
})

// OPEN PROJECT MODAL
Lib.attachEvent(".new-project-button", e => DOMHandler.openModal("#new-project-modal"))
