//Crea una promesa que resuelve en un archivo de texto
const reader = file =>
new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(fr);
    fr.onerror = (err) => reject(err);
    fr.readAsText(file);
});

//Recibe un array de results creados con reader y devuelve un array de archivos xml 
const parseToXmlArray = resultsArray =>{
    const parser = new DOMParser();
    const xmlArray = resultsArray.map(resultFile => parser.parseFromString(resultFile.result,'text/xml'));

    return xmlArray;
}

//Recibe un array de files y retorna un array de xml
const getXMLArray = async filesArray =>{
    const readerArray = filesArray.map(reader);
    let resultsArray = [];

    try {
        resultsArray = await Promise.all(readerArray);
    } catch (error) {console.log("Error al resolver las promesas",error);}

    const xmlArray = parseToXmlArray(resultsArray);
    return xmlArray;
}

export default getXMLArray;