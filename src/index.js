// import React from "react";
// import ReactDOM from "react-dom";

function convertToHtml(virtualNode) {
  console.log(virtualNode);

  if (typeof virtualNode === "string" || typeof virtualNode === "number") {
    return document.createTextNode(`${virtualNode}`);
  }

  const $domElement = document.createElement(virtualNode.tagName);

  virtualNode.props.children.forEach((virtualChild) => {
    $domElement.appendChild(convertToHtml(virtualChild));
  });

  return $domElement;
}

function render(initialVirtualTree, $domRoot) {
  const $appHtml = convertToHtml(initialVirtualTree);
  $domRoot.appendChild($appHtml);
}

function createElement(elementType, props, ...children) {
  const virtualElementProps = {
    ...props,
    children,
  };
  if (typeof elementType === "function") {
    return elementType(virtualElementProps);
  }

  return {
    tagName: elementType,
    props: virtualElementProps,
  };
}

const React = {
  createElement,
};

// ==================================================================
function App(props) {
  return (
    React.createElement(
      "section",
      {
        className: "App",
      },
      React.createElement("h1", null, "Contador"),
      React.createElement("div", null),
      React.createElement("div", null, 0),
      React.createElement("button", null, "Incrementar"),
      React.createElement("button", null, "Decrementar")
    )
  )
}

render(
  React.createElement(App, null),
  document.getElementById("root")
);
