const board = document.querySelector('.board');
const blockHeight  = 30;
const blockWidth = 30;
// const totalBlocks = 100;
console.log("Script is connected and running!");

const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);
// const totalBlocks = cols * rows;


for (let i = 0; i < cols * rows; i++) {
    const block =document.createElement('div');
    block.classList.add('block');
    board.appendChild(block);
    
}



console.log("hi");
// Write your logic here
