let memoize = require("fast-memoize");
let axios = require("axios");
let moment = require("moment");
let parentsByChild = require("./parent-child.json");

let ancestryLength = memoize(function (id) {
  if (!parentsByChild[id]) {
    return 1;
  }
  let result = 1 + Math.max.apply(null, parentsByChild[id].map(ancestryLength));
  return result;
});

let getLongestAncestry = memoize(function (id) {
  if (!parentsByChild[id]) {
    return [id];
  }

  let candidates = parentsByChild[id].map(getLongestAncestry);
  let longestCandidate = candidates.reduce(
    (longest, entry) => (entry.length > longest.length ? entry : longest),
    []
  );

  return [id, ...longestCandidate];
});

let charlemagne = "Q3044";
let elizabethII = "Q9682";
let jfk = "Q9696";
let teddy = "Q33866";
let obama = "Q76";

function parseWikiTime(claim) {
  if (
    claim &&
    claim[0].mainsnak.datavalue &&
    claim[0].mainsnak.datavalue.value.time
  ) {
    return moment(
      claim[0].mainsnak.datavalue.value.time,
      "Y-MM-DDTHH:mm:ssZ"
    ).year();
  }

  return null;
}

let ancestry = getLongestAncestry(process.argv[2] || obama);

const MAX_IDS = 50;
let groups = [];
for (let i = 0; i < ancestry.length; i += MAX_IDS) {
  groups.push(ancestry.slice(i, i + MAX_IDS));
}

let i = 0;
(async () => {
  for (let group of groups) {
    let url = `https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&languages=en&props=labels|claims&ids=${group.join(
      "|"
    )}`;
    let response = await axios.get(url);

    group.forEach((id) => {
      let entity = response.data.entities[id];
      // Q12274488 has a value for `pt` and cyrillic in `bg`
      let label = entity.labels.en ? entity.labels.en.value : id;
      const BIRTH_PROPERTY = "P569";
      const DEATH_PROPERTY = "P570";
      let birthYear = parseWikiTime(entity.claims[BIRTH_PROPERTY]) || "?";
      let deathYear = parseWikiTime(entity.claims[DEATH_PROPERTY]) || "?";

      console.log(`${++i}. ${label} (${birthYear} - ${deathYear})`);
    });
  }
})();
