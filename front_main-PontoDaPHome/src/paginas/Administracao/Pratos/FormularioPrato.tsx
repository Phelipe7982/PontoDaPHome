import { Box, Button, FormControl, TextField, Typography, InputLabel, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import http from "../../../http";
import ITag from "../../../interfaces/ITag";
import IRestaurante from "../../../interfaces/IRestaurante";

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

    const [imagem, setImagem] = useState<File | null>(null);

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
            setImagem(null);
        }
    }

    const aoSubmeterForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Lógica de submeter form
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
                        margin="dense" // margem padrão de espaçamento entre elementos no mui
                        fullWidth
                        required
                    />
                    <TextField value={descricao}
                        onChange={event => setDescricao(event.target.value)}
                        id="standard-basic"
                        label="Descrição do Prato"
                        variant="standard"
                        margin="dense" // margem padrão de espaçamento entre elementos no mui
                        fullWidth
                        required
                    />

                    <FormControl margin="dense" fullWidth>
                        <InputLabel id="select-tag">Tag</InputLabel>
                        <Select labelId="select-tag" value={tag} onChange={event => setTag(event.target.value)}>
                            {tags.map(tag =>
                                <MenuItem key={tag.id} value={tag.id}>
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