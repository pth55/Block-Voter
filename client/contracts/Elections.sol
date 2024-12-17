// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <0.9.0;

contract Elections {
    address private owner;

    constructor() {
        owner = msg.sender;
    }

    struct Candidate {
        uint256 candidate_id;
        string candidate_name;
        uint256 candidate_voteCount;
        string candidate_partyName;
        string candidate_partyLogo;
    }

    struct Voter {
        uint256 votedForCandidateId;
        bool hasVoted;
    }

    address[] private votersArr;
    mapping(address => bool) private voters;
    mapping(uint256 => Candidate) private candidate;
    mapping(uint256 => bool) private aadhaarUsed; // Track Aadhaar numbers
    mapping(address => Voter) private voterDetails; // Track whom the voter voted for
    uint256 private candidateCount = 0;
    uint256 private winnerId;
    bool private isResultDeclared;
    bool private electionStarted;

    // Modifier to check if the election has started
    modifier onlyWhenElectionStarted() {
        require(electionStarted, "Election has not started.");
        _;
    }

    // Modifier to restrict access to the owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action.");
        _;
    }

    // Function to start the election
    function startElection() public onlyOwner {
        require(!electionStarted, "Election has already started.");
        require(
            !isResultDeclared,
            "Results have already been declared; cannot restart."
        );

        electionStarted = true;
        isResultDeclared = false;
    }

    // Function to add a candidate
    function addCandidate(
        string memory _name,
        string memory _partyName,
        string memory _partyLogo
    ) public onlyOwner onlyWhenElectionStarted {
        candidateCount++;
        Candidate storage c = candidate[candidateCount];
        c.candidate_id = candidateCount;
        c.candidate_name = _name;
        c.candidate_voteCount = 0;
        c.candidate_partyName = _partyName;
        c.candidate_partyLogo = _partyLogo;
    }

    // Function to add a vote
    function addVote(
        uint256 _candidateId,
        uint256 _aadhaarNumber
    ) public onlyWhenElectionStarted {
        require(
            !voters[msg.sender],
            "You have already cast your vote with this wallet!"
        );
        require(
            !aadhaarUsed[_aadhaarNumber],
            "This Aadhaar number has already voted!"
        );
        require(
            _candidateId > 0 && _candidateId <= candidateCount,
            "Invalid candidate!"
        );

        voters[msg.sender] = true;
        aadhaarUsed[_aadhaarNumber] = true;
        candidate[_candidateId].candidate_voteCount++;
        voterDetails[msg.sender].votedForCandidateId = _candidateId;
        voterDetails[msg.sender].hasVoted = true;
        votersArr.push(msg.sender);
    }

    // New function to check if a specific Aadhaar number has voted
    function isVoted(uint256 _aadhaarNumber) public view returns (bool) {
        return aadhaarUsed[_aadhaarNumber];
    }

    // Function to declare results and stop voting
    function declareResults()
        public
        onlyOwner
        onlyWhenElectionStarted
        returns (Candidate memory)
    {
        require(!isResultDeclared, "Results have already been declared.");

        uint256 maxVotes = 0;

        // Determine the candidate with the maximum votes
        for (uint256 i = 1; i <= candidateCount; i++) {
            if (candidate[i].candidate_voteCount > maxVotes) {
                maxVotes = candidate[i].candidate_voteCount;
                winnerId = i;
            }
        }

        isResultDeclared = true; // Set results status to declared
        electionStarted = false; // End the election
        return candidate[winnerId]; // Return the winning candidate's details
    }

    // Function to get whom a voter voted for along with the candidate's party name
    function getVoterChoice(
        address _voter
    ) public view returns (uint256 candidateId, string memory partyName) {
        require(voterDetails[_voter].hasVoted, "This address has not voted.");

        uint256 votedCandidateId = voterDetails[_voter].votedForCandidateId;
        string memory party = candidate[votedCandidateId].candidate_partyName;

        return (votedCandidateId, party);
    }

    // Function to get all available candidates
    function getCandidates() public view returns (Candidate[] memory) {
        Candidate[] memory candidates = new Candidate[](candidateCount);

        for (uint256 i = 1; i <= candidateCount; i++) {
            candidates[i - 1] = candidate[i];
        }

        return candidates;
    }

    // Function to get the current owner of the contract
    function getOwner() public view returns (address) {
        return owner;
    }

    // Function to get the list of voters who have voted
    function getVoters() public view returns (address[] memory) {
        return votersArr;
    }

    // Function to get the result status (whether results are declared or not)
    function resultStatus() public view returns (bool) {
        return isResultDeclared;
    }

    // Function to check if the election has started
    function isElectionStarted() public view returns (bool) {
        return electionStarted;
    }

    // Function to get the winner's details
    function getWinner() public view returns (Candidate memory) {
        require(isResultDeclared, "Results have not been declared yet.");
        return candidate[winnerId];
    }

    // Function to get election status
    function getElectionStatus()
        public
        view
        returns (bool started, bool declared)
    {
        return (electionStarted, isResultDeclared);
    }
}
