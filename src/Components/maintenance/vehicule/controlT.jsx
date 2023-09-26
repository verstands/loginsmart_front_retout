import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Select from "react-select";


const ControlT = () => {
    let token = `Bearer ${localStorage.getItem("token")}`;
    const [intervention, setintervention] = useState([]);
    const [vehicule, setvehicule] = useState([]);
    const [reparation, setreparation] = useState([]);
    const [loading, setLoading] = useState(false);
    const [immatriculations, setimmatriculations] = useState("");
    const [debut, setdebut] = useState("");
    const [kilo, setkilo] = useState("");
    const [fournisseur, setfournisseur] = useState("");
    const [typerep, settyperep] = useState("");
    const [desc, setdesc] = useState('NULL');
    const [cout, setcout] = useState("");
    const [inputList, setInputList] = useState([{ typeReparation: '', montant: '', description: '' }]);
    const [selectedVehicule, setSelectedVehicule] = useState("");
    const [selectedVehicules, setSelectedVehicules] = useState("");
    const [villesite, setvillesite] = useState([]);
    const siteSession = localStorage.getItem("siteSession");
    const [chf, setchf] = useState([])
    const [agent, setagent] = useState('')
    const [resultat, setresultat] = useState('')
    const [validite, setvalidite] = useState('')
    const [coutht, setcoutht] = useState('')
    const [impot, setimpot] = useState('')
    const [ref, setref] = useState('')
    const [tot, settot] = useState('')

    const calculeTTC = () => {
        return parseInt(coutht) + parseInt(impot);
    }

    //multiple  input
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };

    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    const handleAddClick = () => {
        setInputList([...inputList, { typeReparation: '', montant: '', description: '' }]);
    };



    let n = 1;
    const url = `${process.env.REACT_APP_SERVICE_API}check_auto`;
    const Enregistrer = () => {
        setLoading(true) 
        inputList.forEach((dsav, index) => {
            axios.post(url, {
                ref_centre  : ref,
                nom_centre  : selectedVehicules,
                date_check  : debut,
                immat_check  : selectedVehicule,
                date_cr: new Date().toLocaleDateString(),
                resultat_check  : resultat,
                km_check  : kilo,
                chauff_check  : chf,
                delai_check  : validite,
                agent_check  : agent,
                cout_ht  : coutht,
                taxes_check  : impot,
                ttc_check  : calculeTTC(),
                comment_check  : desc,
                id_check : 'required',
                lib_check : dsav.montant,
                categorie_check : dsav.typeReparation,
                date_detail_check : dsav.description,

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
                setLoading(false)

            }).catch((error) => {
                if (error.response && error.response.status === 422) {
                    Swal.fire({
                        icon: 'error',
                        text: `Tous les champs sont obligatoire !`,
                    });
                    setLoading(false)
                } else if (error.response.status === 500) {
                    Swal.fire({
                        icon: 'error',
                        text: 'Erreur de la connexion !!!',
                        confirmButtonText: 'OK'
                    })
                    setLoading(false)
                } else {
                    Swal.fire({
                        icon: 'error',
                        text: `${error.response.data.message}`,
                        confirmButtonText: 'OK'
                    })
                    setLoading(false)
                }
            });
          
            
          });
        
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

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}chauffeur/${siteSession}`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setchf(response.data.data);
        }).catch((error) => {

        })
    }, [])

    //ville
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}fseur_prod/${siteSession}`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setvillesite(response.data.data);
        }).catch((error) => {

        })

    }, [])
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}type_reparation`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setreparation(response.data.data);
            setLoading(false);
        }).catch((error) => {
            alert("type_reparation" + error)
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

    const handleChanges = (e) => {
        setSelectedVehicules(e.value);
    }
    const autocompleteVehicules = () => {
        const options = villesite.map((vh) => ({
            label: vh.nom,
            value: vh.id,
        }));
        return (
            <Select
                options={options}
                onChange={handleChanges}
            />
        );
    };

    const handleChangeCh = (e) => {
        setSelectedVehicule(e.value);
     
    }
    const autocompleteVehiculeCh = () => {
        const options = chf.map((vh) => ({
            label: vh.nom + " " + vh.prenom,
            value: vh.id,
        }));
        return (
            <Select
                options={options}
                onChange={handleChangeCh}
            />
        );
    };

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <h5 className="text-center">ENREGISTRER UN CONTROLE TECHNIQUE </h5>
                    <hr />
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-md-4">
                                <label for="">Immatriculation</label>
                                {autocompleteVehicule()}
                            </div>
                            <div className="col-md-4">
                                <label for="">Date</label>
                                <input type="date" onChange={(e) => setdebut(e.target.value)} className="form-control" />
                            </div>
                            <div className="col-md-4">
                                <label for="">Kilometrage</label>
                                <input type="number" onChange={(e) => setkilo(e.target.value)} className="form-control" />
                            </div>
                            <div className="col-md-4">
                                <label for="">Ref. Controle Tech</label>
                                <input type="text" onChange={(e) => setref(e.target.value)} className="form-control" />
                            </div>
                            <div className="col-md-4">
                                <label for="">Agent</label>
                                <input type="text" onChange={(e) => setagent(e.target.value)} className="form-control" />
                            </div>
                            <div className="col-md-4">
                                <label for="">Resultat</label>
                                <input type="text" onChange={(e) => setresultat(e.target.value)} className="form-control" />
                            </div>
                            <div className="col-md-4">
                                <label for="">Validité</label>
                                <input type="date" onChange={(e) => setvalidite(e.target.value)} className="form-control" />
                            </div>
                            <div className="col-md-4">
                                <label for="">Cout Ht</label>
                                <input type="number" onChange={(e) => {setcoutht(e.target.value)}} className="form-control" />
                            </div>
                            <div className="col-md-4">
                                <label for="">Taxes</label>
                                <input type="number" onChange={(e) => {setimpot(e.target.value)}} className="form-control" />
                            </div>
                            <div className="col-md-4">
                                <label for="">Cout TTC</label>
                                <input type="number" value={calculeTTC()} className="form-control" />
                            </div>
                            <div className="col-md-4">
                                <label for="">Fournisseur</label>
                                {autocompleteVehicules()}
                            </div>
                            <div className="col-md-4">
                                <label for="">Chauffeur</label>
                                {autocompleteVehiculeCh()}
                            </div>
                            
                            <br />
                            {
                                inputList.map((x, i) => {
                                    return (
                                        <>
                                            <div className="col-md-4 typR"><br />
                                                <label for="" className="titre1">Type de reparation</label>
                                                <select  name="typeReparation" value={x.typeReparation} className="form-control" onChange={e => handleInputChange(e, i)}>
                                                    {
                                                        reparation.map((e) => {
                                                            return (
                                                                <option key={e.id} value={e.id}>{e.type_rep}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div className="col-md-4 mont"><br />
                                                <label for="" className="titre2">Autre visite</label>
                                                <select  name="montant" value={x.montant} className="form-control" onChange={e => handleInputChange(e, i)}>
                                                    <option value="s">--Choisir--</option>
                                                    <option value="1" key='1'>Oui</option>
                                                    <option value="2" key="2">Non</option>
                                                </select>
                                            </div>
                                            <div className="col-md-4 descr"><br />
                                                <label for="" className="titre3">Description</label>
                                                <textarea
                                                    name="description"
                                                    onChange={e => handleInputChange(e, i)}
                                                    cols="10"
                                                    rows="3"
                                                    value={x.description}
                                                    className="form-control">
                                                </textarea>
                                                {inputList.length - 1 === i && (
                                                    <button className="ml10" onClick={handleAddClick}>
                                                        +
                                                    </button>
                                                )}
                                            </div>
                                            <br />
                                        </>
                                    )

                                })
                            }

                            <div className="col-md-12">
                                <label for="">Commentaire</label>
                                <textarea name="" id="" onChange={(e) => setdesc(e.target.value)} cols="10" rows="3" className="form-control"></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" onClick={Enregistrer} className="btn btn-primary">{ loading && (<i className="fa fa-spinner fa-pulse"></i>) } Enregister</button>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}

export default ControlT
