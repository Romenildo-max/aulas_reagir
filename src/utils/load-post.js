
export const loadPosts = async () => {
    const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts') //buscando dados online com FECTH, ele retorna uma promisse
    const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos') //buscando imagens online

    const [posts, photos] = await Promise.all([postsResponse, photosResponse]); //colocando e resolvendo todas as Promise(promessa) dentro de um array chamado de posts

    const postsJson = await posts.json(); //convertendo todos posts em arquivo Json e colocando dentro de uma array chamado postsJson, await porque são promisse é array porque posts é array estou apenas mudando o nome e já transformando em aqruivo Json
    const photosJson = await photos.json(); //convertendo todos photos em arquivo Json e colocando dentro de uma array chamado photosJson, await porque são promisse, é array porque photos é array estou apenas mudando o nome e já transformando em aqruivo Json

    const postsAndPhotos = postsJson.map((post, i) => { //colocando todos post dentra das fotos assim que acabar os post irá acabar as fotos pegando o nemor array que é post e colocando dentro de photosJson que é o maior array
      return { ...post, cover: photosJson[i].url } //retornando os post espalhado... e cover que são as imagem e url das imagem
    });

    return postsAndPhotos;
}