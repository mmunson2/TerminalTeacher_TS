import './App.css';
import React from 'react'
import TextField from '@mui/material/TextField';
import VirtualFileSystem from "./terminal/VirtualFileSystem";
import Instructor from "./teacher/Teacher"
import title from './assets/title_cropped.jpg';

const username = "bonzi$ "
const terminalLineCount = 10

// Cut off lines of the terminal so that the TextBox doesn't overflow
// TODO: make scrolling work!
function trimTerminalContents(terminalContents: string) {
  let lineCount = (terminalContents.match(/\n/g) || []).length;

  while(lineCount > terminalLineCount) {
    terminalContents = terminalContents.slice(terminalContents.indexOf("\n") + 1, terminalContents.length)

    lineCount = (terminalContents.match(/\n/g) || []).length;
  }

  return terminalContents;
}

// Update the terminal output
function updateTerminalContents(currentState: any, command: string, result: any) {

  // Add the command executed by the user to the terminal
  let terminalContents = currentState.terminalContents;
  terminalContents += "\n";
  terminalContents += command;
  
  // If there's output, add it to the terminal
  if(result.details) {
    terminalContents += "\n"

    terminalContents += result.details;
  }

  // Check if we've exceeded our terminal line limit. Trim if so
  terminalContents = trimTerminalContents(terminalContents);

  currentState.terminalContents = terminalContents;

  return currentState;
}

// Add the next command to the list of commands recently used
function updateCommandList(currentState: any, command: string) {
  const commandList = currentState.commandList;
  commandList.push(command);

  currentState.commandList = commandList;
  currentState.selectedCommand = commandList.length;

  return currentState;
}

function App() {

  const [currentState, setState] = React.useState(
    {terminalContents: "", 
    commandList: [], 
    selectedCommand: 0,
    fileSystem: new VirtualFileSystem(),
    instructor: new Instructor()
  });

  const handleTerminalInput = (event: React.KeyboardEvent<HTMLDivElement>) => {

    const key = event.key;

    // Enter behavior: Submit command, update terminal object, update command list
    if(key === "Enter" && event.target instanceof HTMLInputElement) {
      event.preventDefault();
      
      const command = event.target.value;
      let newState = currentState;

      const commandWithoutUser = command.slice(username.length, command.length)
      const result = currentState.fileSystem.parseCommand(commandWithoutUser);

      newState = updateTerminalContents(newState, command, result);
      newState = updateCommandList(newState, command);
      newState.instructor.parseResult(result)

      setState({
        terminalContents: newState.terminalContents, 
        commandList: newState.commandList, 
        selectedCommand: newState.selectedCommand,
        fileSystem: newState.fileSystem,
        instructor: newState.instructor
      });

      event.target.value = username;
    }
    // Arrow keys get previous/next commands in list
    else if((key === "ArrowUp" || key === "ArrowDown") && event.target instanceof HTMLInputElement) {
      const commandList = currentState.commandList;

      let newCommandIndex;

      if(key === "ArrowUp") {
        newCommandIndex = currentState.selectedCommand - 1
      }
      else {
        newCommandIndex = currentState.selectedCommand + 1
      }

      if(newCommandIndex >= 0 && newCommandIndex < commandList.length) {
        event.target.value = commandList[newCommandIndex];
        
        const newState = currentState;
        newState.selectedCommand = newCommandIndex;

        setState(newState);
      }
    }
    // Don't allow the user to delete the user display
    else if (key === "Backspace" && event.target instanceof HTMLInputElement) {
      if(event.target.value.length <= username.length) {
        event.preventDefault()
        event.target.value = username;
      }
    }
  }

  return <>
  <img id="title-img" src={title} alt="Terminal Teacher"></img>
  <div className="about-text">
  <h1>About</h1>
  <p>Terminal Teacher is a Unix-like environment that runs in a web browser. While an operating system can sometimes be sparse and cold in its error messages, Terminal Teacher provides a cheerful mascot to provide additional details.</p>
  <h3>Some commands to try are</h3>
  <ul>
    <li>mkdir</li>
    <li>touch</li>
    <li>ls</li>
    <li>cd</li>
    <li>cat</li>
  </ul>
  </div>

  <div id="instructor">
  <img className="instructor-window" src={currentState.instructor.pose} alt="Bonzi buddy"></img>
  <span className="instructor-hint-box">Bonzi says: {currentState.instructor.suggestion}</span>
  </div>
  <div id="terminal">
    <TextField
      id="terminal-output"
      className="terminal-out"
      multiline
      fullWidth
      maxRows={15}
      defaultValue={currentState.terminalContents}
      onKeyDown={(event) => {event.preventDefault();}}
    />
    <TextField 
    id="terminal-input"
    className="terminal-in"
    variant="filled"
    defaultValue={username}
    onKeyDown={handleTerminalInput}
    />
  </div></>
}

export default App;
