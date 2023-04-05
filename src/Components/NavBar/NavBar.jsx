import React, { useState } from "react";
import "./NavBar.css";
import { useEffect } from "react";
export function NavBar(props) {
  const [inorderTruth, setinorderTruth] = useState(null);
  const [preorderTruth, setpreorderTruth] = useState(null);
  const [postorderTruth, setpostorderTruth] = useState(null);
  
    useEffect(() => {
        props.setTruthState(null)
        if (props.mode === 'preorder') {
            props.setOrder(props.traversePreOrder(props.tree));
          } else if (props.mode === 'inorder') {
            props.setOrder(props.traverseInOrder(props.tree));
          } else {
            props.setOrder(props.traversePostOrder(props.tree));
          }
    }, [props.mode])

    useEffect (() => {
      if (props.truthState === true) {
        if (props.mode === 'preorder') {
          setpreorderTruth(true);
        } else if (props.mode === 'inorder') {
          setinorderTruth(true);
        } else {
          setpostorderTruth(true);
        }
      } else if (props.truthState === false) {
        if (props.mode === 'preorder') {
          setpreorderTruth(false);
        } else if (props.mode === 'inorder') {
          setinorderTruth(false);
        } else {
          setpostorderTruth(false);
        }
      }
  }, [props.truthState])

  useEffect(() => {
    setpreorderTruth(null);
    setinorderTruth(null);
    setpostorderTruth(null);
  }, [props.tree])


  function handleClick(e) {
    if (e.target.innerHTML === 'preorder') {
      if (preorderTruth === null) {
        props.setMode(e.target.innerHTML);
        props.setUserSelection([]);
      }
    } else if (e.target.innerHTML === 'inorder') {
      if (inorderTruth === null) {
        props.setMode(e.target.innerHTML);
        props.setUserSelection([]);
      }
    } else {
      if (postorderTruth === null) {
        props.setMode(e.target.innerHTML);
        props.setUserSelection([]);
      }

    }
    
    
  }

  const currentMode = {
    backgroundColor: "white",
    color: "black",
  };

  const correct = {
    backgroundColor: "green",
    color: "white",
    cursor: "not-allowed"
  };

  const incorrect = {
    backgroundColor: "red",
    color: "white",
    cursor: "not-allowed"
  };

  return (
    <header>
      <h1>BinaryTreeTraversal:</h1>
      <p
        style={inorderTruth === true ? correct : inorderTruth === false ? incorrect : props.mode === "inorder" ? currentMode : null}
        onClick={handleClick}
      >
        inorder
      </p>
      <p
        style={preorderTruth === true ? correct : preorderTruth === false ? incorrect : props.mode === "preorder" ? currentMode : null}
        onClick={handleClick}
      >
        preorder
      </p>
      <p
        style={postorderTruth === true ? correct : postorderTruth === false ? incorrect : props.mode === "postorder" ? currentMode : null}
        onClick={handleClick}
      >
        postorder
      </p>
    </header>
  );
}
