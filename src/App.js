
import './App.css';
import { FiSearch } from 'react-icons/fi';
import { AiOutlinePlus } from 'react-icons/ai';
import { TbTrashX } from 'react-icons/tb';
import { IoSaveSharp } from 'react-icons/io5';
import { AiFillEdit } from 'react-icons/ai';
import { BiX } from 'react-icons/bi';
import { BiArrowBack } from 'react-icons/bi';
import { useEffect, useRef, useState } from 'react';
function UseData() {
  const [pokemon, setPokemon] = useState([])

  
  console.log(pokemon);
  return pokemon;
}

function App() {
  const datospoke = UseData();
  const [idM, setIdM] = useState();
  const [name, setName] = useState();
  const [image, setImage] = useState();
  const [attack, setAttack] = useState();
  const [defense, setDefense] = useState();
  const [openAc,setOpenAc]= useState();
  const [open, setOpen] = useState(false);
  const [pokemones, setPokemones]=useState([]);
  const nameRef = useRef(null)
  const imageRef = useRef(null)
  const attackRef = useRef(null)
  const defenseRef = useRef(null)
  const idRef = useRef(null)
  const nameNRef = useRef(null)
  const imageNRef = useRef(null)
  const attackNRef = useRef(null)
  const defenseNRef = useRef(null)
  const idNRef = useRef(null)
  useEffect(() => {
    fetch("https://bp-pokemons.herokuapp.com/?idAuthor=1")
      .then(response => response.json())
      .then(datos => {
        setPokemones(datos)
      })
  }, [])
  console.log(pokemones);

  const btnSave = () => {
    var data ={name: nameNRef.current.value,
      image: imageNRef.current.value, attack: attackNRef.current.value,defense: defenseNRef.current.value,hp:31,type:"Fire",idAuthor: 1}
      console.log(data);
        fetch("https://bp-pokemons.herokuapp.com/?idAuthor=1", {
          method: 'POST', // or 'PUT'
          body: JSON.stringify(data), // data can be `string` or {object}!
          headers:{
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {setOpen(false)
          fetch("https://bp-pokemons.herokuapp.com/?idAuthor=1")
          .then(response => response.json())
          .then(datos => {
            setPokemones(datos)
            console.log("funciona ingresar el dato nuevo");
          })});
        
  };

  const btnCancel = () => {
    console.log("funciona cancel de nuevo pokemon");
    setOpen(false);
  };
  const btnNew = () => {
    console.log("funciona btnNew");
    setOpen(true);
    setOpen(true);
    console.log(open);
  };
  const busqueda = () => {
    const tosearch = document.getElementById("buscar").value;
    if (tosearch >= 2000) {
      
      fetch("https://bp-pokemons.herokuapp.com/" + tosearch)
        .then(response => response.json()).catch(error => window.alert('Error no se encuentra:', error))
        .then(datos => {
          if(datos==null){
           alert('Error no se encuentra:')
          }else{
            console.log("Funciona correcto buscar por id")
          setPokemones([datos])
          setPokemones([datos])}
        })
    } else {
      
      fetch("https://bp-pokemons.herokuapp.com/"+tosearch+"?idAuthor=1")
      .then(response => response.json()).catch(error => alert('Error no se encuentra:', error))
      .then(datos => {
        if(datos==null || datos.lengh==0){
          alert('Error no se encuentra:')
         }else{
          console.log("Funciona correcto buscar por n registros")
        setPokemones(datos)
        setPokemones(datos)}
      })
    }
    console.log(pokemones);
    
  };
  
  const EnviarCampo = (Id,Name,Image,Attack,Defense) => {
    
    setAttack(Attack);
    setAttack(Attack);
    setDefense(Defense);
    setDefense(Defense);
    setOpenAc(true);
    setOpenAc(true);
    setIdM(Id);
    setIdM(Id);
    
    nameRef.current.value= Name;
    imageRef.current.value= Image;
    this.refs.nombre.value="";
   console.log(this.refs.nombre.value);
   document.getElementById("imageM").value="";
    console.log("Los datos de ataque "+attack+", defensa: "+defense+", nombre: "+Name+", imagen: "+Image+" se guardan exitosamente");
  };
  const btnCancelMod = () => {
    setOpenAc(false);
    setOpenAc(false);
  }

  const btnEliminar = (id, name) => {
    const result = window.confirm("Esta seguro de eliminar a "+name);
    console.log("El usuario respondio: "+result);
    if(result){
    fetch("https://bp-pokemons.herokuapp.com/"+id, {
      method: 'DELETE', // or 'PUT'
    })
    .then(response => response.json())
    .then(response => {
      console.log("Se procedio exitosamente a eliminar id: "+id)
      fetch("https://bp-pokemons.herokuapp.com/?idAuthor=1")
      .then(response => response.json())
      .then(datos => {
        setPokemones(datos)
      })});}
  }
  
  const regresar = () => {
    fetch("https://bp-pokemons.herokuapp.com/?idAuthor=1")
    .then(response => response.json())
    .then(datos => {
      setPokemones(datos)
    })
  }
const btnModificar = () => {
  
  var data ={id:idM ,name: nameRef.current.value,
image: imageRef.current.value, attack: attackRef.current.value,defense: defenseRef.current.value,hp:31,type:"Fire",idAuthor: 1}
console.log(data);
  fetch("https://bp-pokemons.herokuapp.com/"+idRef.current.value, {
    method: 'PUT', // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(response => {setOpenAc(false)
    fetch("https://bp-pokemons.herokuapp.com/?idAuthor=1")
    .then(response => response.json())
    .then(datos => {
      console.log("Los datos se modificaron");
      setPokemones(datos)
    })});
  

}
  return (
    <div>
      <header>
        <div style={{ marginLeft: '5%' }}>
          <p>Listado de pokemon</p>
          <div className="flexsearch--wrapper">

            <div className="flexsearch--form" name="SearchPokemon" >
              <button className="flexsearch--submit" onClick={busqueda}>
                <FiSearch />
              </button>
              <button className="flexsearch--submitBack" onClick={regresar}>
                <BiArrowBack/>
              </button>
              <div className="flexsearch--input-wrapper">
                <input id="buscar" name="buscar" className="flexsearch--input" type="text" placeholder="Buscar" />
              </div>
            </div>
            
          </div>
          <button id="btnNew_modal" onClick={btnNew} className="buttonnew"><AiOutlinePlus /> Nuevo</button>
        </div>

      </header>

      <div style={{ alignItems: 'center', marginTop: '40px', marginLeft: '5%' }}>
        <table>
          <thead>
            <tr>
              <th className="Tablepokemon--column">Nombre</th>
              <th className="Tablepokemon--column">Imagen</th>
              <th className="Tablepokemon--column">Ataque</th>
              <th className="Tablepokemon--column">Defensa</th>
              <th className="Tablepokemon--column">Acciones</th>
            </tr>
          </thead>
          <tbody>

            {pokemones.map(item => (

              <tr key={item.id}>
                <td>{item.name}</td>
                <td><img src={item.image} alt={item.nombre} width="50px" height="50px" /></td>
                <td>{item.attack}</td>
                <td>{item.defense}</td>
                <td><button onClick={()=>EnviarCampo(item.id,item.name,item.image,item.attack,item.defense)} className="buttonactions"><AiFillEdit /></button><button onClick={()=>btnEliminar(item.id, item.name)} className="buttonactions"><TbTrashX /></button></td>
              </tr>

            ))}

          </tbody>

        </table>
      </div>

     
      <div >
        <div className={open ? "open" : "notOpen"}>
          <div className="FormNewPokemon modal" id="FormNewPokemonmodal">

            <h1 style={{ textAlign: "center" }}>Nuevo Pokemon</h1>
            <div className="FormNewPokemon--grid">
              <div className="FormNewPokemon--Values">
                <p style={{ fontSize: '20px' }}>Nombre  <input ref={nameNRef} style={{ height: '45px' }} id="name" type="text" placeholder="Nombre" /></p>
                <p style={{ fontSize: '20px' }}>Imagen  <input ref={imageNRef} style={{ height: '45px' }} id="image" type="url" placeholder="url de imagen" /></p>
              </div>
              <div className="FormNewPokemon--Range">
                <p style={{ fontSize: '20px' }}>Ataque 0 <input ref={attackNRef} id="attack" type="range" />100</p>
                <p style={{ fontSize: '20px' }}>Defensa 0 <input ref={defenseNRef} id="defense" type="range" />100</p>
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <button onClick={btnSave} className="buttonnew--Save"><IoSaveSharp /> Guardar</button>
              <button onClick={btnCancel} className="buttonnew--Cancel"><BiX /> Cancelar </button>

            </div>
          </div>
        </div>
      </div>
      <div className={openAc ? "open" : "notOpen"}>
          <div className="FormNewPokemon modal" id="FormNewPokemonmodal">

            <h1 style={{ textAlign: "center" }}>Editar Pokemon</h1>
            <div className="FormNewPokemon--grid">
              <div className="FormNewPokemon--Values">
                <input ref={idRef} style={{ display: "none" }} value={idM} id="nameM" type="text" placeholder="Nombre" />
                <p style={{ fontSize: '20px' }}>Nombre  <input ref={nameRef} style={{ height: '45px' }} id="nameM" type="text" /></p>
                <p style={{ fontSize: '20px' }}>Imagen  <input ref={imageRef} style={{ height: '45px' }} id="imageM" type="url" /></p>
              </div>
              <div className="FormNewPokemon--Range">
                <p style={{ fontSize: '20px' }}>Ataque 0 <input ref={attackRef} defaultValue={attack} id="attackM" type="range" />100</p>
                <p style={{ fontSize: '20px' }}>Defensa 0 <input ref={defenseRef} defaultValue={defense} id="defenseM" type="range" />100</p>
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <button onClick={btnModificar} className="buttonnew--Save"><IoSaveSharp /> Modificar</button>
              <button onClick={btnCancelMod} className="buttonnew--Cancel"><BiX /> Cancelar </button>

            </div>
          </div>
        </div>
    </div>

  );
}

export default App;
