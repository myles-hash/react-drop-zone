"use client";

import Image from 'next/image';
import {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone' 
//install this library via "npm install --save react-dropzone"
// {useDropzone} hook comes from this library 

export default function Dropzone() {
  const [files, setFiles] = useState([ ])
   //create state for files using useState in order to show the user a preview of the selected files, letting them know the file has been recieved
   //initialised as an empty array

  const onDrop = useCallback(acceptedFiles => { //receives both accepted and rejected files (if stipulations made)
   if (acceptedFiles?.length)//if the accepted file exists (if its length is true) 
   {
    setFiles(previousFiles => [
      ...previousFiles, //spread over previous files so as not to overwrite them
      ...acceptedFiles.map(file =>  
        Object.assign(file, { preview: URL.createObjectURL(file)})
        ) //maps all files and creates a URL for each, with a key of "preview" to be included
    ])
   }
  }, []) 
  // called when files are dropped into the drop zone, checks if files are accepted and (if they are), updates file state with new files
  // additionally generates a URL for each file 

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop}) 
  // useDropzone mainly gives us back two functions: getRootProps and getInputProps
  //hook is called with callback function "onDrop", executed when a user drops a file

  function removeFile(name) {
    setFiles(file => files.filter(file => file.name !== name))
  }
  //remove file function that uses name of a file as an argument. When called, updates file state to remove file with matching name
  
  //spread the properties from both in the return, in the outermost div and the input
  //div props mainly give eventhandlers for drag and drop behaviour
  //input spread gives us event listeners for click/drag events, needed for drag and drop/ clicking on files
  console.log(files)
  return (
    <>
    
    <div {...getRootProps()} className="div">
      <input {...getInputProps()} />  
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag and drop some files here, or click to select files</p>
      }
    </div>

    <h4>Preview </h4>
      
    <ul>
  {files.length === 0 ? (
    <li>No files yet</li>
  ) : (
    files.map(file => (
      <li key={file.name}>
        {file.name}
        <Image src={file.preview} alt='' width={100} height={100} />
        <button onClick={() => removeFile(file.name)}>Delete</button>
      </li>
    ))
  )}
</ul>
    {/*Previews files by mapping through them, returning its name and the image preview, created in setFiles via Object.assign
    If no files, returns no files yet */}
    </>
  )
}