import { Box, Button, FormControl, TextField, Typography, InputLabel, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import http from "../../../http";
import ITag from "../../../interfaces/ITag";
import IRestaurante from "../../../interfaces/IRestaurante";
import { useParams } from "react-router-dom";
import IPrato from "../../../interfaces/IPrato";

const FormularioPrato = () => {

    // Estados do formulário
    const [nomePrato, setNomePrato] = useState<string>('');
    const [descricao, setDescricao] = useState<string>('');

    // Estados dos selects
    const [tag, setTag] = useState<string>('');
    const [restaurante, setRestaurante] = useState<string>('');

    // Estados das listas da API
    const [tags, setTags] = useState<ITag[]>([]);
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

    const [imagem, setImagem] = useState<File | string>('');

    // Para a tela de editar
    const parametros = useParams();

    useEffect(() => {
        if (parametros.id) {
            http.get<IPrato>(`pratos/${parametros.id}/`)
                .then(resposta => {
                    setNomePrato(resposta.data.nome);
                    setDescricao(resposta.data.descricao);
                    setTag(resposta.data.tag);
                    setRestaurante(resposta.data.restaurante.toString());
                    setImagem(resposta.data.imagem);
                })
        }
    }, [parametros]);

    // Para pegar as tags e restaurantes dos pratos
    useEffect(() => {
        http.get<{ tags: ITag[] }>("tags/")
            .then(resposta => setTags(resposta.data.tags));

        http.get<IRestaurante[]>("restaurantes/")
            .then(resposta => setRestaurantes(resposta.data))
    }, []);

    const selecionarArquivo = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length) {
            setImagem(event.target.files[0]);
        } else {
            setImagem('http://localhost:8000/media/img.jpeg');
        }
    }

    const aoSubmeterForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (parametros.id) {
            http.put(`pratos/${parametros.id}/`, {
                nome: nomePrato,
                descricao,
                tag,
                restaurante
            })
                .then(() => {
                    alert("Prato atualizado com sucesso!")
                })
        } else {
            // Lógica de submeter form
            const formData = new FormData();

            formData.append('nome', nomePrato);
            formData.append('descricao', descricao);
            formData.append('tag', tag);
            formData.append('restaurante', restaurante);

            if (imagem) {
                formData.append('imagem', imagem);
            }

            http.request({
                url: 'pratos/',
                method: 'POST',
                headers: {
                    'Content-type': 'multipart/form-data'
                },
                data: formData
            })
                .then(() => {
                    setNomePrato('');
                    setDescricao('');
                    setTag('');
                    setRestaurante('');
                    alert('Prato cadastrado com sucesso!');
                })
                .catch(error => console.log(error))
        }
    }

    return (
        <>
            {/* Conteúdo da página */}
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
                <Typography component="h1" variant="h6">Formulário de Pratos</Typography>
                <Box component="form" sx={{ width: "100%" }} onSubmit={aoSubmeterForm}>
                    <TextField value={nomePrato}
                        onChange={event => setNomePrato(event.target.value)}
                        id="standard-basic"
                        label="Nome do Prato"
                        variant="standard"
                        autoComplete="off"
                        margin="dense" // margem padrão de espaçamento entre elementos no mui
                        fullWidth
                        required
                    />
                    <TextField value={descricao}
                        onChange={event => setDescricao(event.target.value)}
                        id="standard-basic"
                        label="Descrição do Prato"
                        variant="standard"
                        autoComplete="off"
                        margin="dense" // margem padrão de espaçamento entre elementos no mui
                        fullWidth
                        required
                    />

                    <FormControl margin="dense" fullWidth>
                        <InputLabel id="select-tag">Tag</InputLabel>
                        <Select labelId="select-tag" value={tag} onChange={event => setTag(event.target.value)}>
                            {tags.map(tag =>
                                <MenuItem key={tag.id} value={tag.value}>
                                    {tag.value}
                                </MenuItem>)}
                        </Select>
                    </FormControl>

                    <FormControl margin="dense" fullWidth>
                        <InputLabel id="select-restaurante">Restaurante</InputLabel>
                        <Select labelId="select-restaurante" value={restaurante} onChange={event => setRestaurante(event.target.value)}>
                            {restaurantes.map(restaurante =>
                                <MenuItem key={restaurante.id} value={restaurante.id}>
                                    {restaurante.nome}
                                </MenuItem>)}
                        </Select>
                    </FormControl>

                    <input type="file" onChange={selecionarArquivo} />
                    <Button sx={{ marginTop: 1 }} type="submit" variant="outlined" fullWidth>Salvar</Button>
                </Box>
            </Box>
        </>
    )
}

export default FormularioPrato;