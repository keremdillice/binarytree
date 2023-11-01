import "./App.css";
import { BinaryTree } from "./BinaryTree";
import { useEffect, useState, useRef } from "react";
import { Footer } from "./Components/Footer/Footer";
import { NavBar } from "./Components/NavBar/NavBar";
import UserSelection from "./Components/UserSelection/UserSelection";
function App() {
  const [tree, setTree] = useState(generateTree(5));
  const [order, setOrder] = useState([]);
  const [userSelection, setUserSelection] = useState([]);
  const [truthState, setTruthState] = useState(null);
  const [mode, setMode] = useState("preorder");
  const [difficulty, setDifficulty] = useState(3);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  });

  useEffect(() => {
    setTree(generateTree(difficulty * 2.3));
  }, [difficulty]); // This effect runs whenever the difficulty changes

  const handleKeyPress = (event) => {
    if (event.code === "Space") {
      setTree(generateTree(difficulty * 2.3));
      // do something when spacebar is pressed
    }
  };

  useEffect(() => {
    let result = null;
    if (mode === "preorder") {
      result = traversePreOrder(tree);
    } else if (mode === "inorder") {
      result = traverseInOrder(tree);
    } else {
      result = traversePostOrder(tree);
    }

    setOrder(result);
    setUserSelection([]);
    setTruthState(null);
    console.log("newtree");
  }, [tree]);

  useEffect(() => {
    let length = userSelection.length;
    if (length > 0) {
      if (order[length - 1].uuid !== userSelection[length - 1].uuid) {
        setTruthState(false);
      } else if (arraysEqual(order, userSelection)) {
        setTruthState(true);
      }
    }
  }, [userSelection]);

  function arraysEqual(arr1, arr2) {
    // Check if the arrays have the same length
    if (arr1.length !== arr2.length) {
      return false;
    }

    // Check if each element of the arrays is equal
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i].uuid !== arr2[i].uuid) {
        return false;
      }
    }

    // If we made it this far, the arrays are equal
    return true;
  }

  function handleClick(newValue) {
    setUserSelection([...userSelection, newValue]);
  }

  function traverseInOrder(currentNode, result = []) {
    if (currentNode !== null) {
      traverseInOrder(currentNode.left, result);
      result.push({ uuid: currentNode.uuid, value: currentNode.value });
      traverseInOrder(currentNode.right, result);
    }
    return result;
  }

  function traversePreOrder(currentNode, result = []) {
    //if the currentNode IS NOT EQUAL to null
    if (currentNode !== null) {
      //print its value
      result.push({ uuid: currentNode.uuid, value: currentNode.value });
      //make recursive call to the left subtree
      traversePreOrder(currentNode.left, result);
      //make recursive call to the right subtree
      traversePreOrder(currentNode.right, result);
    }
    return result;
  }

  function traversePostOrder(currentNode, result = []) {
    if (currentNode !== null) {
      traversePostOrder(currentNode.left, result);
      traversePostOrder(currentNode.right, result);
      result.push({ uuid: currentNode.uuid, value: currentNode.value });
    }
    return result;
  }

  function TreeNode(value, left, right) {
    this.value = value;
    this.left = left || null;
    this.right = right || null;
    this.uuid = crypto.randomUUID();
  }

  function generateTree(maxDepth, minVal = 1, maxVal = 99, parentValue = null) {
    if (maxVal < minVal) {
      [minVal, maxVal] = [maxVal, minVal];
    }

    let value;
    do {
      value = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
    } while (parentValue !== null && value === parentValue);

    const node = new TreeNode(value);

    if (maxDepth > 1) {
      const leftDepth = Math.floor(Math.random() * (maxDepth - 1)) + 1;
      const rightDepth = Math.floor(Math.random() * (maxDepth - 1)) + 1;
      if (leftDepth > 0) {
        node.left = generateTree(
          leftDepth,
          minVal,
          Math.min(maxVal, value - 1),
          value
        );
      }
      if (rightDepth > 0) {
        node.right = generateTree(
          rightDepth,
          Math.max(minVal, value + 1),
          maxVal,
          value
        );
      }
    }

    return node;
  }

  return (
    <>
      <NavBar
        mode={mode}
        setMode={setMode}
        setTree={setTree}
        generateTree={generateTree}
        userSelection={userSelection}
        setUserSelection={setUserSelection}
        order={order}
        setOrder={setOrder}
        traverseInOrder={traverseInOrder}
        traversePreOrder={traversePreOrder}
        traversePostOrder={traversePostOrder}
        tree={tree}
        setTruthState={setTruthState}
        truthState={truthState}
      />
      <UserSelection
        selection={userSelection}
        truthState={truthState}
        order={order}
      />
      <BinaryTree
        root={tree}
        order={order}
        handleClick={handleClick}
        userSelection={userSelection}
        truthState={truthState}
      />
      <Footer setDifficulty={setDifficulty}/>
    </>
  );
}

export default App;
