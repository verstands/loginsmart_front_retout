import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { Checkbox } from "@mui/material";
import Swal from "sweetalert2";



const Assurer_vehicule = () => {
    let token = `Bearer ${localStorage.getItem("token")}`;
    const [commentaire, setcommentaire] = useState("");
    const [assureur, setassureur] = useState("");
    const [agence, setagence] = useState("");
    const [primeht, setprimeht] = useState(0);
    const [taxes, settaxes] = useState(0);
    const [primettc, setprimettc] = useState("");
    const [contrat, setcontrat] = useState("");
    const [loading, setloading] = useState("");
    const [vehicule, setvehicule] = useState([]);
    const [selectedVehicule, setSelectedVehicule] = useState("");
    const [assurances, setassurances] = useState([]);
    const [agences, setagences] = useState([]);
    const [contrats, setcontrats] = useState([]);
    const [display_carte, setdisplay_carte] = useState('none')
    const [display_cartes, setdisplay_cartes] = useState(true)
    const [dm, setdm] = useState('none')
    const [rc, setrc] = useState('none')
    const [inc, setinc] = useState('none')
    const [vol, setvol] = useState('none')
    const [checkDM, setcheckDM] = useState(false)
    const [checkRC, setcheckRC] = useState(false)
    const [checkINC, setcheckINC] = useState(false)
    const [checkVOL, setcheckVOL] = useState(false)
    const [display_contrat, setdisplay_contrat] = useState('none')

    const [dmdate, setdmdate] = useState("");
    const [dmecheance, setdmecheance] = useState("");
    const [rcdate, rcecheance] = useState("");
    const [rcdate2, rcecheance2] = useState("");
    const [incdate, incecheance] = useState("");
    const [incdate2, incecheance2] = useState("");
    const [voldate, volecheance] = useState("");
    const [voldate2, volecheance2] = useState("");

    const [checked, setChecked] = React.useState(false);
    const [num_carte_verte, setnum_carte_verte] = useState("false");
    const [date_recep, setdate_recep] = useState("false");
    const url = `${process.env.REACT_APP_SERVICE_API}assurances`
    const siteSession = localStorage.getItem("siteSession");

    const Enregistrer = () => {
        //0897626743
        alert(
            selectedVehicule +  //vehecule
            " *A " + contrat + 
            " *B" + primeht + 
            " *C " + taxes + 
            " *D " + cal + 
            " *E " + num_carte_verte +
            " *F " + date_recep +  
            " *G " + agence  + 
            " *H " + commentaire + 
            " *I " + dmdate + 
            " *J " + dmecheance  + 
            " *K " + rcdate + 
            " *L " + rcdate2 + 
            " *M " + incdate + 
            " *N " + incdate2 + 
            " *O " + voldate + 
            " *P " + voldate2 + 
            " *Q " + assureur //Assureur 


        )
       /* axios.post(url, {
            'immat_assurance' : selectedVehicule ,
            'num_contrat' : contrat ,
            'prime_ht' : primeht ,
            'taxes' : taxes,
            'prime_ttc' : 2,
            'num_carte_verte' : num_carte_verte,
            'as_carte_verte' : checked,
            'date_cr_ass' : date_recep,
            'agence_ass' : agence,
            'commentaire_ass' : commentaire,
            'dat_effet' : dmdate,
            'echeance' : dmecheance
        }, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: token
            }
        }
        ).then((response) => {
            Swal.fire({
                icon: 'success',
                text: 'Success',
                confirmButtonText: 'OK'
            });

        }).catch((err) => {
            if (err.response.status === 403) {
                Swal.fire({
                    icon: 'error',
                    text: 'Le numero de bon  existe',
                    confirmButtonText: 'OK'
                });
            } else if (err.response.status === 501) {
                Swal.fire({
                    icon: 'error',
                    text: 'Erreur du serveur',
                    confirmButtonText: 'OK'
                });
            } else if (err.response.status === 422) {
                Swal.fire({
                    icon: 'error',
                    text: 'Veuillez remplire tous les champs !!!',
                    confirmButtonText: 'OK'
                });
            }else if (err.response.status === 404) {
                Swal.fire({
                    icon: 'error',
                    text: '404',
                    confirmButtonText: 'OK'
                });
            }else{
                alert(err)
            }

        });*/
    }

    const handleChangeChk = (event) => {
        setChecked(event.target.checked);
        if(checked == true){
            setdisplay_carte('none');
        }else{
            setdisplay_carte(display_carte === "none");
        }
    };

    const handleChangeDM = (event) => {
        setcheckDM(event.target.checked)
        if(checkDM == true){
            setdm('none');
        }else{
            setdm(dm === "none");
        }
    }

    const handleChangeRC = (event) => {
        setcheckRC(event.target.checked)
        if(checkRC == true){
            setrc('none');
        }else{
            setrc(rc === "none");
        }
    }

    const handleChangeINC = (event) => {
        setcheckINC(event.target.checked)
        if(checkINC == true){
            setinc('none');
        }else{
            setinc(rc === "none");
        }
    }
    const handleChangeVOL = (event) => {
        setcheckVOL(event.target.checked)
        if(checkVOL == true){
            setvol('none');
        }else{
            setvol(rc === "none");
        }
    }
    
    useEffect(() => {
                axios.get(`${process.env.REACT_APP_SERVICE_API}vehicule/${siteSession}`,
                    {
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: token
                        }
                    }
                ).then((response) => {
                    setvehicule(response.data.data);

                }).catch((error) => {

                })
    }, [])
    //assureur
    useEffect(() => {

        axios.get(`${process.env.REACT_APP_SERVICE_API}fseur`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setassurances(response.data.data);

        }).catch((error) => {

        })
    }, [])
    //agence
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}agence_assureur`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setagences(response.data.data);

        }).catch((error) => {

        })
    }, [])
    
    const handleChange = (e) => {
        setSelectedVehicule(e.value);
    }
    const autocompleteVehicule = () => {
        const options = vehicule.map((vh) => ({
            label: vh.immatriculation + " " + vh.marque,
            value: vh.id,
        }));
        return (
            <Select
                options={options}
                onChange={handleChange}
            />
        );
    };

    const handleChangeContrat = (event) => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}contrat/${event}`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setcontrats(response.data.data);
            setdisplay_contrat(display_contrat === 'none'? 'block' : 'none');
        }).catch((error) => {

        })
    }
    const cal = parseInt(primeht) + parseInt(taxes)
     
    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className="table-responsive">
                        <h3 className="text-center">AJOUTER UNE NOUVELLE ASSURANCE</h3>
                        <hr />
                        <div className="row">
                            <div className="col-md-6">
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label for="">Vehicule</label>
                                            {autocompleteVehicule()}
                                        </div>
                                        <div className="col-md-6">
                                            <label for="">Assuereur</label>
                                            <select onChange={(e) => setassureur(e.target.value)} className="form-control">
                                                <option>-- Choisir -- </option>
                                                {
                                                    assurances.map((ass) => {
                                                        return (
                                                            <option value={ass.id} key={ass.id}>{ass.nom}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label for="">Agence</label>
                                            <select onChange={(e) => {setagence(e.target.value); handleChangeContrat(e.target.value)}} className="form-control">
                                                <option>-- Choisir -- </option>
                                                {
                                                    agences.map((ass) => {
                                                        return (
                                                            <option value={ass.id} key={ass.id}>{ass.nom_assur}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label for="">Contrat</label>
                                            <select style={{display : display_contrat}} onChange={(e) => setcontrat(e.target.value)} className="form-control">
                                                <option>-- Choisir -- </option>
                                                {
                                                    contrats.map((ass) => {
                                                        return (
                                                            <option value={ass.id} key={ass.id}>{ass.nom_contr}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label for="">Prime HT</label>
                                            <input type="number" onChange={(e) => setprimeht(e.target.value)} className="form-control" />
                                        </div>
                                        <div className="col-md-6">
                                            <label for="">Taxes</label>
                                            <input type="number" onChange={(e) => settaxes(e.target.value)} className="form-control" />
                                        </div>
                                        <div className="col-md-6">
                                            <label for="">Prime TTC</label>
                                            <input type="number" value={cal}  onChange={(e) => setprimettc(e.target.value)} className="form-control" />
                                        </div>
                                        <div className="col-md-6">

                                        </div>
                                        <div className="col-md-12">
                                            <label for="">Carte verte</label>
                                            <Checkbox
                                                checked={checked}
                                                onChange={handleChangeChk}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                        </div>
                                        <div className="col-md-12">
                                            <label for="">Commentaire</label>
                                            <textarea name="" id="" onChange={(e) => setcommentaire(e.target.value)} cols="10" rows="3" className="form-control"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" onClick={Enregistrer} className="btn btn-primary">Enregister</button>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div style={{ display: display_carte }}>
                                    <div>
                                        <label>N° carte verte</label>
                                        <input type="text" className="form-control" onChange={(e) => setnum_carte_verte(e.target.value)} />
                                    </div>
                                    <div>
                                        <label>Date de reception</label>
                                        <input type="date" className="form-control" onChange={(e) => setdate_recep(e.target.value)} />
                                    </div>
                                </div>
                                <table
                                    id="example" className="table table-striped"
                                >
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Garanti</th>
                                            <th>Date effet</th>
                                            <th>Echeance(mois)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <Checkbox
                                                    checked={checkDM}
                                                    onChange={handleChangeDM}
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                />
                                            </td>
                                            <td>DM</td>
                                            <td ><input style={{ display: dm }}  onChange={(e) => setdmdate(e.target.value)} type="date" className="form-control" /></td>
                                            <td><input style={{ display: dm }}  onChange={(e) => setdmecheance(e.target.value)} type="date" className="form-control" /></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Checkbox
                                                    checked={checkRC}
                                                    onChange={handleChangeRC}
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                />
                                            </td>
                                            <td>RC</td>
                                            <td><input style={{ display: rc }} type="date" onChange={(e) => rcecheance(e.target.value)} className="form-control" /></td>
                                            <td><input style={{ display: rc }} type="date" onChange={(e) => rcecheance2(e.target.value)} className="form-control" /></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Checkbox
                                                    checked={checkINC}
                                                    onChange={handleChangeINC}
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                />
                                            </td>
                                            <td>INC</td>
                                            <td><input style={{ display: inc }} type="date" onChange={(e) => incecheance(e.target.value)} className="form-control" /></td>
                                            <td><input style={{ display: inc }} type="date" onChange={(e) => incecheance2(e.target.value)} className="form-control" /></td>
                                        </tr>
                                        <tr>
                                            <td>
                                            <Checkbox
                                                    checked={checkVOL}
                                                    onChange={handleChangeVOL}
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                />
                                            </td>
                                            <td>VOL</td>
                                            <td><input type="date" style={{ display: vol }} onChange={(e) => volecheance(e.target.value)} className="form-control" /></td>
                                            <td><input type="date" style={{ display: vol }} onChange={(e) => volecheance2(e.target.value)} className="form-control" /></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Assurer_vehicule;