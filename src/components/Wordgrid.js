import React, {useState, useEffect, useRef} from 'react';
import arrangements from './Arrangements';
import words from './words';
import Wordbank from './Wordbank'

const Wordgrid = () => {

  const [grid, setGrid] = useState([])
  const [list,setList] = useState([])
  const [mousePressed,setMousePressed] = useState(false)
  const [startPoint, setStartPoint] = useState([])
  const canvas = useRef(null);
  const staticCanvas = useRef(null);

  const randomChar = () => {
    let characters = 'abcdefghijklmnopqrstuvwxyz';
    return characters.charAt(Math.floor(Math.random() * characters.length));
 }

  useEffect(() => {   
    let newgrid = []
    let newwords = []
    for (let i = 0; i < 14; i++) {   //populate grid with random characters first
      let row = [];
      for (let i2 = 0; i2 < 14; i2++) {
        row.push([randomChar(), ""])
      }
      newgrid.push(row)
    }
    const arrangement = arrangements[Math.floor(Math.random() * arrangements.length)]   //Choose predefined arrangement
    for (let i = 0; i < arrangement.length; i++) {  //insert the words in the grid
      let startrow = arrangement[i].row
      let startcol = arrangement[i].column
      let startCoord = [20 + startcol * 35 , 20 + startrow * 35] 
      let wordlist = words[arrangement[i].size-3]
      let wordindex = Math.floor(Math.random() * wordlist.length)
      let word = wordlist[wordindex] //select random word of specific size
      wordlist.splice(wordindex,1);
      let count = 0;
      if (arrangement[i].direction === 0) {
        while (count < arrangement[i].size) {
          newgrid[startrow][startcol] = word.charAt(count);
          count++;
          if (count < arrangement[i].size) {
            startcol++;
          }
        }
      }
      else if (arrangement[i].direction === 1) {
        while (count < arrangement[i].size) {
          newgrid[startrow][startcol] = word.charAt(count);
          count++;
          if (count < arrangement[i].size) {
            startcol--;
          }
        }
      }
      else if (arrangement[i].direction === 2) {
        while (count < arrangement[i].size) {
          newgrid[startrow][startcol] = word.charAt(count);
          count++;
          if (count < arrangement[i].size) {
            startrow++;
          }
        }
      }
      else if (arrangement[i].direction === 3) {
        while (count < arrangement[i].size) {
          newgrid[startrow][startcol] = word.charAt(count);
          count++;
          if (count < arrangement[i].size) {
            startrow--;
          }
        }
      }
      else if (arrangement[i].direction === 4) {
        while (count < arrangement[i].size) {
          newgrid[startrow][startcol] = word.charAt(count);
          count++;
          if (count < arrangement[i].size) {
            startrow++;
            startcol++;
          }
        }
      }
      else {
        while (count < arrangement[i].size) {
          newgrid[startrow][startcol] = word.charAt(count);
          count++;
          if (count < arrangement[i].size) {
            startrow++;
            startcol--;
          }
        }
      }
      let endCoord = [20 + startcol * 35 , 20 + startrow * 35]  
      newwords.push([word , startCoord, endCoord, false])
    }
      setGrid(newgrid)
      setList(newwords)
  }, [])

  const checkLine = (x1, y1, x2 ,y2) => {
    let count = 0;
    while (count < list.length) {
      let word = list[count];
      if (!word[3]) {  //only check if word hasnt been found
        let wordx1 = word[1][0]
        let wordy1 = word[1][1]
        let wordx2 = word[2][0]
        let wordy2 = word[2][1]
        if (((x1 < wordx1 + 10) && (x1 > wordx1 - 10)) && ((x2 < wordx2 + 10) && (x2 > wordx2 - 10)) && ((y2 < wordy2 + 10) && (y2 > wordy2 - 10)) && ((y2 < wordy2 + 10) && (y2 > wordy2 - 10))){
          let newList = [...list]
          newList[count][3] = true;  //mark word as found
          setList(newList)
          return true;
        }
        //Have to check both directions
        if ((x1 < wordx2 + 10 && x1 > wordx2 - 10) && (x2 < wordx1 + 10 && x2 > wordx1 - 10) && (y1 < wordy2 + 10 && y1 > wordy2 - 10) && (y2 < wordy1 + 10 && y2 > wordy1 - 10)  ) {
          let newList = [...list]
          newList[count][3] = true;  //mark word as found
          setList(newList)
          return true;
        }
      }
      count++;
    }
    return false;
  }

 const draw = (event) => {
  if (mousePressed) {
    var recta = event.target.getBoundingClientRect();
    var cx = event.clientX - recta.left; //x position within the element.
    var cy = event.clientY - recta.top;  //y position within the element.
    const ctx = canvas.current.getContext('2d');
    ctx.globalAlpha = 0.5;
    ctx.strokeStyle = "#C2C5CC";
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
    ctx.beginPath();
    var count = 0;
    while (count < 1) {
      ctx.moveTo(startPoint[0] + count, startPoint[1] + count);   //add thickness to the line
      ctx.lineTo(cx + count, cy + count);
      ctx.stroke();
      ctx.moveTo(startPoint[0] - count, startPoint[1] - count);   //add thickness to the line
      ctx.lineTo(cx - count, cy - count);
      ctx.stroke();
      count++;
    }
  }
 }

const mousepress = (event) => {
  var recta = event.target.getBoundingClientRect();
  var cx = event.clientX - recta.left; //x position within the element.
  var cy = event.clientY - recta.top;  //y position within the element.
  setStartPoint([cx,cy])
  setMousePressed(true)
}

const mouseunpress = (event) => {
  var recta = event.target.getBoundingClientRect();
  var cx = event.clientX - recta.left; //x position within the element.
  var cy = event.clientY - recta.top;  //y position within the element
  const result = checkLine(startPoint[0], startPoint[1], cx,  cy);  //check if the line that we drew corresponds to a word
  if (result) { //We will have to draw this line on another canvas if theres a match
    var count = 0;
    const staticctx = staticCanvas.current.getContext('2d');
    staticctx.strokeStyle = "#458B00";
    while (count < 1) {
      staticctx.moveTo(startPoint[0] + count, startPoint[1] + count);   //add thickness to the line
      staticctx.lineTo(cx + count, cy + count);
      staticctx.stroke();
      staticctx.moveTo(startPoint[0] - count, startPoint[1] - count);   //add thickness to the line
      staticctx.lineTo(cx - count, cy - count);
      staticctx.stroke();
      count++;
    }
  }
  const ctx = canvas.current.getContext('2d');
  ctx.clearRect(0, 0, canvas.current.width, canvas.current.height); //clear the canvas
  setMousePressed(false)
}

  if (grid.length === 0) {
    return (
      <div>
        <p> loading</p>
      </div>
    )
  }

  return (
    <div>
      <div className = "wordGridContainer">
        {grid.map((row) => (
          row.map((letter) => (
            <p> {letter} </p> 
          )) 
        ))}
        <canvas style = {{background:"" , width: "500px", height: "500px", position: "absolute", top:0, left: 0}} onMouseMoveCapture = {draw.bind(this)} onMouseDown = {mousepress} onMouseUp = {mouseunpress} ref={canvas} width = {500} height = {500}>
        </canvas>
        <canvas style = {{background:"" , width: "500px", height: "500px", position: "absolute", top:0, left: 0}} onMouseMoveCapture = {draw.bind(this)} onMouseDown = {mousepress} onMouseUp = {mouseunpress} ref={staticCanvas} width = {500} height = {500}>
        </canvas>
      </div>
      <Wordbank wordlist = {list} />
    </div>
    );
  }

export default Wordgrid;
