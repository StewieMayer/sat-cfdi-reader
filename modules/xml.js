const reader = file =>
new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(fr);
    fr.onerror = (err) => reject(err);
    fr.readAsText(file);
});

const parseToXmlArray = resultsArray =>{
    const parser = new DOMParser();
    const xmlArray = resultsArray.map(resultFile => parser.parseFromString(resultFile.result,'text/xml'));

    return xmlArray;
}

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