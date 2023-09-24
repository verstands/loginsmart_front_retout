import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Deconnexion = () => {
    let navigation = useNavigate();
    const [loadingD, setloadingD] = useState(true);
    let token = `Bearer ${localStorage.getItem("token")}`;

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}logout`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            navigation('/')
            setloadingD(false)
            localStorage.removeItem("siteSession")
            localStorage.removeItem("token")
        }).catch((error) => {
            if (error.response.status === 500) {
                Swal.fire({
                    imageUrl: 'https://img.freepik.com/vecteurs-premium/icone-erreur-du-serveur-internet-concept-connexion-perdue-probleme-reseau-wifi-bouton-web-interface-utilisateur-blanc-neumorphic-ui-ux-neumorphisme-vecteur-eps-10_399089-2750.jpg?w=740',
                    imageWidth: 200,
                    imageHeight: 200,
                    text: 'Erreur de la connexion !!!',
                    confirmButtonText: 'OK'
                })
                setloadingD(false)
            }
        })
    }, [])

    return (
        <div>
            <center>
                {
                    loadingD === true && (
                        <div>
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <p><i className="fa fa-pulse fa-spinner text-primary" style={{ fontSize: 60 }} ></i></p>
                        </div>     
                    )
                }
            </center>
        </div>
    )
}
export default Deconnexion;