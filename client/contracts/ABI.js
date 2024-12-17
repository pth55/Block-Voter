const contractABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_partyName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_partyLogo",
				"type": "string"
			}
		],
		"name": "addCandidate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_candidateId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_aadhaarNumber",
				"type": "uint256"
			}
		],
		"name": "addVote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "declareResults",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "candidate_id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "candidate_name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "candidate_voteCount",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "candidate_partyName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "candidate_partyLogo",
						"type": "string"
					}
				],
				"internalType": "struct Elections.Candidate",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "startElection",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "getCandidates",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "candidate_id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "candidate_name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "candidate_voteCount",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "candidate_partyName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "candidate_partyLogo",
						"type": "string"
					}
				],
				"internalType": "struct Elections.Candidate[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getElectionStatus",
		"outputs": [
			{
				"internalType": "bool",
				"name": "started",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "declared",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getOwner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_voter",
				"type": "address"
			}
		],
		"name": "getVoterChoice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "candidateId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "partyName",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getVoters",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getWinner",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "candidate_id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "candidate_name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "candidate_voteCount",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "candidate_partyName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "candidate_partyLogo",
						"type": "string"
					}
				],
				"internalType": "struct Elections.Candidate",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "isElectionStarted",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_aadhaarNumber",
				"type": "uint256"
			}
		],
		"name": "isVoted",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "resultStatus",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

export default contractABI;
