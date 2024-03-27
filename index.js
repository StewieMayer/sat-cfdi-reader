import getXMLArray from "./modules/xml";
import getData from "./modules/data";

//A partir de un array de files, obtiene un array con los XML y retorna un array de JSONs con la información de los CFDIs 
const readCfdis = async filesArray =>{
    const xmlArray = await getXMLArray(filesArray);
    const dataArray = getData(xmlArray);

    return dataArray;
}

module.exports = readCfdis;