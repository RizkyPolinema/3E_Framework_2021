//agar function arrow HelloComponent bisa berjalan  di react maka tambahkan react 
import React from 'react';
import './Login.css';

const Login = () => {
    
        return(
            <div>
                <h2>Form Login</h2>
                <form>
                <h1>Tugas Pertemuan Ketiga</h1>
                  <div className="container">
                      <label><b>Username</b></label>
                      <input type="text" class="form-control" id="username" placeholder="masukkan username" required />
                      
                      <label for="password" class="col-sm-2 col-form-label"><b>Password</b></label>
                      <input type="password" class="form-control" id="psw" placeholder="Masukkan Password Anda" required />
                      
                      <button type="submit">Login</button>
                      
                      <div style={{textAlign:"center"}}>
                          <input type="checkbox" defaultChecked/> Remember Me 
                      </div>
                  </div>
                  
                  <div className="container" style={{textAlign:"center"}}>
                    <button type="button" className="cancelbtn">Cancel</button>
                  </div>
                </form>
            </div>
        );
    }


//agar component ini dapat dipakai  dimana aja
export default Login;