import { useState } from "react"
import { useRef } from "react"

const App = () => {
  const cashInput = useRef()
  const selectCash = useRef()
  const descrip = useRef()
  const selout = useRef()
  const selin = useRef()
  const [cashIn, setCashIn] = useState(0)
  const [cashOut, setCashOut] = useState(0)
  const [balance, setBalance] = useState(0)
  const [Category, setCategory] = useState()
  const [details, setDetails] = useState([])



  const submit = () => {
    const newTransaction = {
      Time: new Date().toLocaleTimeString(),
      income: selectCash.current.value === "Cashin" ? +cashInput.current.value : 0,
      expanse: selectCash.current.value === "Cashout" ? +cashInput.current.value : 0,
      total:
        selectCash.current.value === "Cashin"
          ? balance + +cashInput.current.value
          : balance - +cashInput.current.value,
      category:
        selectCash.current.value === "Cashin"
          ? selin.current.value
          : selectCash.current.value === "Cashout"
            ? selout.current.value
            : null,
      description: descrip.current.value,
    };

    setDetails((prevDetails) => [...prevDetails, newTransaction]); // Add new item to array
    if (selectCash.current.value === "Cashin") {
      setCashIn(cashIn + +cashInput.current.value);
      setBalance(balance + +cashInput.current.value);
    } else if (selectCash.current.value === "Cashout") {
      setCashOut(cashOut + +cashInput.current.value);
      setBalance(balance - +cashInput.current.value);
    }
    
    cashInput.current.value = ""
    selectCash.current.value = ""
    descrip.current.value = ""
    if (Category) {
      selin.current.value = ""; // Reset Cashin category
    } else {
      selout.current.value = ""; // Reset Cashout category
    }
    



  };










  return (
    <>

      <div>
        <div className="navbar bg-slate-200  ">
          <p className="text-3xl pb-3 ms-10">Manage your expenses </p>
        </div>
        <div className="flex ms-32 gap-20 mt-5">
          <p className="text-ghost text-xl font-semibold">Cash in</p>
          <p className="text-ghost text-xl font-semibold">Cash out</p>
          <p className="text-ghost text-xl font-semibold">Balance</p>
        </div>

        <div className="text-blace flex gap-20 ms-32">
          <p className="btn btn-ghost text-2xl text-yellow-600"> {cashIn} </p>
          <p className="btn btn-ghost text-2xl text-red-500">{cashOut}</p>
          <p className="btn btn-ghost text-2xl text-blue-500">{balance}</p>
        </div>
        <div className=" grid lg:grid-cols-2 ">
          <div className="ms-[7rem] flex flex-col  bg-base-200 rounded-2xl gap-3 w-[400px] py-10">
            <input type="number" placeholder="Add your amount" className="input input-accent w-full max-w-xs ms-10" ref={cashInput} />
            <div className="dropdown  ms-10">
              <select className="select text-base w-full max-w-xs bg-neutral-200 border-neutral-700" onChange={(e) => {
                e.target.value == "Cashin" ? setCategory(true) : e.target.value == "Cashout" ? setCategory(false) : null
              }}
                ref={selectCash}
                defaultValue=""
              >
                <option className="text-base" value='' disabled> Select transiction type </option>
                <option className="text-base" value="Cashin"> Cash in </option>
                <option className="text-base" value="Cashout"> Cash out </option>
              </select>
            </div>

            {Category ? <div className="dropdown ms-10">
              <select className="select text-base w-full max-w-xs bg-neutral-200 border-neutral-700" defaultValue="" ref={selin}>
                <option className="mb-5 text-base" value='' disabled >Select category</option>
                <option className="mb-5 text-base" value="salery">salery</option>
                <option className="mb-5 text-base" value="busnie">busniess</option>
                <option className="mb-5 text-base" value="investment">investment </option>
                <option className="mb-5 text-base" value="loan">loan</option>

              </select>
            </div> : !Category ? <div className="ms-10">
              <select className="select text-base   w-full max-w-xs bg-neutral-200 border-neutral-700" defaultValue="" ref={selout}>
                <option className="mb-5 text-base" value='' disabled >Select cetogary </option>
                <option className="mb-5 text-base" >Fuel</option>
                <option className="mb-5 text-base" value="Food/drink">Food/drink</option>
                <option className="mb-5 text-base" value="Car/bike">Car/bike</option>
                <option className="mb-5 text-base" value="Taxi">Taxi</option>
                <option className="mb-5 text-base" value="Clothes">Clothes</option>
                <option className="mb-5 text-base" value="Shopping">Shopping</option>
                <option className="mb-5 text-base" value="Entairnment">Entairnment</option>
                <option className="mb-5 text-base" value="Electricity">Electricity</option>
              </select>
            </div> : null}

            <div>
              <textarea type="textarea" placeholder="description" className="input input-bordered w-full max-w-xs ms-10 mt-5  h-24" ref={descrip} />
              <br />
              <button className="btn btn-primary ms-32 mt-3 w-32 " onClick={submit}>Submit</button>
            </div>
          </div>


          <div className="bg-base-100 p-4 shadow-xl me-10 h-[450px] overflow-y-auto border rounded-[10px]">
            {details && details.map((item, index) => {
              return <div className="collapse bg-base-200 mb-1" key={index}>
              <input type="checkbox" />
              <div className="collapse-title py-2"><span className="text-3xl">Summary :</span> <span className="text-xl"> {item.Time} </span></div>
              <div className="collapse-content">
                <h2 className="card-title text-2xl"></h2>

                <h2 className=""> <span className="font-bold"> Income: </span> {item.income}</h2>
                <h2 className=""> <span className="font-bold">Expanse:</span> {item.expanse}</h2>
                <h2 className=""> <span className="font-bold">Category:</span> {item.category}</h2>
                <h2 className=""> <span className="font-bold">Total:</span> {balance}</h2>
                <p  className=""> <span className="font-bold">Description:</span> <span className="text-lg"> {item.description} </span> </p>
              </div>
            </div>
  
            })}

          </div>
          









        </div>
      </div>















    </>
  )
}

export default App