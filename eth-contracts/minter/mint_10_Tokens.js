const SolnSquareVerifier = artifacts.require("SolnSquareVerifier");
const proof = {
    "proof": {
      "a": [
        "0x28979fe38f274fe8d530a74af3856459356bda12189a17c5e4297546017a872a",
        "0x19cffa144d2210dd0ef4fcfab6ee27f96f83c50103ef4cc6bd1fd8108cd93678"
      ],
      "b": [
        [
          "0x09859238ad948a3115a253b8b7cde22de433663a10ee0dcbadd4146a31939a92",
          "0x2f35bb5a5582b6e2cb18e5526ae9999e6525091baedc7d9ada69a1e214c38dd3"
        ],
        [
          "0x019b18cf95c0759731e694d6f1ed6099df6ff3bb2e1c4f90fc20158b919e3008",
          "0x13a873463e11a9cfc56eb6ab966cfdd09bd8bec1fdf8a96adcc81bc5d6ce665f"
        ]
      ],
      "c": [
        "0x1d477a25afdbec3d4b1e638f681b5da5ff4194d6ea4beb9fdeb0a081d4d8c509",
        "0x0ffed7195d7d043f0a0c8ca92a0d8ea5d9644ee6f09ff4497a5cffb13069db94"
      ]
    },
    "inputs": [
      "0x0000000000000000000000000000000000000000000000000000000000000009",
      "0x0000000000000000000000000000000000000000000000000000000000000001"
    ]
  };

const myAddress = "0x65bb6698A5B1C4EDd115767BF93034115cF7A58F";
let contract;

async function init() {
    contract = await SolnSquareVerifier.deployed()
    return contract;
}

async function addSolution() {
    const res = await contract.addSolution(
        proof.proof.a,
        proof.proof.b,
        proof.proof.c,
        proof.inputs,
    );
    console.log("Solution Response: ", res);
    const exists = await contract.solutionExists(myAddress);
    console.log("MY ADDRESS EXISTS: ", exists);
    return exists;
}

async function mint() {
    return await contract.mintNFT.call(myAddress, 1);
}

module.exports = async function(callback) {
    await init();
    // await addSolution();
    // console.log(await mint());

    for (let i of [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]) {
        console.log(await contract.mint(myAddress, i));
    }

    callback();
}