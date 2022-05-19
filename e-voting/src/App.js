import { useEffect, useState } from "react";
import Web3 from "web3/dist/web3.min.js";
import detectEthereumProvider from "@metamask/detect-provider";
import {loadContract} from './utils/load-contract';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
    contract :null
  });

  const [account, setAccount] = useState(null);

  const [name,setName]=useState("");
  const [age,setAge]=useState("");
  const [id, setId]= useState("");

  //for representative
  const Representative=(e)=>{
    e.preventDefault();
    const {contract}=web3Api;
    
    contract.representate(name, age, id,{
      from: account,
    });
  }

  //get candidate list
  const getCandidate=async(e)=>{
    e.preventDefault();
    const {contract}=web3Api;
    alert(await contract.getCandidates({
      from: account,
    }));
  }

  //getWinner
  const getWinner=async(e)=>{
    e.preventDefault();
    const {contract}=web3Api;
    alert(await contract.winner({
      from: account,
    }));
  }

  //get full result
  const getFullResult=async(e)=>{
    e.preventDefault();
    const {contract}=web3Api;
    alert(await contract.getVoteResult({
      from: account,
    }));
  }

  //vote 
  const [votefor,setVoteFor]=useState("");
  const handleVote=(e)=>{
    e.preventDefault();
    const {contract}=web3Api;
   contract.vote(votefor,{
      from: account,
    });
  }


  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();
      const contract= await loadContract("VotingContract",provider)
      if (provider) {
        provider.request({ method: "eth_requestAccounts" });
        setWeb3Api({
          web3: new Web3(provider),
          provider,
          contract
        });
      } else {
        console.error("Please install MetaMask!");
      }
    };

    loadProvider();
  }, []);

  useEffect(()=>{
    const getAccount = async()=>{
      const accounts= await web3Api.web3.eth.getAccounts();
      setAccount(accounts[0]);
    };
    web3Api.web3 && getAccount();
  },[web3Api.web3]);


  return (<>
        <div className="main">
        <Header account={account} />
        <div className="voting-body">
          
          
          <div className="representate">
            <h3>Registration for Candidates</h3>
            {/* for candidate */}
            <div className="registrationMargin">
            <div className="candidateMargin">
            <label>Name</label><br/>
            <input type="text" autoComplete="off" name="candidateName" placeholder="Enter name" value={name} 
            onChange={(e)=>{
              const newName=e.target.value;
              setName(newName);
            }}/>
                </div>
              
              <div className="candidateMargin">
            <label>Age</label><br/>
            <input type="text" autoComplete="off" name="candidateAge" placeholder="Enter Age" value={age} 
            onChange={(e)=>{
              const newAge=e.target.value;
              setAge(newAge);
            }}/>
              </div>
            <div className="candidateMargin">
            <label>Id</label><br/>
            <input type="text" autoComplete="off" name="candidateId" placeholder="enter ID" value={id} 
              onChange={(e)=>{
              const newId=e.target.value;
              setId(newId);
            }}
            />
              </div>
            
            <button type="button" className="btn btn-dark" value="submit" onClick={Representative} >Register</button>
            </div>
            </div>



            <div className="voter">
            
          <h3 className="heading">Voter Section</h3>

          {/* get candidates */}<br/>
          <span className="labelcandidate">Click to get the list of Candidates </span>
          <button type="button" className="btn btn-dark btn-sm" onClick={getCandidate}>Get Candidates</button>
     
         <br/>
       
          
          {/* vote for */}
          <input type="text" name="voteFor" placeholder="Enter Candidate Name" autoComplete="off" onChange={(event)=>{
            const newVoteFor=event.target.value;
            setVoteFor(newVoteFor);
          }} />
          <button type="button" className="btn btn-dark btn-sm" onClick={handleVote}>Vote</button> <br/>
          <p className="labelcandidate">vote would be done from account: <br/> {account} </p><br/>
          {/* get votes for particular candidate */}
          <input type="text" autoComplete="off" name="candidateName" placeholder="Enter Candidate Name"  />
          <button type="button" className="btn btn-dark btn-sm">View Vote</button>
          <p className="labelcandidate">Get Votes for particular Candidate</p>
          </div>
        </div>

          <div className="result">
          <h3 className="result-section">Result Section</h3>
          <div className="show-result">
          <button type="button" className="btn btn-outline-info btn-lg" onClick={getFullResult}>Get Full Result</button>
          </div>
          <div className="winner">
          <button type="button" className="btn btn-outline-info btn-lg" onClick={getWinner}>Show Winner</button>
          </div>'
          </div>


        
        <Footer />
      </div>
  </>
  );
}
export default App;
