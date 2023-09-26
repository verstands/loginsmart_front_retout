import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

function LoginA() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  let navigation = useNavigate();
  const url = `${process.env.REACT_APP_SERVICE_API}login`;
  const [loading, setloading] = useState(false);

  const connecter = () => {
    if (Email !== "" && Password !== "") {
      setloading(true)
      axios.post(url,
        { email: Email, mot: Password }).then((response) => {
          let token = JSON.stringify(response.data.token);
          let tokenT = token.substring(1, token.length - 1);

          let site = JSON.stringify(response.data.sites);


          let data = JSON.stringify(response.data.data.id);
          let dataT = data.substring(1, data.length - 1);

          localStorage.setItem("token", tokenT)
          localStorage.setItem("site", site)
          localStorage.setItem("data", dataT)

          //console.log(localStorage.getItem("site")
          const sites = JSON.parse(localStorage.getItem("site"));
          if (sites.length) {
            const siteIds = sites.map(sit => sit.idSite).join(',');
            localStorage.setItem("siteSession", siteIds)
          }
          //alert(localStorage.getItem("siteSession"))
          navigation('/dashboad')
          setloading(false)
          window.location.reload();
        }).catch((error) => {
          if (error.response.status === 401) {
            Swal.fire({
              icon: 'error',
              text: 'Email ou mot de passe incorrect !!!',
              title: 'Attention !!!',
              confirmButtonText: 'OK'
            })
            setloading(false)
          } else if (error.response.status === 500) {
            Swal.fire({
              imageUrl: 'https://img.freepik.com/vecteurs-premium/icone-erreur-du-serveur-internet-concept-connexion-perdue-probleme-reseau-wifi-bouton-web-interface-utilisateur-blanc-neumorphic-ui-ux-neumorphisme-vecteur-eps-10_399089-2750.jpg?w=740',
              imageWidth: 200,
              imageHeight: 200,
              text: 'Erreur de la connexion !!!',
              confirmButtonText: 'OK'
            })
            setloading(false)
          } else if (error.response.status === 404) {
            Swal.fire({
              icon: 'info',
              title: 'Service non trouvée !!!',
              text: '',
            })
            setloading(false)
          } else {
            Swal.fire({
              icon: 'info',
              title: 'Service non trouvée !!!',
              text: 'Service non trouvée !!!',
            })
            setloading(false)
          }
        })
    } else {
      Swal.fire({
        icon: 'warning',
        text: 'Veuillez remplire tous les champs svp !!!',
        title: 'Attention !!!'
      })
      setloading(false)
    }
  }
  return (
    <>
      <div
        class="
          auth-wrapper
          d-flex
          no-block
          justify-content-center
          align-items-center
          bg-dark
        "
      >
        <div class="auth-box bg-dark border-top border-secondary">
          <div id="loginform">
            <div class="text-center pt-3 pb-3">
              <span class="db"
              ><img src="../assets/images/logo.png" alt="logo"
                /></span>
            </div>
            <div class="row pb-4">
              <div class="col-12">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span
                      class="input-group-text bg-success text-white h-100"
                      id="basic-addon1"
                    ><i class="mdi mdi-account fs-4"></i
                    ></span>
                  </div>
                  <input
                    type="text"
                    class="form-control form-control-lg"
                    placeholder="Email"
                    aria-label="Email"
                    aria-describedby="basic-addon1"
                    onChange={(e) => { setEmail(e.target.value) }}
                  />
                </div>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span
                      class="input-group-text bg-warning text-white h-100"
                      id="basic-addon2"
                    ><i class="mdi mdi-lock fs-4"></i
                    ></span>
                  </div>
                  <input
                    type="password"
                    class="form-control form-control-lg"
                    placeholder="Password"
                    aria-label="Password"
                    aria-describedby="basic-addon1"
                    onChange={(e) => { setPassword(e.target.value) }}
                  />
                </div>
              </div>
            </div>
            <center>
            </center>
            <div class="row border-top border-secondary">
              <div class="col-12">
                <div class="form-group">
                  <div class="pt-3">
                    <button
                      class="btn btn-info"
                      id="to-recover"
                      type="button"
                    >
                      <i class="mdi mdi-lock fs-4 me-1"></i> Lost password?
                    </button>

                    <button
                      class="btn btn-success float-end text-white"
                      onClick={connecter}
                    >
                      { loading && (<i className="fa fa-spinner fa-pulse"></i>) }&nbsp;
                      Se connecter
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="recoverform">
          </div>
        </div>
      </div>
    </>
  );
}
export default LoginA;