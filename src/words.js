const words = [
"apple",
"arm",
"banana",
"bike",
"bird",
"book",
"chin",
"clam",
"class",
"clover",
"club",
"corn",
"crayon",
"crow",
"crown",
"crowd",
"crib",
"desk",
"dime",
"dirt",
"dress",
"fang",
"field",
"flag",
"flower",
"fog",
"game",
"heat",
"hill",
"home",
"horn",
"hose",
"joke",
"juice",
"kite",
"lake",
"maid",
"mask",
"mice",
"milk",
"mint",
"meal",
"meat",
"moon",
"mother",
"morning",
"name",
"nest",
"nose",
"pear",
"pen",
"pencil",
"plant",
"rain",
"river",
"road",
"rock",
"room",
"rose",
"seed",
"shape",
"shoe",
"shop",
"show",
"sink",
"snail",
"snake",
"snow",
"soda",
"sofa",
"star",
"step",
"stew",
"stove",
"straw",
"string",
"summer",
"swing",
"table",
"tank",
"team",
"tent",
"test",
"toes",
"tree",
"vest",
"water",
"wing",
"winter",
"woman",
"women",
];

export const chooseWord = () => words[Math.floor(Math.random() * words.length)];
