require("dotenv").config()
const fs = require("fs")

const USERNAME = process.env.USERNAME
const API_TOKEN = process.env.API_TOKEN

const models = fs.readFileSync("Model.txt","utf-8")
.split("\n")
.map(x=>x.trim())
.filter(x=>x)

const prompts = fs.readFileSync("prompt.txt","utf-8")
.split("\n")
.map(x=>x.trim())
.filter(x=>x)

const headers = {
 Authorization:`Bearer ${API_TOKEN}`,
 "Content-Type":"application/json"
}

function sleep(ms){
 return new Promise(r=>setTimeout(r,ms))
}

function randomDelay(){
 return Math.floor(Math.random()*(50000-25000)+25000)
}

function randomPrompt(){
 return prompts[Math.floor(Math.random()*prompts.length)]
}

async function run(){

 console.log("===================================")
 console.log("AGENTWALLET WALUH RUNNER")
 console.log("===================================")
 console.log("Username :",USERNAME)
 console.log("Models :",models.length)
 console.log("Prompts :",prompts.length)
 console.log("Delay : 25 - 50 detik")
 console.log("===================================\n")

 for(let i=0;i<models.length;i++){

  const model = models[i]
  const prompt = randomPrompt()

  console.log(`JOB ${i+1}/${models.length}`)
  console.log("Model :",model)
  console.log("Prompt :",prompt)

  try{

   const res = await fetch(`https://frames.ag/api/wallets/${USERNAME}/actions/x402/fetch`,{
    method:"POST",
    headers,
    body:JSON.stringify({
     url:"https://registry.frames.ag/api/service/ai-gen/api/invoke",
     method:"POST",
     body:{
      model:model,
      prompt:prompt
     }
    })
   })

   const data = await res.json()

   console.log("Response:",data,"\n")

  }catch(e){

   console.log("Error:",e.message,"\n")

  }

  if(i < models.length-1){

   const delay = randomDelay()

   console.log(`Delay ${Math.floor(delay/1000)} detik\n`)

   await sleep(delay)

  }

 }

 console.log("SELESAI")

}

run()