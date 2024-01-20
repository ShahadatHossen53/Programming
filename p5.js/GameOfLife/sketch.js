
let rows = 200;
let cols = 200*2;
let cells = [], nextGen = [];
let w, h, resulation = 700;

function setup() 
{
	createCanvas(resulation*2, resulation);

    for(let i = 0; i<rows; i++){
        let row = [];
        for(let j = 0; j<cols; j++){
            row[j] = int(random(0,2));
        }

        cells[i] = row;
    }

    w = width/cols;
    h = height/rows;
}

function draw()
{
    // frameRate(4);
    background(220);

    nextGen = getNextGen();

    let y = 0;
    for(let i = 0; i<rows; i++){
        for(let j = 0; j<cols; j++){
            let x = j*w;
            noStroke();
            fill(255 - nextGen[i][j]*255);
            square(x, y, w);
        }
        y += w;
    }

    cells = nextGen;

}

function getNextGen(){
    let nextGen = [];
    for(let i=0; i<rows; i++){
        let nextRow = [];
        for(let j=0; j<cols; j++){
            nextRow[j] = getNextCell(i, j);
        }
        nextGen[i] = nextRow;
    }
    return nextGen;
}


function getNextCell(x, y){
    let sum = 0;
    
    for(let i=-1; i<=1; i++ ){
        if((x == 0 && i==-1) || (x == rows-1 && i == 1)){
            continue;
        }
        for(let j = -1; j<=1; j++){
            if((y == 0 && j == -1) || (y == cols-1 && j == 1) || (i == 0 && j == 0)){
                continue;
            }
            sum += cells[x+i][y+j];
        }
    }

    if(cells[x][y] == 1){
        if(sum < 2 || sum > 3){
            return 0;
        }
        else{
            return 1;
        }

    } else{
        if(sum == 3){
            return 1;
        } else{
            return 0;
        }

    }
}

