# TerminalTeacher Typescript

Learn the terminal with Banzi the gorilla! This project aims to provide a teaching assistant for those learning the Unix terminal. It was created as part of a web programming class and was originally implemented in JavaScript. I've reimplemented it in Typescript with a cleaner design. 

![TerminalTeacher screenshot - a gorilla teaches you how to use Unix](/terminal_teacher_ts/src/assets/demo1.png)

Try it out here: https://mmunson2.github.io/TerminalTeacher_TS/

## How did you design a terminal to run in your browser?

I'm so glad you asked! Here's the rundown on the design of the terminal code.

![Virtual File System Overview](/terminal_teacher_ts/src/assets/VFS_Design.svg)

The object that maintains the virtual file system is named VirtualFileSystem. It contains:  
- A root Directory
- A list of Command objects
  
Much like the design of Unix, Directories are just a type of File. The parent File class
has a name string and contents of type `any`. TextFiles and Directories are child classes
of File that change the recipe slightly. TextFiles' contents must be a string and keep
their extension (e.g `.txt`) as a separate member. Directories have contents of type
`Array<File>` and have a number of methods for adding and retrieving Files from them.  
  
When designing commands, my goal was to make adding new features as easy as possible. Commands
extend an Abstract Command class. This requires each to implement:
- A command name as typed on the terminal
- A basic help string that tells the user which arguments are required or optional
- An execute() method that runs the command
  
New commands just need to be added to the VirtualFileSystem's command list. When input is
parsed from the terminal the command names are compared and executed when a match is
found. The downside of this design is that the entire VirtualFileSystem object is
passed into the command and modified (e.g a directory is created). This creates a
close coupling between the VirtualFileSystem and its commands, and makes it possible
for a buggy command to take down the entire VirtualFileSystem. This could potentially
be remedied with:
- A simple try/catch for all command executions that reverts any changes to the
VirtualFileSystem if an error is thrown
- Changing the execute() parameters so only the current directory is passed into
the command. Changes to the directory could be limited to methods in the Directory
class to minimize the risk of corrupting the file structure.
- Creating some sort of primitive permissions system that restricts commands from
making major changes to the VirtualFileSystem without the user granting them 
permission.

To make the data contract and methods for each class more clear, I've created interfaces
that each class implements. You can find these in `src/terminal/interfaces` if you're
curious!
  
![Virtual File System Input Data Flow](/terminal_teacher_ts/src/assets/VFS_Input_DFD.svg)
  
The data flow for the terminal begins with a string entered by the user. This is converted
into a ProcessInput DTO object by the VirtualFileSystem. This parses the command string
and separates it into a command and a list of arguments. This allows Commands to easily
check if required parameters are present and reject the input as necessary.

![Virtual File System Input Data Flow](/terminal_teacher_ts/src/assets/VFS_Input_DFD.svg)

Commands return a ProcessResult DTO object that contains:
- The original ProcessInput DTO
- A result enum (Success, Error, or not recognized)
- A details string

This DTO includes a large amount of information that allows the terminal, and Banzi the
gorilla, to display output or piece together why a command failed so that relevant
information can be given to the user.

This project was a lot of fun to make. I'm not sure there's a lot of demand for UNIX
terminal instruction, but I do intend to use the web-based terminal I've built for a personal
website. 