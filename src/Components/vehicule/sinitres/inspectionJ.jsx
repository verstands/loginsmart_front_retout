import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Select from "react-select";

const Inspection_journaliere = () => {
    //les variable d'insertion
    const [date, setdate] = useState("");
    const [commentaire, setcommentaire] = useState("");
    const [nomAgent, setNomagent] = useState("");
    const [t, sett] = useState([]);
    //les variable de la page
    const [selectedVehicule, setSelectedVehicule] = useState("");
    const [vehicule, setvehicule] = useState([]);
    const [pieces, setpieces] = useState([]);
    const [idpieces, setidpieces] = useState([]);
    const [type_degat, settype_degat] = useState([]);
    let token = `Bearer ${localStorage.getItem("token")}`;
    const [inputList, setInputList] = useState([{ categorie: '4', piece: '', type: '', observation: '', count: '', coutEffectif: '' }]);
    const [act, setact] = useState('block');
    const [val, setval] = useState([])

    const [FilteredPieces, setFilteredPieces] = useState([])
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };
    const handleCategorie = (event) => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}pieceCat/${event}`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setpieces(response.data.data);
        }).catch((error) => {
            alert(error)
        })
    }
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    const handleAddClick = () => {
        setInputList([...inputList, { categorie: '', piece: '', type: '', observation: '', count: '', coutEffectif: '' }]);
        setact(act === "block" ? "block" : act === "none")
    };



    const handleCategorieChange = (e, index) => {
        const { value } = e.target;
        const list = [...inputList];
        list[index].categorie = value;
        setInputList(list);  
    };

    const handlePieceChange = (e, index) => {
        const { value } = e.target;
        const list = [...inputList];
        list[index].piece = value;
        setInputList(list);
    };
      
    const handleTypeChange = (e, index) => {
        const { value } = e.target;
        const list = [...inputList];
        list[index].type = value;
        setInputList(list);
    };

    const handleObservation = (e, index) => {
        const { value } = e.target;
        const list = [...inputList];
        list[index].observation = value;
        setInputList(list);
    };

    const handleCout = (e, index) => {
        const { value } = e.target;
        const list = [...inputList];
        list[index].count = value;
        setInputList(list);
    };

    const handleCoutEffet = (e, index) => {
        const { value } = e.target;
        const list = [...inputList];
        list[index].coutEffectif = value;
        setInputList(list);
    };



    const categoriesSelectionnees = inputList.map((item) => item.categorie);
    const pieceSelectionnees = inputList.map((item) => item.piece);
    const typeSelectionnees = inputList.map((item) => item.type);
    const observationSelectionnees = inputList.map((item) => item.observation);
    const coutSelectionnees = inputList.map((item) => item.count);
    const coutEffetSelectionnees = inputList.map((item) => item.coutEffectif);
    

    const Enregistrer = () => {
            Swal.fire({
                icon: 'success',
                text: 'Success',
                confirmButtonText: 'OK'
            });


        /*axios.post(url, {
            id_tiers: pieceSelectionnees,
            id_materiel: dates,
            remarque: Qte,
            categorie: categoriesSelectionnees,
            cout: coutSelectionnees,
            cout_eff: coutEffetSelectionnees,
            type: typeSelectionnees,
            code: selectedVehicule,
            id_ij: chauffeurs
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
            } else if (err.response.status === 500) {
                Swal.fire({
                    imageUrl: 'https://img.freepik.com/vecteurs-premium/icone-erreur-du-serveur-internet-concept-connexion-perdue-probleme-reseau-wifi-bouton-web-interface-utilisateur-blanc-neumorphic-ui-ux-neumorphisme-vecteur-eps-10_399089-2750.jpg?w=740',
                    imageWidth: 200,
                    imageHeight: 200,
                    text: 'Erreur de la connexion !!!',
                    confirmButtonText: 'OK'
                  })
            } else if (err.response.status === 422) {
                Swal.fire({
                    icon: 'error',
                    text: 'Veuillez remplire tous les champs !!!',
                    confirmButtonText: 'OK'
                });
            }

        });*/
    }

    useEffect(() => {
        const sites = JSON.parse(localStorage.getItem("site"))
        if (sites != "") {
            sites.map((veh) => {
                axios.get(`${process.env.REACT_APP_SERVICE_API}vehicule/${veh.idSite}`,
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
            })
        }
    }, [])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}categorie_piece`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setidpieces(response.data.data);
        }).catch((error) => {

        })
    }, [])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}type_degat`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            settype_degat(response.data.data);
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
    return (
        <>
            <div class="card">
                <div class="card-body">
                    <h3 className="text-center">AJOUTER UN RAPPORT D'INSPECTION JOURNALIERE</h3>
                    <hr />
                    <div class="row">
                        <div className="col-md-6">
                            <label>Date</label>
                            <input type="date" onChange={(e) => setdate(e.target.value)} className="form-control" />
                        </div>
                        <div className="col-md-6">
                        </div>
                        <div className="col-md-6">
                            <label>Vehicule</label>
                            {autocompleteVehicule()}
                        </div>
                        <div className="col-md-6">
                        </div>
                        <div className="col-md-6">
                            <label>Nom de l'agent</label>
                            <input type="Ddate" className="form-control" onChange={(e) => setNomagent(e.target.value)} />
                        </div>
                        <div className="col-md-6">
                        </div>
                        <div className="col-md-12">
                            <div className="rows">
                                {
                                    inputList.map((x, i) => {
                                        return (
                                            <div className="row" key={i}>
                                                <div className="col-md-2">
                                                    <label>Catégorie</label>

                                                    <select value={x.categorie} className="form-control" onChange={e => { handleCategorieChange(e, i); handleCategorie(e.target.value) }}>
                                                        <option>--Choisir--</option>
                                                        {
                                                            idpieces.map((dr) => {
                                                                return (
                                                                    <option value={dr.id} key={dr.id}>{dr.titre}</option>

                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                                <div className="col-md-2">
                                                    <label>Pièce</label>
                                                    <select value={x.piece} className="form-control" onChange={e => handlePieceChange(e, i)}>
                                                        <option>--Choisir--</option>
                                                        {
                                                            pieces.map((er) => {
                                                                return (
                                                                    <option value={er.id} key={er.id}>{er.nom}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                                <div className="col-md-2">
                                                    <label>Type</label>
                                                    <select value={x.type} className="form-control" onChange={e => handleTypeChange(e, i)}>
                                                        <option>--Choisir--</option>
                                                        {
                                                            type_degat.map((tp) => {
                                                                return (
                                                                    <option value={tp.id} key={tp.id}>{tp.type}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                                <div className="col-md-2">
                                                    <label>Obeservation</label>
                                                    <input value={x.observation} type="text" className="form-control" onChange={e => handleObservation(e, i)} />
                                                </div>
                                                <div className="col-md-2">
                                                    <label>Cout</label>
                                                    <input value={x.count} type="text" placeholder="0.00" className="form-control" onChange={e => handleCout(e, i)} />
                                                </div>
                                                <div className="col-md-2">
                                                    <label>Cout d'Effectif</label>
                                                    <input value={x.coutEffectif} type="text" placeholder="0.00" className="form-control" onChange={e => handleCoutEffet(e, i)} />
                                                </div>

                                                {inputList.length - 1 === i && (
                                                    <button style={{ display: act }} className="col-md-1" onClick={handleAddClick}>
                                                        +
                                                    </button>
                                                )}

                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="col-md-6">
                                <label>Commentaire</label>
                                <textarea onChange={(e) => setcommentaire(e.target.value)} className="form-control"></textarea>
                            </div>
                            <div className="col-md-6">
                            </div>
                            <button onClick={Enregistrer} className="btn btn-primary">Valider</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Inspection_journaliere