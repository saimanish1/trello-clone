import instance from "../../axios-users";

export const addBoard = (title,history)=>{
  return  async dispatch=>{
      try
     { const res=await instance.post('/boards',{title});
      console.log(res.data);
     }
     catch (e) {
         console.log(e.response);
     }
  }  
};