const fill = document.querySelector('.fill')
const empties = document.querySelectorAll('.empty')

fill.addEventListener('dragstart', dragStart, false)
fill.addEventListener('dragend', dragEnd, false)

for(const empty of empties){
  empty.addEventListener('dragenter', dragEnter, false)
  empty.addEventListener('dragleave', dragLeave, false)
  empty.addEventListener('dragover', dragOver)
  empty.addEventListener('drop', dragDrop)
}


function dragStart(){
  this.className += ' hold'
  setTimeout(() => this.className = 'invisible', 0)
}
function dragEnd(){
  this.className = 'fill'
}
function dragEnter(e){
  e.preventDefault() // Default action: reject immediate user selection as potential target element
  this.className += ' hovered'
}
function dragLeave(){
  this.className = 'empty'
}
function dragOver(e){
  e.preventDefault()
}
function dragDrop(){
  this.className = 'empty'
  this.append(fill) // To add the div with the class of 'fill'
}