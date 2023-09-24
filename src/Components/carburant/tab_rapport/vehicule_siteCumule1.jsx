import React, { useEffect, useState } from "react";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import axios from "axios";
import { Checkbox } from "@mui/material";
import dateFormat from "dateformat";

const Vehicule_siteCumule1 = ({ dataLineAMois }) => {
    const optionsSiteLineMois = {
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
                beginAtZero: true,
            },
        },
    };
    console.log(JSON.stringify(dataLineAMois))
    const dataSitesLineMois = {
        labels: Array.isArray(dataLineAMois) && dataLineAMois.length > 0 ? dataLineAMois.map((item) => {
            const moisAbbr = item.mois.substring(0, 3);
            const yearAbbr = item.ann.toString().slice(-2);
            const dateStr = `${moisAbbr} 01 ${yearAbbr}`;
            const date = new Date(dateStr);
            return date.toLocaleString('fr-FR', { month: 'short', year: '2-digit' });
        }).filter((label, index, self) => self.indexOf(label) === index) : [],
        datasets: Array.isArray(dataLineAMois) && dataLineAMois.length > 0 ? (() => {
            const immatriculationsSet = new Set();
            dataLineAMois.forEach((item) => {
                immatriculationsSet.add(item.immatriculation);
            });
            const immatriculations = Array.from(immatriculationsSet);

            return immatriculations.map((immatriculation) => {
                const filteredData = Array.isArray(dataLineAMois) ? dataLineAMois.filter((item) => item.immatriculation === immatriculation) : [];
                const tot_mois = filteredData.map((item) => item.nbre);

                return {
                    label: immatriculation,
                    data: tot_mois,
                    borderColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
                };
            });
        })() : []
    };
    return (
        <div>
            <Line data={dataSitesLineMois} options={optionsSiteLineMois} />
        </div>
    )
}

export default Vehicule_siteCumule1