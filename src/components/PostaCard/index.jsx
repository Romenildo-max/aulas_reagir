//isso é um components ele atualizar o state memso sem o metodo render que é a função dele

//Props(propriedades) -> atributos, que vai ser definido no import do arquivo ai vai vim para o export com PROPS, para pode recuperar valores do DOM ou manipula-los
//colocando os atributos -> props(cover, id, title, body) entre as {} quer dizer que já estamos fazendo o desctrutury da props e não precisar utilizar a palavra props entre ()

import './styles.css';

export const PostCard = ({ title, cover, body, id }) => {
    return(
        <div className="post">
            <img src={cover} alt={title} />
            <div className="post-content">
                <h1>{title}</h1>
                <p>{body}</p>
            </div>
        </div>
    );
}