import Web3 from "web3";
import contractABI from "./ABI";
const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

let web3;
let contract;


export async function connectToBlockchain() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });
    contract = new web3.eth.Contract(contractABI, contractAddress);
  } else {
    alert("Please install MetaMask!");
  }
}

export async function startElection() {
  const accounts = await web3.eth.getAccounts();
  try {
    await contract.methods.startElection().send({ from: accounts[0] });
    alert("Election has started.");
  } catch (error) {
    console.error("Error starting election:", error);
    alert("Could not start election. Only owner can start it.");
  }
}

export async function addCandidate(name, partyName, partyLogo) {
  const accounts = await web3.eth.getAccounts();
  try {
    await contract.methods.addCandidate(name, partyName, partyLogo).send({ from: accounts[0] });
    alert("Candidate added successfully.");
  } catch (error) {
    console.error("Error adding candidate:", error);
    alert("Failed to add candidate. Only owner can add candidates.");
  }
}

// Function to cast a vote
export async function addVote(candidateId, aadhaarNumber) {
  const accounts = await web3.eth.getAccounts();
  try {
    await contract.methods.addVote(candidateId, aadhaarNumber).send({ from: accounts[0] });
    alert("Vote cast successfully.");
  } catch (error) {
    console.error("Error casting vote:", error);
    alert("Failed to cast vote. Check if you've already voted or used this Aadhaar number.");
  }
}

// Function to declare results
export async function declareResults() {
  const accounts = await web3.eth.getAccounts();
  try {
    const receipt = await contract.methods.declareResults().send({ from: accounts[0] });
    const winner = await contract.methods.getWinner().call();  // Retrieve the winner details after declaring results
    console.log(winner);
    alert(`Results declared. Winner is: ${winner.candidate_name}`);
    return winner;  // Return the winner details to be used in the frontend
  } catch (error) {
    console.error("Error declaring results:", error);
    alert("Failed to declare results. Only owner can declare results.");
  }
}

export async function resultStatus() {
  try {
    const declared = await contract.methods.resultStatus().call();
    return declared;
  } catch (error) {
    console.error("Error checking results status:", error);
    alert("Failed to check if results are declared!");
  }
}


// Function to get all candidates
export async function getCandidates() {
  try {
    const candidates = await contract.methods.getCandidates().call();
    console.log("Candidates:", candidates);
    return candidates;
  } catch (error) {
    console.error("Error fetching candidates:", error);
    alert("Failed to fetch candidates.");
  }
}

// Function to check if a voter has voted
export async function checkIfVoted(aadhaarNumber) {
  const accounts = await web3.eth.getAccounts();
  try {
    const voted = await contract.methods.isVoted(parseInt(aadhaarNumber)).call({ from: accounts[0] });
    return voted; // Returns true if the Aadhaar number has voted, otherwise false
  } catch (error) {
    console.error("Error checking if voted:", error);
    alert("Failed to check if the Aadhaar number has voted.");
    return false; // Return false in case of error
  }
}

export async function getVoterChoice() {
  try {
    const accounts = await web3.eth.getAccounts();
    const voterAddress = accounts[0];

    const result = await contract.methods.getVoterChoice(voterAddress).call();

    // const candidateId = result[0];  // Candidate ID voted for
    const partyName = result[1];    // Party name of the candidate
    console.log(result[1]);
    return partyName;

  } catch (error) {
    console.error("Error fetching voter choice:", error);
    alert("An error occurred while fetching your vote. MAKE SURE YOU CONNECTED WITH RIGHT ACCOUNT IN METAMASK");
  }
}


// Function to check if the election has started
export async function isElectionStarted() {
  try {
    const started = await contract.methods.isElectionStarted().call();
    return started;
  } catch (error) {
    console.error("Error checking election status:", error);
    alert("Failed to check if election has started.");
  }
}



// Function to get winner information
export async function getWinner() {
  try {
    const winner = await contract.methods.getWinner().call();
    console.log("Winner:", winner);
    return winner;
  } catch (error) {
    console.error("Error getting winner:", error);
    alert("Failed to get the winner information.");
  }
}


// export async function getSortedCandidates() {
//   try {
//     const candidates = await contract.methods.getSortedCandidates().call();

//     // formatting input
//     const formattedCandidates = candidates.map(candidate => ({
//       id: candidate.candidate_id,
//       name: candidate.candidate_name,
//       party: candidate.candidate_partyName,
//       voteCount: candidate.candidate_voteCount,
//       partyLogo: candidate.candidate_partyLogo
//     }));
//     console.log(formattedCandidates);
//     return formattedCandidates;

//   } catch (error) {
//     console.error("Error fetching sorted candidates:", error);
//     alert("An error occurred while fetching the candidates.");
//   }
// }
