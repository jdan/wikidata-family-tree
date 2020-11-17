let fs = require("fs");
let data = require("./raw.json");

let parentsByChild = {};

// Massage the data into a child -> [parent] map
// TODO: Could prob run this as a script
data.forEach((entry) => {
  let person = entry.person.split("/");
  let childId = person[person.length - 1];

  let parent = entry.parent.split("/");
  let parentId = parent[parent.length - 1];

  if (!parentsByChild[childId]) {
    parentsByChild[childId] = [parentId];
  } else {
    parentsByChild[childId].push(parentId);

    if (parentsByChild[childId].length > 2) {
      // Wikidata is full of duplicate entries for mothers and fathers
      // For example: https://www.wikidata.org/wiki/Q45639552
      //
      // To remedy this, we'll (gulp) figure out the mother and father
      // by taking the two smallest IDs in the array
      parentsByChild[childId] = parentsByChild[childId]
        .sort((a, b) => {
          return parseInt(a.slice(1)) - parseInt(b.slice(1));
        })
        .slice(0, 2);
    }
  }
});

fs.writeFileSync("./parent-child.json", JSON.stringify(parentsByChild));
