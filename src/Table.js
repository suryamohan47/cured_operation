import React, { useRef, useState } from "react";
import Data from './data.json';
import './table.css';
function Table(){

    const[data,setdata]=useState(Data)
    const[editvalue,seteditvalue]=useState(-1)

return(

    <div className="tablewrap">
        <div>
        <Addmember setdata={setdata}/>
        <form onSubmit={handleUpdate}>
    <table>
        
            <thead>
                
                <th>Name</th>
                <th>Email</th>
                <th>phone</th>
                <th>Action</th>



            </thead>

     {data.map((current)=>(
        editvalue === current.id ? <Editmember current={current} data={data} setdata={setdata}/>:
        <tr>
          
                
                <td>{current.name}</td>
                <td>{current.email}</td>
                <td>{current.phoneNo}</td>
                <td ><button type="button"className="edit" onClick={()=>handleedit(current.id)}>edit</button>
                <button type="button" className="delete" onClick={()=>handledelete(current.id)}>delete</button></td>
                




        </tr>

     ))}
     </table>
     </form>
     </div>


    </div>


)
function handleUpdate(e){
    e.preventDefault();
    const name = e.target.elements.name.value
    const email = e.target.elements.email.value
    const phone = e.target.elements.phone.value
    const updatedate = data.map(d=>d.id=== editvalue? {...d,name:name,email:email,phone:phone}:d)
   
    seteditvalue(-1)
    setdata(updatedate)
}


 function handleedit(id){
    return(
    seteditvalue(id)
    )



}
function handledelete(id){
    const updatedate = data.filter((d)=>id !== d.id)
    setdata(updatedate)


}

}

function Editmember({current,data,setdata}){
   
    function handleName(e){
     
       const name =e.target.value;
       const updatedate = data.map((d)=>d.id=== current.id?{...d,name:name}:d)
       setdata(updatedate)
    }
      function handleEmail(e){
        
       const email =e.target.value;
       const updatedata = data.map((d)=>d.id=== current.id?{...d,email:email}:d)
       setdata(updatedata)
    }
    function handlePhone(e){
    
       const phone =e.target.value;
       const updatedata = data.map((d)=>d.id=== current.id?{...d,phone:phone}:d)
       setdata(updatedata)
    }
return(
            <tr>
           <td><input type="text" onChange={handleName}value={current.name}name="name"placeholder="name"/></td>
           <td><input type="text" onChange={handleEmail}value={current.email}name="email"placeholder="email"/> </td>

           <td><input type="text" onChange={handlePhone}value={current.phone}name="phone"placeholder="phone"/></td>
            <td><button type="submit">Update</button></td>





             </tr>



)


}

function Addmember ({setdata}){
    const nameRef = useRef()
    const emailRef = useRef()
    const phoneRef = useRef()

    const handleValues=(e)=>{
        e.preventDefault();
    
        
        const name=e.target.elements.name.value;
        const email=e.target.elements.email.value;
        const phone=e.target.elements.phone.value;
        const newMember ={
            id:4,
            name,
            email,
            phone,



        }
        setdata(prevdata=>prevdata.concat(newMember))
        nameRef.current.value = ""
        emailRef.current.value = ""
        phoneRef.current.value = ""


    }
    return(
        <form className="addform"  onSubmit={handleValues}>
            
            <input type="text"name="name"placeholder="name" ref={nameRef}/>
            <input type="text"name="email"placeholder="email"ref={emailRef}/>

            <input type="text"name="phone"placeholder="phone"ref={phoneRef}/>
            <button>Add</button>


        </form>
    )




}


export default Table;

