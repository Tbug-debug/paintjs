const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor")
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn= document.getElementById("jsSave");

//CSS, HTML에 variables와 같은 역할//
const INITIAL_COLOR = "#2c2c2c"
const CANVAS_SIZE = 700;

/*캔버스를 사용하는 윈도우가 얼마나 큰지 알려주기위한 값,
이걸 알려줘야 그림이 나옴*/
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white"
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
//기본 첫번째 색상을 검정색으로 지정함.//
ctx.strokeStyle =  INITIAL_COLOR;
ctx.fillStyle =  INITIAL_COLOR;
//선의 기본 두께를 지정함.//
ctx.lineWidth = 2.5;

//기본적으로 painting의 값은 false임//
let painting = false;
//기본적으로 filling의 값은 false임//
let filling = false;

function stopPainting(){
    /*기본 값이 false로 함수를 만들어서
    코드(painting = false)가 반복되는 것을 방지함.*/
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    //켄버스위에 마우스 움직임을 감지함.//
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        //마우스의 경로를 추적하는 함수, 마우스를 움직이는 내내 작동함.//
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        //캔버스에 선을 그리는 함수.//
        ctx.lineTo(x, y);
        ctx.stroke()
    }
    
}

function handleColorClick(event){
   const color = event.target.style.backgroundColor;
   //컬러를 클릭했을때 클릭한 컬러로 나오게 함.//
   ctx.strokeStyle = color;
   //클릭한 컬러로 배경을 채우게 함.//
   ctx.fillStyle = color;
}

function handleRangeChange(event){
const size = event.target.value;
ctx.lineWidth = size;
}

function handleModeClick(){
    //Fill 버튼을 클릭하면 Paint로 바뀌고, Paint를 클릭하면 FIll로 바뀜//
    if(filling === true){
        filling = false;
        mode.innerText ="Fill"
    } else{
        filling = true;
        mode.innerText = "Paint"
    }
}

function handleCanvasClick() {
    if(filling){
    //Fill 버튼을 눌렀을때 채워질 색상의 캔버스의 사이즈를 설정하는 코드//
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
    }
}

function handleCM(event){
    event.preventDefault();
}

function handleSaveClick(){
    const image = canvas.toDataURL()
    const link  = document.createElement("a");
    link.href = image
    link.download = "paintJS";
    link.click();
}

if(canvas){
    //캔버스 위에 마우스 움직임을 감지하게 하는 함수 호출//
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

//object를 Array형태로 만들음, 컬러를 클릭하는 것을 감지하게 함.//
Array.from(colors).forEach(color => 
    color.addEventListener("click", handleColorClick))

// 밑의 range랑 mode는 모두 감지하여 함수를 실행하게 하는 역할//
if(range){
    range.addEventListener("input", handleRangeChange)
}

if(mode){
    mode.addEventListener("click", handleModeClick)
}

if(saveBtn){
   saveBtn.addEventListener("click", handleSaveClick)
}