import React,{useState,useRef,useEffect} from 'react'
import db, { auth } from '../firebase'

const Home = ({user}) => {

    const [error,setError] = useState(null) 
    const dobRef = useRef(null);
    const pobRef = useRef(null);


    const [data,setdata] = useState(null)


    let profileRef =  db.collection('profile');
    useEffect(()=>
    { db.collection('profile').where('uid','==',user.uid).get().then(snap=>{
        snap.forEach(doc => setdata(doc.data()))
        console.log(data)
    })
    },[])
    // let unsubscribe = await profileRef.where('uid','==',user.uid)
    //                             .get().then((doc)=>{
    //                                 if (doc.exists){
    //                                     setdata(doc.data())
    //                                     console.log(data)
    //                                 }
    //                             })
    
    const handleSubmit =  (e) => {
        if ((!dobRef.current.value && dobRef.current.value.length < 0)  || (!pobRef.current.value && pobRef.current.value.length < 0)){
            setError("Both the fields are required");
            return
        } 
        e.preventDefault();
        const ob = {
            uid:user.uid,
            dob:dobRef.current.value,
            pob:pobRef.current.value,
        }
        profileRef.add(ob);       
        setdata(ob)               
    }
    

    if (data) {
        // console.log(data)
        return (
            <div className="card bg-dark text-white p-4 m-4">
                <h1>Welcome </h1>
                <hr></hr>
                <h4>Email           :   {user.email}</h4>
                <h4>Date Of Birth   :   {data.dob}</h4>
                <h4>PLace Of Birth  :   {data.pob}</h4>
                <button className="btn btn-danger" onClick={()=>auth.signOut()}>Sign Out</button>
            </div>
        )
    } else {
        return (
            <div className="card bg-dark text-white p-4 m-4">
                <form action="">
                    <h1>Last Step</h1>
                    <hr className="bg-white"></hr>
                    {error ? <div className="alert">{error} </div>: null}
                    <div class="form-group">
                        <input classname="form-control" ref={dobRef} type="email" placeholder="Date Of Birth" />                      
                    </div>
                    <div class="form-group">
                        <input classname="form-control" ref={pobRef} type="email" placeholder="Place Of Birth" />                      
                    </div>
                    
                    
                    <button className="btn btn-info" onClick={handleSubmit}>Submit </button>
                    
                </form>
            </div>
        )

    }
}

export default Home
