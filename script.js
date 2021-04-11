// console.log("is our script file working?");

// load airtable library call it "airtable"
// let and var are interchangable
var Airtable = require("airtable");
// console.log(Airtable);

// use airtable library to get variable that represents one of the bases
var base = new Airtable({ apiKey: "key9WKt4UVy61sEco" }).base(
  "appOoYlNmnCOR7krL"
);

// get collection base, select all records
// specify functions that will receive data
base("pink").select({}).eachPage(gotPageOfItems, 
  gotAllItems);

// an empty array to hold data
var items = [];

// callback function receives data
function gotPageOfItems(records, fetchNextPage) {
  console.log("gotPageofItems()");
  // add records from this page to array
  items.push(...records);
  //r request more pages
  fetchNextPage();
}

// call back function that is called when all pages are loaded
function gotAllItems(err) {
  console.log("gotAllItems()");

  //report error
  if (err) {
    console.log("error loading data");
    console.error(err);
    return;
  }

  // call functions to log and show items
  consoleLogItems();
  showItems();
}

// just loop through and console.log
function consoleLogItems() {
  console.log("consoleLogItems()");
  items.forEach((item) => {
    console.log("Item:", item);
  });
}

// loop through items, create elements for each 
function showItems() {
  console.log("showItems()");
  items.forEach((item) => {
// creating new div container
// item info 
    var itemContainer = document.createElement("div");
    itemContainer.classList.add("item-container");
    document.querySelector(".container").append(itemContainer);
    
    var itemTitle = document.createElement("h2");
    itemTitle.classList.add("item-title");
    itemTitle.innerText = item.fields.item_title;
    itemContainer.append(itemTitle);

    var itemCategory = document.createElement("p");
    itemCategory.classList.add("item-category");
    itemCategory.innerText = item.fields.item_category;
    itemContainer.append(itemCategory);

    var itemImage = document.createElement("img");
    itemImage.classList.add("item-image");
    itemImage.src = item.fields.item_image[0].url;
    itemContainer.append(itemImage);

    var itemName = document.createElement("h3");
    itemName.classList.add("item-name");
    itemName.innerText = item.fields.item_name;
    itemContainer.append(itemName);
    
    // get type from airtable
    // loop through array and add each type as a class to container
    var itemCategory = item.fields.item_category;
    itemCategory.forEach(function(category) {
      itemContainer.classList.add(category)
    })


    // add event listener to filter
    // add active class to item
    var filterFurniture = document.querySelector('.furn');
    filterFurniture.addEventListener("click", function() {

      if (itemContainer.classList.contains("FURNITURE")) {
        itemContainer.style.display = "block";
      } else {
        itemContainer.style.display = "none";
      }

    })

    if (itemContainer.classList.contains("FURNITURE")) {
      itemContainer.style.background = "#FF7BD1";
    }
    if (itemContainer.classList.contains("KITCHEN")) {
      itemContainer.style.background = " #EA3D93";
    }
    if (itemContainer.classList.contains("MISC")) {
      itemContainer.style.background = "#FFC9FF";
    }

  });
}


