import { useState } from "react";
import axios from "axios";
const R = () =>{
    const [u,setU]  = useState({
        e:"",
        p:""
    })
    const hR =async() =>{
        console.log(u)
        const res = await axios.post("http://localhost:8000/api/r",u)
        setU({
            e:"",
            p:""
        })
        console.log(res)
    }
    return(
        <>
        <input type="text" name="e" value={u.e} onChange={e=>{setU({...u,[e.target.name]:e.target.value})}} placeholder="e"/>
        <input type="password" name="p" value={u.p} onChange={e=>{setU({...u,[e.target.name]:e.target.value})}} placeholder="p"/>
        <button onClick={hR}>R</button>
        </>
    )
}

export default R;