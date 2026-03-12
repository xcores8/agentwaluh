# AgentWaluh FRAMES

Automation scripts for testing **AgentWallet API** including wallet transfers, Solana devnet actions, x402 payments, and AI tool registry execution.

This repository demonstrates how developers can interact with the AgentWallet ecosystem and automate common tasks such as transfers, payments, and AI tool execution.

---

# Create AgentWallet Account

Before running the scripts in this repository you need an **AgentWallet account**.

Create an account using this referral link:

👉 https://frames.ag/connect?ref=corescd8

### Registration Steps

1. Open the referral link above
2. Enter your **email address**
3. Verify using the **OTP code** sent to your email
4. After verification your **AgentWallet wallet will be created automatically**

Once your account is created you will receive:

* **Username**
* **API Token**
* **EVM Wallet Address**
* **Solana Wallet Address**

Save your **username** and **API token** because they are required to run the scripts.

---

# Installation

Clone the repository:

```id="clone01"
git clone https://github.com/xcores8/agentwaluh.git
cd agentwaluh
```

Install dependencies:

```id="install01"
npm install
```

---

# Environment Setup

Create `.env` file:

```id="env01"
USERNAME="your_agentwallet_username"
API_TOKEN="your_agentwallet_api_token"
```

Example:

```id="env02"
USERNAME="exampleuser"
API_TOKEN="sk_live_xxxxxxxxxxxxxxxxx"
```

⚠️ Never upload `.env` to GitHub.

---

# Project Structure

```id="structure01"
agentwaluh
│
├─ index.js
├─ solana.js
├─ payment.js
├─ tool-runner.js
│
├─ Model.txt
├─ prompt.txt
├─ walletsend.txt
├─ walletsendsol.txt
│
├─ package.json
└─ README.md
```

---

# Script Explanation

## index.js

Script used to test **Base Sepolia transactions** using AgentWallet.

Features:

* Check wallet information
* Sign message
* Send ETH transactions
* Random transfer amount
* Random delay between transactions

Run:

```id="runindex"
node index.js
```

Required:

* Base Sepolia ETH
* wallet addresses inside `walletsend.txt`

---

## solana.js

Script used to test **Solana Devnet features**.

Features:

* Claim **SOL faucet**
* Send SOL to target wallets
* Random delay between transfers

Run:

```id="runsolana"
node solana.js
```

Target wallets are stored in:

```id="solfile"
walletsendsol.txt
```

---

## payment.js

Script used to test **AgentWallet x402 payment proxy**.

This allows agents to automatically pay for API requests.

Example use cases:

* paid APIs
* machine-to-machine payments
* automated tool execution

Run:

```id="runpayment"
node payment.js
```

The script will send requests through:

```
/api/wallets/{username}/actions/x402/fetch
```

---

## tool-runner.js

Script used to test **AI Tool Registry** provided by AgentWallet.

Features:

* load models from `Model.txt`
* load prompts from `prompt.txt`
* execute tools via AgentWallet
* random delay between requests

Run:

```id="runtool"
node tool-runner.js
```

Example model list:

```id="modeltxt"
google/nano-banana-pro
google/nano-banana-pro
```

Example prompt list:

```id="prompttxt"
a futuristic cyberpunk city
a robot drinking coffee
a fantasy dragon flying above mountains
```

---

# Example Tools

Some models available in the registry:

* google/nano-banana-pro
* openai/sora-2-pro
* google/veo-3.1

These tools use **USDC payments via x402**.

---

# Testnet Funds

To run some scripts you may need testnet tokens.

Examples:

Base Sepolia

* ETH for EVM transactions

Solana Devnet

* SOL for transfers
* USDC for tool payments

---

# Referral

If this repository helps you, consider joining AgentWallet using the referral link:

👉 https://frames.ag/connect?ref=corescd8

---

# Disclaimer

This repository is intended for **development and testing purposes only**.

Some tools may require payment in **USDC** when executed.

---

# Author

GitHub
https://github.com/xcores8
