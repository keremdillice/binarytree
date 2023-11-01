import React, { useState } from "react";
import "./BinaryTree.css";
import { userInput } from "./globalstate";

function BinaryTree({ root, order, handleClick, userSelection, truthState }) {

  function BinaryTreeNode(props) {
    const { value, left, right, uuid, result } = props;


    return (
      <div className="node" data-node-id={uuid}>
        <div
          className="value"
          onClick={() => {
            if (truthState === null || userSelection.length == 0) {
              handleClick({'uuid': uuid, 'value':value})
            console.log(value)
            }
            
          }}
        >
          {value}
        </div>
        <div className="child">
          {left && <BinaryTreeNode {...left} />}
          {right && <BinaryTreeNode {...right} />}
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="tree">
        {root && <BinaryTreeNode {...root} result={order} />}
      </div>
    </>
  );
}

export { BinaryTree };
