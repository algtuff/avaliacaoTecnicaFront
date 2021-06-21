class Login extends React.Component{
    render(){
        let usuario={
            email:'',
            password:''
        };
        
        let login = () =>{
            fetch('http://localhost:8080/avaliacaoTecnicaBack/login',{
                cache: "no-cache",
                credentials: "same-origin",
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuario)
            })
            .then((response) => {
                return response.json();
            })
            .then((json) =>{
                delete json.password;
                window.sessionStorage.setItem('usuario',JSON.stringify(json));
                window.location = '#/';
            })
            .catch((error) => {
                window.sessionStorage.removeItem('usuario');
                document.querySelector("#erro").innerHTML = 'Login ou senha invalido!'
                console.log(error);
            });
        };
    
        let validar = (item,tipo) =>{
            let valor = item.target.value;
             switch(tipo){
                 case 'email':{
                    usuario.email = valor;
                 }
                 case 'senha':{
                    usuario.password = valor;
                 }
            }
        }
        
        return (
            <div>
                <h1>{this.props.titulo}</h1>
                <span id='erro'></span>
                <br/>
                <input type='text' placeholder='Digite seu e-mail' onChange={(item)=>validar(item,'email')}/>
                <br/>
                <input type='password' placeholder='Digite sua senha' onChange={(item)=>validar(item,'senha')}/>
                <br/>
                <button onClick={login} >Login</button>
            </div>
        );
    }
};

class ListaProjetos extends React.Component{
    render(){
        if(!window.sessionStorage.getItem('usuario')){
            window.location = '#/login';
        }
        let usuario = JSON.parse(window.sessionStorage.getItem('usuario'));
        fetch('http://localhost:8080/avaliacaoTecnicaBack/projetos',{
            cache: "no-cache",
            credentials: "same-origin",
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: window.sessionStorage.getItem('usuario')
        }).then(response=>{
            return response.json();
        }).then(listaProjetos=>{
            document.querySelector('#tabelaProjeto').innerHTML = '';
            listaProjetos.map((proj)=>{
                let tr = document.createElement("tr");
                let td = document.createElement("td");
                td.appendChild(document.createTextNode(proj.nmProjeto))
                tr.appendChild(td);
                if(usuario.tipoUsuario.cdTipoUsuario !== 1){
                    let tdApontar = document.createElement("td");
                    let imgHoras = document.createElement("img");
                    imgHoras.src ='./icons/horas.png'
                    imgHoras.title = 'Apontar horas';
                    imgHoras.addEventListener('click',()=>{
                        sessionStorage.setItem('projeto',JSON.stringify(proj));
                        window.location = '#/apontarHoras';
                    });
                    tdApontar.appendChild(imgHoras);
                    tr.appendChild(tdApontar);
                }
                let tdProj = document.createElement("td");
                let imgProj = document.createElement("img");
                imgProj.src ='./icons/projeto.png'
                imgProj.title = 'Visualizar Projeto';
                imgProj.addEventListener('click',()=>{
                    sessionStorage.setItem('projeto',JSON.stringify(proj));
                    window.location = '#/visualizarProjeto';
                });
                tdProj.appendChild(imgProj);
                tr.appendChild(tdProj);
                document.querySelector('#tabelaProjeto').appendChild(tr);
            });
        });

        return (
            <div>
                <h1>Projetos</h1>
                <h3>{usuario.nome} - {usuario.tipoUsuario.dsTipo}</h3>
                <table id='tabelaProjeto'>
                </table>
            </div>
        )

    }
};
class ApontamentoHoras extends React.Component{
    render(){
        if(!window.sessionStorage.getItem('usuario')){
            window.location = '#/login';
        }
        let usuario = JSON.parse(window.sessionStorage.getItem('usuario'));
        let projeto = JSON.parse(window.sessionStorage.getItem('projeto'));
        let projetoUsuarioHoras = {};
        projetoUsuarioHoras.usuario = {};
        projetoUsuarioHoras.usuario.cdUsuario = usuario.cdUsuario;
        projetoUsuarioHoras.projeto = {};
        projetoUsuarioHoras.projeto.cdProjeto = projeto.cdProjeto;
        
        let cadastrarHoras = () =>{
            
            fetch('http://localhost:8080/avaliacaoTecnicaBack/apontarHoras',{
                cache: "no-cache",
                credentials: "same-origin",
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(projetoUsuarioHoras)
            }).then(response=>{
                return response.json();
            }).then(()=>{
                window.location = '#/';
            });
        };

        let validar = (item,tipo) =>{
            let valor = item.target.value;
             switch(tipo){
                 case 'data':{
                    projetoUsuarioHoras.data = valor;
                 }
                 case 'horas':{
                    projetoUsuarioHoras.horas = valor;
                 }
            }
        };
        
        return (
            <div>
                <h1>Apontar Horas</h1>
                <h2>{projeto.nmProjeto}</h2>
                <h3>{usuario.nome} - {usuario.tipoUsuario.dsTipo}</h3>
                <span id='erro'></span>
                <br/>
                <input type='date' placeholder='data' onChange={(item)=>validar(item,'data')}/>
                <br/>
                <input type='number' placeholder='horas trabalhadas' onChange={(item)=>validar(item,'horas')}/>
                <br/>
                <br/>
                <button onClick={cadastrarHoras} >Enviar</button>

            </div>
        )

    }
};

class VisualizarProjeto extends React.Component{
    render(){
        if(!window.sessionStorage.getItem('usuario')){
            window.location = '#/login';
        }
        let usuario = JSON.parse(window.sessionStorage.getItem('usuario'));
        let projeto = JSON.parse(window.sessionStorage.getItem('projeto'));
        let projetoUsuarioHoras = {};
        projetoUsuarioHoras.usuario = {};
        projetoUsuarioHoras.usuario.cdUsuario = usuario.cdUsuario;
        projetoUsuarioHoras.projeto = {};
        projetoUsuarioHoras.projeto.cdProjeto = projeto.cdProjeto;
        
        fetch('http://localhost:8080/avaliacaoTecnicaBack/projetoUsuarioHoras/usuario/'+usuario.cdUsuario+'/projeto/'+projeto.cdProjeto,{
            cache: "no-cache",
            credentials: "same-origin",
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response=>{
            return response.json();
        }).then((listaHoras)=>{
            document.querySelector('#tabelaHoras').innerHTML = '';
            listaHoras.map((horas)=>{
                let tr = document.createElement("tr");
                let tdUsuario = document.createElement("td");
                tdUsuario.appendChild(document.createTextNode(horas.usuario.nome))
                tr.appendChild(tdUsuario);
                
                let tdData = document.createElement("td");
                tdData.appendChild(document.createTextNode(horas.data));
                tr.appendChild(tdData);

                let tdHoras = document.createElement("td");
                tdHoras.appendChild(document.createTextNode(horas.horas));
                tr.appendChild(tdHoras);
                                
                document.querySelector('#tabelaHoras').appendChild(tr);
            });

       });
       
       if(usuario.tipoUsuario.cdTipoUsuario === 1){
            fetch('http://localhost:8080/avaliacaoTecnicaBack/totalDeHoras/projeto/'+projeto.cdProjeto,{
                cache: "no-cache",
                credentials: "same-origin",
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(response=>{
                return response.json();
            }).then((totalHoras)=>{
                document.querySelector('#totalHoras').innerHTML = (totalHoras.total)?totalHoras.total:0;
           });
       }
        
        return (
            <div>
                <h1>Projeto - {projeto.nmProjeto}</h1>
                <h3>Total de horas trabalhadas - <span id='totalHoras'>0</span></h3>
                <table id='tabelaHoras'>
                </table>
                <br/>
            </div>
        )

    }
};

const Link = ReactRouterDOM.Link;
const Route = ReactRouterDOM.Route;

const App = () => (
    <ReactRouterDOM.HashRouter>
        <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/">Projetos</Link></li>
        </ul>

        <Route path="/" exact component={ListaProjetos} />
        <Route path="/login" component={Login} />
        <Route path="/apontarHoras" component={ApontamentoHoras} />
        <Route path="/visualizarProjeto" component={VisualizarProjeto} />
    </ReactRouterDOM.HashRouter>
)

ReactDOM.render(
    <App/>,
    document.querySelector('#principal')
);