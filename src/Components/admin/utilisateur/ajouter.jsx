import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import NavUser from '../../deconnexion';



const Adduser = () => {
    
const [ville, setville] = useState([]);
const [admin, setadmin] = useState([]);
const [email, setemail] = useState("");
const [noms, setnoms] = useState("");
const [password, setpassword] = useState("");
const [villes, setvilles] = useState("");
const [statutR, setstatut] = useState("");
const [loading, setLoading] = useState(true);


const url = '${process.env.REACT_APP_SERVICE_API}admin';
let token = `Bearer ${localStorage.getItem("token")}` ;
let navigation = useNavigate();
    const creer = () => {
        if(email == "" || noms == "" || password == ""){
            Swal.fire({
                icon: 'info',
                title: 'Attention',
                text: 'Veuillez remplir tous les champs !!!',
              })
        }else{
                axios.post(url,{
                nom : email,
                noms : noms,
                mot : password,
                ville : villes,
                status : statutR
            },
            {
                headers : {
                    Accept: 'application/json',
                    'Content-Type' : 'application/json',
                    Authorization : token
                }
            }
            ).then((response) => {
                Swal.fire({
                    icon : 'success',
                    text : 'Success',
                    confirmButtonText: 'OK'
                });
            }).catch((error) => {
               console.log(error)
            })
        }
    }
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}admin`,
            {
                headers : {
                    Accept: 'application/json',
                    'Content-Type' : 'application/json',
                    Authorization : token
                }
            }
        ).then((response) => {
            setadmin(response.data.data);
            setLoading(false)
        }).catch((error) => {
            alert(error)
        })
    }, [])
    const DeleteUser = (id) => {
        axios.delete(`${process.env.REACT_APP_SERVICE_API}admin/${id}`,{
            headers : {
                Accept: 'application/json',
                'Content-Type' : 'application/json',
                Authorization : token
            }
        }).then((response) => {
            Swal.fire({
                icon : 'success',
                text : 'Success',
                confirmButtonText: 'OK'
            });
        }).catch((error) => {
            alert(error)
        })
    }
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}ville`,
            {
                headers : {
                    Accept: 'application/json',
                    'Content-Type' : 'application/json',
                    Authorization : token
                }
            }
        ).then((response) => {
            setville(response.data.data);
        }).catch((error) => {
            alert(error)
        })
    }, [])

const TableauAdmin = [
        {'nom' : "Admin"},
        {'nom' : "Utilisateur"},
        {'nom' : "Menage"},
        {'nom' : "Auditeur"}
    ];

    const [zindex, setzindex] = useState('');
    const ModalButon = () => {
        setzindex(1)
    }
    const modDes = () => {
        setzindex('')
    }
    return(
        <>
           <div className="card">
                <div className="card-body">
                  <h2 className='text-center'>LISTE DES UTILISATEURS</h2>
                  <hr />
                  <h5 className="card-title"> <a href="" data-bs-toggle="modal" data-bs-target="#addadmin" className="btn btn-primary"> Ajouter un utilisateur</a></h5>
                  <div className="table-responsive">
                    <table
                      id="zero_config"
                      className="table table-striped table-bordered"
                    >
                      <thead>
                        <tr>
                          <th>Numero</th>
                          <th>Email</th>
                          <th>Login Utilisateur</th>
                          <th>Site Aff.</th>
                          <th>Sites Aff.</th>
                          <th>Profil</th>
                          <th>Etat</th>
                          <th>Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                      {
                            admin.map((e) => {
                                return (
                                    <tr>
                                        <td>{e.id}</td>
                                        <td>{e.nom}</td>
                                        <td>{e.noms}</td>
                                        <td>{e.nom_site }</td>
                                        <td>{e.ville}</td>
                                        <td>{e.status}</td>
                                        <td>{e.etat}</td>
                                        <td>{e.created_at}</td>
                                        <td>
                                            <button className="btn btn-danger" onClick={ () => {DeleteUser(e.id)}}>
                                                <i className="mdi mdi-delete"></i>
                                            </button>
                                            <button className="fa fa-edit btn btn-primary" data-bs-toggle="modal" data-bs-target="#modadmin"></button>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                    </table>
                    <center>
                        {
                            loading === true && (
                                <p><i className="fa fa-pulse fa-spinner text-primary" style={{fontSize : 40}} ></i></p>
                            )
                        }
                    </center>
                  </div>
                </div>
              </div>

<div className="modal fade" style={{zIndex : zindex}} id="addadmin"  tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
        <div className="modal-content">
        <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">CREER UTILISATEUR</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
            <div className="modal-body">
                    <div>
                        <label for="">Email</label>
                        <input type="email" onChange={(e) => {setemail(e.target.value)}}  className="form-control" />
                    </div>
                    <div>
                        <label for="">Noms</label>
                        <input type="text" onChange={(e) => {setnoms(e.target.value)}} className="form-control" />
                    </div>
                    <div>
                        <label for="">Password</label>
                        <input type="text" onChange={(e) => {setpassword(e.target.value)}} className="form-control" />
                    </div>
                    <div>
                        <label for="">Ville Utilisateur</label>
                        <select name="site" onChange={(e) => {setvilles(e.target.value)}} className="form-control">
                            {
                                ville.map((e) => {
                                    return(
                                        <option key={e.id} value={e.id}>{e.ville}</option>
                                    );
                                })
                            }
                        </select>
                    </div>
                    <div>
                        <label for="">Statut Utilisateur</label>
                        <select name=" site" onChange={(e) => {setstatut(e.target.value)}} className="form-control">
                             {
                                TableauAdmin.map((z) => {
                                    return(
                                        <option key={z.id} value={z.nom}>{z.nom}</option>
                                    )
                                })
                             }
                        </select>
                    </div>
            </div>
            <div className="modal-footer">
            <a href="" data-bs-toggle="modal" data-bs-target="#accesadmin" className="btn btn-primary"> + Acces</a>
                <button data-bs-toggle="modal" data-bs-target="#modadmin"  onClick={ModalButon} className="btn btn-primary">Creer un utilisateur</button>
            </div>
        </div>
    </div>
</div>
<div className="modal fade" id="accesadmin" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
        <div className="modal-content">
        <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">ACCES</h5>
            <button type="button" onClick={modDes} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
            <div className="modal-body">
                <div className='row'>
                     <div className='col-md-4'>
                         <h6>Utilisateur</h6>
                     </div>
                     <div className='col-md-4'>
                         <h6>Profil</h6>
                     </div>
                     <div className='col-md-4'>
                         <h6>Etat</h6>
                     </div>
                     <div className='col-md-12'>
                        <h6>Acces a</h6>
                     </div>
                     <div className='col-md-4'>
                         <h6>TOUS</h6>
                         <input type='radio' />
                     </div>
                     <div className='col-md-4'>
                        <h6>VEHICULE</h6>
                            <input type='radio' />
                        </div>
                     <div className='col-md-4'>
                        <h6>GENERATEUR</h6>
                         <input type='radio' />
                     </div>
                     <div className='col-md-4'>
                         <h6>Site</h6>
                     </div>
                     <div className='col-md-4'>
                        <h6>Acces en lecture</h6>
                           
                    </div>
                     <div className='col-md-4'>
                        <h6>Acces en Ecriture</h6>
                         <input type='checkbox' />
                     </div>
                     
                </div>
            </div>
            <div className="modal-footer">
                <button onClick={creer} className="btn btn-primary">Valider Acces</button>
            </div>
        </div>
    </div>
</div>
<div className="modal fade" id="modadmin" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
        <div className="modal-content">
        <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">MODIFIER UN UTILIATEUR</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
            <div className="modal-body">
                <div className='row'>
                     
                </div>
            </div>
            <div className="modal-footer">
                <button onClick={creer} className="btn btn-primary">Modifier</button>
            </div>
        </div>
    </div>
</div>
        </>
    );
}

export default Adduser;