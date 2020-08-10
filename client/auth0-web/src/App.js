import React from "react";
import { useForm } from "react-hook-form";
import { useAuth0 } from "@auth0/auth0-react";

const IMAGES =[]



export default function App() {
  const { user, isAuthenticated } = useAuth0();
  const { register, handleSubmit, watch, errors } = useForm();
  const [status,setstatus]=React.useState(false)
  const renderImage=(imageUrl) =>{
    return (
      <div>
        <img src={imageUrl} width="70%" />
      </div>
    );
  }
  const onSubmit =async data => {
    if(isAuthenticated){
      console.log(data);  
      await fetch(`http://159.89.172.222/urlstatus?url=${data.exampleRequired}`)
      .then(response => response.json())
      .then(data=>{
        for(let i=0;i<5;i++){
          IMAGES.push(`http://159.89.172.222/${data.filename}_desktop${i}.png`)
        }
        setstatus(true)
      })
    }
    else
    {
      alert("Login is Required")
    }
  }
  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="exampleRequired" ref={register({ required: true })} />
      {errors.exampleRequired && <span>This field is required</span>}
      <input type="submit" />
    </form>
    {IMAGES.map(imageUrl=>renderImage(imageUrl))}
    </>
  );
}