//Recibe un array con los atributos y devuelve un objeto con ellos
const getAtributos = arrAtributos=>{
    const atributos = {};

    arrAtributos.forEach(atributo=>{
        const nombre = atributo.nodeName;
        const valor = atributo.nodeValue;
        atributos[nombre] = valor;
    })

    //Obtiene la cantidad de atributos 
    const keysArrayLength = Object.keys(atributos).length; 

    //Si no hay atributos retorna null
    return keysArrayLength>0?atributos:null;
}

//Usa recursividad para recorrer el xml 
const parseJson = nodo =>{
    //Datos para retornar
    const clave = nodo.nodeName;
    const nodoObject = {};

    //Información general del nodo
    const arrAtributos = nodo.attributes?[...nodo.attributes]:[];
    const atributos = getAtributos(arrAtributos);
    const hijos = [...nodo.childNodes];
    
    //Si tiene atributos agrega la clave atributos
    if(atributos)
    nodoObject["atributos"] = atributos;

    //Si el nodo tiene hijos parsea los hijos y los agrega como claves
    hijos.forEach(hijo=>{

        //Datos parseados del nodo hijo
        const jsonHijo = parseJson(hijo);
        const claveHijo = jsonHijo.clave;
        const hijoObject = jsonHijo.nodoObject;
        
        //Si el hijo es un objeto null pasa al siguiente hijo 
        if(!hijoObject)
        return;

        const nodoValue = nodoObject[claveHijo];

        //Inserta el hijo como clave
        //Si el hijo pertenece a un conjunto de hijos del mismo tipo, lo agrega al array
        if(nodoValue){
            if(Array.isArray(nodoValue)){
                nodoObject[claveHijo] = [...nodoValue,hijoObject];
            }else{
                nodoObject[claveHijo] = [nodoValue,hijoObject];
            }
        }else{
            nodoObject[claveHijo] = hijoObject;
        }

    })

    //Configura el objeto de retorno
    const objetoRetorno = {clave};
    const keysArrayLength = Object.keys(nodoObject).length;
    if(keysArrayLength>0)
    objetoRetorno["nodoObject"]=nodoObject

    return objetoRetorno;

}

//Callback para mapear los xml, retorna un xml parseado a JSON
const getJsonFromXml = xml =>{
    
    const rootNode = xml.getRootNode();
    const nodo = [...rootNode.childNodes][0];
    
    const {clave,nodoObject} = parseJson(nodo);
    const objetoRetorno = {[clave]:nodoObject}
    
    return objetoRetorno;
}

//Función principal retorna un array de XML parseados a JSON 
const getData = xmlArray =>{
    const dataArray = Array.from(xmlArray).map(getJsonFromXml);
    return dataArray;
}

export default getData; 