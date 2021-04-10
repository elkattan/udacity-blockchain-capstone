pragma solidity >=0.4.21 <0.6.0;

import "../../zokrates/code/square/verifier.sol";
import "./ERC721Mintable.sol";

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
// Inharited Verifier contract

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is CustomERC721Token, Verifier {
    constructor(string memory name, string memory symbol)
        public
        CustomERC721Token(name, symbol)
    {}

    // TODO define a solutions struct that can hold an index & an address
    struct Solution {
        bytes32 index;
        address sender;
        uint256 token;
    }
    // TODO define an array of the above struct
    Solution[] private _solutions;

    // TODO define a mapping to store unique solutions submitted
    mapping(address => Solution) private _solutionsMap;

    // Keeping track of unique solution using "exists" map
    mapping(bytes32 => bool) private _existsMap;

    // TODO Create an event to emit when a solution is added
    event SolutionAdded(address sender);

    // verifying solution exists
    function solutionExists(address owner) public view returns (bool exists) {
        exists = _existsMap[_solutionsMap[owner].index];
    }

    // TODO Create a function to add the solutions to the array and emit the event
    function addSolution(
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[2] memory input
    ) public {
        bytes32 index = keccak256(abi.encodePacked(a, b, c, input));
        require(!_existsMap[index], "Solution already exists!");
        require(verifyTx(a, b, c, input), "Solution was not verified!");

        Solution memory solution =
            Solution({index: index, sender: msg.sender, token: 0});
        _solutions.push(solution);
        _existsMap[index] = true;
        _solutionsMap[msg.sender] = solution;

        emit SolutionAdded(msg.sender);
    }

    // TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSuplly
    function mintNFT(address to, uint256 tokenId) public returns (bool minted) {
        require(_solutionsMap[to].index > 0, "404 Solution Not Found!");
        require(_solutionsMap[to].token == 0, "Solution already has token");

        _mint(to, tokenId);
        _solutionsMap[to].token = tokenId;
        minted = true;
    }
}
