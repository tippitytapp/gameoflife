let generation = 0;
const neighborpositions=[[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]
let numRows = 25;
let numCols = 49;

// set grid size
export const setGridGrid = () => {
    const rows = [];
    for (let i = 0; i< numRows; i++){
        rows.push(Array.from(Array(numCols), () => Math.floor(Math.random(2))))
    }
    return rows;
}

// export const setBoardSize = (rows, cols) => {
//     numRows = rows; 
//     numCols = cols
// }