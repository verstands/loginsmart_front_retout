import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Select from "react-select";


const Intervention = () => {
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
    const [desc, setdesc] = useState("NuLL");
    const [cout, setcout] = useState("");
    const [inputList, setInputList] = useState([{ typeReparation: '', montant: '', description: '' }]);
    const [selectedVehicule, setSelectedVehicule] = useState("");
    const [selectedVehicules, setSelectedVehicules] = useState("");
    const [villesite, setvillesite] = useState([]);
    const siteSession = localStorage.getItem("siteSession");


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
    const url = `${process.env.REACT_APP_SERVICE_API}reparation`;
    const Enregistrer = () => {
        setLoading(true);
        inputList.forEach((dsav, index) => {
            axios.post(url, {
                immatriculation: selectedVehicule,
                kilometrage: kilo,
                kilometrage2: kilo,
                daterep: debut,
                dtsorti: debut,
                date_prevu: debut,
                cout: cout,
                id_fseur: selectedVehicules,
                comment: desc,
                code_rep: 1,
                id_controle: 1,
                id_inspection: 1,
                num_type: dsav.typeReparation,
                intitule: dsav.description,
                montant: dsav.montant,
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
                setLoading(false);

            }).catch((error) => {
                if (error.response && error.response.status === 422) {
                    Swal.fire({
                        icon: 'error',
                        text: `Tous les champs sont obligatoire !`,
                    });
                    setLoading(false);
                } else if (error.response.status === 500) {
                    Swal.fire({
                        icon: 'error',
                        text: 'Erreur de la connexion !!!',
                        confirmButtonText: 'OK'
                    })
                    setLoading(false);
                } else {
                    Swal.fire({
                        icon: 'error',
                        text: `${error.response.data.message}`,
                        confirmButtonText: 'OK'
                    })
                    setLoading(false);
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
    return (
        <>
            <div className="card">
                <div className="card-body">
                    <h5 className="text-center">ETABLIR UN BON D'INTERVENTION </h5>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-md-6">
                                <label for="">Immatriculation</label>
                                {autocompleteVehicule()}
                            </div>
                            <div className="col-md-6">
                                <label for="">Date</label>
                                <input type="date" onChange={(e) => setdebut(e.target.value)} className="form-control" />
                            </div>
                            <div className="col-md-6">
                                <label for="">Kilometrage</label>
                                <input type="number" onChange={(e) => setkilo(e.target.value)} className="form-control" />
                            </div>
                            <div className="col-md-6">
                                <label for="">Cout(devise)</label>
                                <input type="number" onChange={(e) => setcout(e.target.value)} className="form-control" />
                            </div>

                            <div className="col-md-12">
                                <label for="">Fournisseur</label>
                                {autocompleteVehicules()}
                            </div>
                            <br />
                            {
                                inputList.map((x, i) => {
                                    return (
                                        <>
                                            <div className="col-md-4 typR"><br />
                                                <label for="" className="titre1">Type de reparation</label>
                                                <select name="typeReparation" value={x.typeReparation} className="form-control" onChange={e => handleInputChange(e, i)}>
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
                                                <label for="" className="titre2">Montant</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="0.00"
                                                    name="montant"
                                                    value={x.montant}
                                                    onChange={e => handleInputChange(e, i)} />
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
                            {
                                loading === true && (
                                    <p><i style={{fontSize : '35px'}} className="fa fa-spinner fa-pulse text-primary" ></i></p>
                                )
                            }
                            <button type="submit" onClick={Enregistrer} className="btn btn-primary"> Enregister</button>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}

export default Intervention
