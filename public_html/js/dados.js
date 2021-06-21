/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


let listaTipoUsuario = [
    {"cdTipoUsuario":1,"dsTipo":"Administrador"},
    {"cdTipoUsuario":2,"dsTipo":"Programador 1"},
    {"cdTipoUsuario":3,"dsTipo":"Programador 2"}
];
let listaUsuario = [
    {"cdUsuario":1,"email":"andre@gmail.com","nome":"Andre Lucas Silva","password":"1234","tipoUsuario":{"cdTipoUsuario":1,"dsTipo":"Administrador"}},
    {"cdUsuario":2,"email":"joao@gmail.com","nome":"Joao Oliveira Neto","password":"1234","tipoUsuario":{"cdTipoUsuario":2,"dsTipo":"Programador 1"}},
    {"cdUsuario":3,"email":"ricardo@gmail.com","nome":"Ricardo Luiz Gonsalvez","password":"1234","tipoUsuario":{"cdTipoUsuario":3,"dsTipo":"Programador 2"}}
];
let listaProjeto = [
    {"cdProjeto":1,"nmProjeto":"Sistema de Colaboradores","usuario":{"cdUsuario":1,"email":"algtuff@gmail.com","nome":"Andre Luiz Goulart","password":"1234","tipoUsuario":{"cdTipoUsuario":1,"dsTipo":"Administrador"}}},
    {"cdProjeto":2,"nmProjeto":"Gestor de Equipamentos","usuario":{"cdUsuario":2,"email":"joao@gmail.com","nome":"Joao Oliveira Neto","password":"1234","tipoUsuario":{"cdTipoUsuario":2,"dsTipo":"Programador 1"}}},
    {"cdProjeto":3,"nmProjeto":"Gestor Fiscal","usuario":{"cdUsuario":3,"email":"ricardo@gmail.com","nome":"Ricardo Luiz Gonsalvez","password":"1234","tipoUsuario":{"cdTipoUsuario":3,"dsTipo":"Programador 2"}}}
];

let listaProjetoUsuarioHoras = [
    {"cdProjetoUsuarioHoras":3,"horas":2.0,"data":"2021-06-21","usuario":{"cdUsuario":2,"email":"joao@gmail.com","nome":"Joao Oliveira Neto","password":"1234","tipoUsuario":{"cdTipoUsuario":2,"dsTipo":"Programador 1"}},"projeto":{"cdProjeto":2,"nmProjeto":"Gestor de Equipamentos","usuario":{"cdUsuario":2,"email":"joao@gmail.com","nome":"Joao Oliveira Neto","password":"1234","tipoUsuario":{"cdTipoUsuario":2,"dsTipo":"Programador 1"}}}},
    {"cdProjetoUsuarioHoras":4,"horas":1.0,"data":"2021-06-28","usuario":{"cdUsuario":2,"email":"joao@gmail.com","nome":"Joao Oliveira Neto","password":"1234","tipoUsuario":{"cdTipoUsuario":2,"dsTipo":"Programador 1"}},"projeto":{"cdProjeto":2,"nmProjeto":"Gestor de Equipamentos","usuario":{"cdUsuario":2,"email":"joao@gmail.com","nome":"Joao Oliveira Neto","password":"1234","tipoUsuario":{"cdTipoUsuario":2,"dsTipo":"Programador 1"}}}},
    {"cdProjetoUsuarioHoras":5,"horas":5.0,"data":"2021-06-13","usuario":{"cdUsuario":2,"email":"joao@gmail.com","nome":"Joao Oliveira Neto","password":"1234","tipoUsuario":{"cdTipoUsuario":2,"dsTipo":"Programador 1"}},"projeto":{"cdProjeto":2,"nmProjeto":"Gestor de Equipamentos","usuario":{"cdUsuario":2,"email":"joao@gmail.com","nome":"Joao Oliveira Neto","password":"1234","tipoUsuario":{"cdTipoUsuario":2,"dsTipo":"Programador 1"}}}},
    {"cdProjetoUsuarioHoras":6,"horas":0.5,"data":"2021-06-02","usuario":{"cdUsuario":3,"email":"ricardo@gmail.com","nome":"Ricardo Luiz Gonsalvez","password":"1234","tipoUsuario":{"cdTipoUsuario":3,"dsTipo":"Programador 2"}},"projeto":{"cdProjeto":2,"nmProjeto":"Gestor de Equipamentos","usuario":{"cdUsuario":2,"email":"joao@gmail.com","nome":"Joao Oliveira Neto","password":"1234","tipoUsuario":{"cdTipoUsuario":2,"dsTipo":"Programador 1"}}}}
];

listaTipoUsuario.map((tipoUsuario)=>{
    fetch('http://localhost:8080/avaliacaoTecnicaBack/tipoUsuario',{
        cache: "no-cache",
        credentials: "same-origin",
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tipoUsuario)
    })
});

listaUsuario.map((usuario)=>{
    fetch('http://localhost:8080/avaliacaoTecnicaBack/usuario',{
        cache: "no-cache",
        credentials: "same-origin",
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    })
});

listaProjeto.map((projeto)=>{
    fetch('http://localhost:8080/avaliacaoTecnicaBack/projeto',{
        cache: "no-cache",
        credentials: "same-origin",
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(projeto)
    })
});

listaProjetoUsuarioHoras.map((projetoUsuarioHoras)=>{
    fetch('http://localhost:8080/avaliacaoTecnicaBack/apontarHoras',{
        cache: "no-cache",
        credentials: "same-origin",
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(projetoUsuarioHoras)
    })
});