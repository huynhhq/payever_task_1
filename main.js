const svgNS = "http://www.w3.org/2000/svg";
const pathsData = [
  {
    name: "Commmerce Tools",
    icon: "./assets/commerce_tools_ic.png",
    path: "M 555 10 L 190 10 C 10 10 10 0 10 190 L 10 356",
  },
  {
    name: "Shopware",
    icon: "./assets/shopware.png",
    path: "M 555 30 L 190 30 C 110 30 110 110 110 190 L 110 356",
  },
  {
    name: "Dan Domain",
    icon: "./assets/dan_domain_ic.png",
    path: "M 555 50 L 280 52 C 210 50 210 90 210 210 L 210 356",
  },
  {
    name: "Plentymarkets",
    icon: "./assets/plentymarkets_ic.png",
    path: "M 555 70 L 370 70 C 305 70 305 90 305 305 L 305 356",
  },
  {
    name: "CCV Shop",
    icon: "./assets/ccv_shop_ic.png",
    path: "M 500 90 C 500 356 395 90 395 356",
  },
  {
    name: "Magento",
    icon: "./assets/magento_ic.png",
    path: "M 560 90 C 560 356 485 90 485 356",
  },
  {
    name: "Shopify",
    icon: "./assets/shopify_ic.png",
    path: "M 580 90 V 356",
  },
  {
    name: "WooCommerce",
    icon: "./assets/woocommerce_ic.png",
    path: "M 600 90 C 600 356 675 90 675 356",
  },
  {
    name: "OpenCart",
    icon: "./assets/opencart_ic.png",
    path: "M 660 90 C 660 356 775 90 775 356",
  },
  {
    name: "xt:Commerce",
    icon: "./assets/xt_ic.jpeg",
    path: "M 600 10 L 965 10 C 1145 10 1145 0 1145 190 L 1145 356",
  },
  {
    name: "OXID",
    icon: "./assets/oxid.jpeg",
    path: "M 600 30 L 965 30 C 1055 30 1055 30 1055 190 L 1055 356",
  },
  {
    name: "Presta Shop",
    icon: "./assets/prestashop_ic.webp",
    path: "M 600 50 L 875 50 C 965 53 965 114 965 190 L 965 356",
  },
  {
    name: "JTL",
    icon: "./assets/jtl_ic.png",
    path: "M 600 70 L 785 70 C 875 70 875 70 875 190 L 875 356",
  },
];

const svgElement = document.getElementById("shopSystemSvg");

// Function to create a path
function createPath(id, d) {
  const path = document.createElementNS(svgNS, "path");
  path.setAttribute("id", id);
  path.setAttribute("class", "path");
  path.setAttribute("d", d);
  svgElement.appendChild(path);
}

// Function to create a circle with animation
function createAnimatedCircle(radius, pathId, duration) {
  const circle = document.createElementNS(svgNS, "circle");
  circle.setAttribute("class", "light");
  circle.setAttribute("r", radius);
  circle.style.filter = "url(#glow)";

  const animateMotion = document.createElementNS(svgNS, "animateMotion");
  animateMotion.setAttribute("dur", duration);
  animateMotion.setAttribute("repeatCount", "indefinite");

  const mpath = document.createElementNS(svgNS, "mpath");
  mpath.setAttributeNS(
    "http://www.w3.org/1999/xlink",
    "xlink:href",
    `#${pathId}`
  );

  animateMotion.appendChild(mpath);
  circle.appendChild(animateMotion);

  svgElement.appendChild(circle);
}

function createPathWithImage(id, d, imageUrl, name) {
  const path = document.createElementNS(svgNS, "path");
  path.setAttribute("id", id);
  path.setAttribute("class", "path");
  path.setAttribute("d", d);
  svgElement.appendChild(path);

  const length = path.getTotalLength();
  const point = path.getPointAtLength(length);

  const foreignObject = document.createElementNS(svgNS, "foreignObject");
  foreignObject.setAttribute("x", point.x - 40); // Adjust as needed
  foreignObject.setAttribute("y", point.y - 40); // Adjust as needed
  foreignObject.setAttribute("width", "80"); // Set the size of the div
  foreignObject.setAttribute("height", "80");

  const borderDiv = document.createElement("div");
  borderDiv.className = "gradient-border";
  // Create a div with styling
  const div = document.createElement("div");
  div.style.width = "95%"; // Make the div fill the foreignObject
  div.style.height = "95%";
  div.style.display = "flex";
  div.style.alignItems = "center"; // Center the image vertically
  div.style.justifyContent = "center"; // Center the image horizontally
  div.style.borderRadius = "50%"; // To make it circular
  div.style.backgroundColor = "#352831";

  // Now, place an image at the end of the path
  const image = document.createElement("img");
  image.setAttribute("src", imageUrl);
  image.setAttribute("x", point.x - 20); // Adjust x to align the image center to the path end
  image.setAttribute("y", point.x - 20); // Adjust y to align the image center to the path end
  image.setAttribute("height", "40"); // Set the image size as needed
  image.setAttribute("width", "40");

  borderDiv.appendChild(div);
  div.appendChild(image);

  // Append the div to the foreignObject
  foreignObject.appendChild(borderDiv);

  // Append the foreignObject to the SVG
  svgElement.appendChild(foreignObject);

  // New code for adding text below the circle image
  const text = document.createElementNS(svgNS, "text");
  text.setAttribute("x", point.x);
  text.setAttribute("y", point.y + 60); // Position below the image
  text.setAttribute("class", "name"); // Add a class for styling
  text.setAttribute("text-anchor", "middle"); // Center the text under the image
  text.textContent = name;

  svgElement.appendChild(text);
}

// Create paths and circles with animations
pathsData.forEach((pathData, index) => {
  createPath(`path${index}`, pathData.path);
  createAnimatedCircle(3, `path${index}`, "4s");
  createPathWithImage(`path${index}`, pathData.path, pathData.icon, pathData.name);
});
