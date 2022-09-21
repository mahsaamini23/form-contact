import React, {useState} from "react";
import {faker} from '@faker-js/faker';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsToDot, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import "./App.css";




const friend = [{id:1, firstName:"Sara" , lastName:"Amini" , age:18 , country:"iran" , code:"+98", phone: 88767574, email:"saraAmini@gmail.com"},
                {id:2, firstName:"Ali" ,lastName:"Moradi" , age:26 , country:"iran" , code:"+98", phone:76754534, email:"aliMoradi@yahoo.com"},
                {id:3, firstName:"Mahsa" , lastName:"Mohammadi" ,age:21 , country:"iran" , code:"+98" , phone: 45342312, email:"mahsaMohammadi@yahoo.com"},
                {id:4, firstName:"john" , lastName:"Caprio" ,age:24 , country:"iran" , code:"+98" , phone: 45342312, email:"j.Caprio@yahoo.com"},
                {id:5, firstName:"joly" , lastName:"Great" ,age:21 , country:"iran" , code:"+98" , phone: 45342312, email:"joli.Great@yahoo.com"}];


function App() {
  const[friends , setFriends] = useState(friend);
  const[mode , setMode] =useState("add");
  const[form , setForm] = useState ({firstName:"", lastName:"", age:"", country:"", code:"" ,phone:"" ,email:""});
  const[search, setSearch]= useState("");
  const[count ,setCount] = useState(0);

  const handelOk =()=>{
    let positive = "ok"
    return(positive);
  }
  const handelDelete = (id) =>{
    document.getElementById("massage").style.display="block";
    let result=handelOk();
    console.log(result);
    if(result==="ok"){
      setFriends(friends.filter(item => item.id !== id));
      document.getElementById("massage").style.display="none";
    }else{
      document.getElementById("massage").style.display="none";
    }
  }

  const handelSubmit = (e) => {
    e.preventDefault();
    if(mode==="add"){
      setFriends([...friends , { id:Math.floor(Math.random() * 1000),  firstName:form.firstName ,lastName:form.lastName,
      age:form.age, country:form.country, code:form.code, phone:form.phone, email:form.email}]);
    }else{
      setFriends(friend.map(friend=> friend.id === form.id ? form:friend));
    }
    setForm({firstName:"", lastName:"", age:"", country:"", code:"" ,phone:"" ,email:""});
    setMode("add");
  }

  const handelEdit =(friend)=>{
    setMode("Edit");
    setForm(friend);
  }

  const handelChange=(e)=>{
    setForm({...form,[e.target.name]:e.target.value});
  }


  const handelHeart = (id)=>{
    setCount(count+1)
    console.log(id);
    for(let i=0; i<friend.length; i++){
      if(friend[i].id === id){
        if(count===0 || count%2===0){
          document.getElementById("heart").style.color="red";
        }else{
          document.getElementById("heart").style.color="grey";
        }
      }
    }
  }
  
  return(
    <div>
      <div className="search_container">
        <div className="search">
          <div className="search_icon">
            <FontAwesomeIcon icon={faMagnifyingGlass} rotation={90}  style={{color:"grey"}}/>
          </div>
          <input className="search_input" onChange={e=>setSearch(e.target.value)}/>
        </div>
      </div>

      <div id="massage" className="massage_delete" style={{display:"none"}}>
        <p>Are you sure to delete this item?</p>
        <button className="btn_massage" type="button" onClick={handelOk}>Ok</button>
        <button className="btn_massage" type="button" >No</button>
      </div>
      
      <div className="form_container">
        <form  className="form" onSubmit={handelSubmit}>
          <div className="form_item">
            <label> FirstName :</label>
            <input    name={"firstName"}    type="text"     value={form.firstName}    onChange={handelChange}></input>
          </div>
          <div className="form_item">
            <label>LastName : </label>
            <input   className="form_item"  name={"lastName"}     type="text"     value={form.lastName}     onChange={handelChange}></input>
          </div>
          <div className="form_item" >
            <label> Age : </label>
            <input   className="form_item"  name={"age"}          type="text"     value={form.age}          onChange={handelChange}></input>
          </div>
          <div className="form_item">
            <label> Country :</label>
            <input    className="form_item"  name={"country"}      type="text"     value={form.country}      onChange={handelChange}></input>
          </div>
          <div className="form_item">
            <label> Code : </label>
            <input    className="form_item"  name={"code"}         type="text"     value={form.code}         onChange={handelChange}></input>
          </div>
          <div className="form_item">
            <label> Phone :</label>
            <input    className="form_item"  name={"phone"}        type="tel"      value={form.phone}        onChange={handelChange}></input>
          </div>
          <div className="form_item">
            <label> Email :</label>
            <input    className="form_item"  name={"email"}        type="email"    value={form.email}        onChange={handelChange}></input>
          </div>
          <button className="btn_form" type={"submit"}>{mode==="add" ? "Create" : "Update"}</button>
        </form>
      </div>
      

      {friends.filter(friend => {
        if (search === '') {
            return friend;
        }else if (friend.firstName.toLowerCase().includes(search.toLowerCase())) {
            return friend;
        }}).map(friend=>(
        <div className="card" style={{border:"1px solid black"}}>
          <div className="profile_card">
            <img style={{width:"50px" , height:"50px" , borderRadius:"100%"}} src={faker.internet.avatar()}/>
            <div className="option_container">
              <FontAwesomeIcon id="heart" icon={faHeart} style={{color:"grey"}} size="1x" onClick={()=>handelHeart(friend.id)}/>
              <div className="option" id="option" style={{display:"none"}}>
                
              </div>
            </div>
          </div>
          <div className="card_details">
            <div style={{display:"none"}}>id:{friend.id}</div>
            <div>firstName:{friend.firstName}</div>
            <div>lastName:{friend.lastName}</div>
            <div id="d_none">age:{friend.age}</div>
            <div id="d_none">country:{friend.country}</div>
            <div>code:{friend.code}</div>
            <div>phone:{friend.phone}</div>
            <div id="d_none">email:{friend.email}</div>
            <div className="btn_container">
              <div className="btn_card">
                <FontAwesomeIcon icon={faPen} style={{color:"grey"}} />
                <button  className="btn_edit" type="button" onClick={()=> handelEdit(friend)}>Edit</button>
              </div>
              <div className="btn_card">
                <FontAwesomeIcon icon={faTrash} style={{color:"grey"}}/>
                <button className="btn_delete" type="button" onClick={() => handelDelete(friend.id)}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;


  
