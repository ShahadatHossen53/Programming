let cells = [];
let w = 5;
let y;

let rule;
let intRule = 150;
let total = 300;

function setup() 
{
    rule = intRule;
    y = 0;
    total += 1 - (total%2);
	createCanvas(w*total, windowHeight);

    for(let i=0; i<total; i++){
        cells[i] = 0;
    }
    let mid = Math.floor(total/2);
    
    cells[mid] = 1;
    background(220);


    let binaryString = rule.toString(2);

    let leadingZeros = 8 - binaryString.length;

    rule = '0'.repeat(leadingZeros) + binaryString;
}

function draw()
{
    if(y > height){
        intRule = intRule >= 255 ? 0 : ++intRule;
        
        console.log(intRule);
        // setup();
    }
    for(let i =0; i<cells.length; i++ ){
        let x = i*w;
        // stroke(0);
        noStroke();
        fill(255 - cells[i]*255);
        square(x, y, w);
    }
    y += w;

    let nextCells = [];
    nextCells[0] = cells[0];
    for(let i =1; i <cells.length-1; i++){
        let leftCell = cells[i-1];
        let state = cells[i];
        let rightCell = cells[i+1];
        let newState = calculateState(leftCell, state, rightCell);
        nextCells[i] = newState; 
    }
    nextCells[cells.length - 1] = cells[cells.length - 1];
    cells = nextCells;

}


function calculateState(leftCell, state, rightCell){

    let binaryString = ''+leftCell+state+rightCell;
    let pos = parseInt(binaryString, 2);

    return rule[7 - pos];
    
}