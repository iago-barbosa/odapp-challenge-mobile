/* eslint-disable prettier/prettier */
import { Href, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, Text, StyleSheet, TextInput, GestureResponderEvent } from "react-native";

import { Button} from 'react-native-paper';
import { PacienteContexts } from "~/contexts/pacientes_contexts";
import api from "~/services/api";
import ibge from "~/services/ibge";
import { IbgeCidadesProps, IbgeEstadosProps } from "~/types";
import colors from "~/colors";
import { Picker } from "@react-native-picker/picker";

export default function EditarPaciente() {
    const { selectedPaciente, setPacientes} = useContext(PacienteContexts);
    const [uf, setUf] = useState<string>('');
    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState('');
    const [estadoSelecionado, setEstadoSelecionado] = useState('');
    const [cidadeSelecionada, setCidadeSelecionada] = useState('');
    const [estados, setEstados] = useState<IbgeEstadosProps[]>([]);
    const [cidades, setCidades] = useState<IbgeCidadesProps[]>([]);
    const router = useRouter();

    const goToPage = (page: Href<string>) => {
        router.push(page);
    }
    useEffect(() => {
        ibge.get('/').then((res) => {
            const { data, status} = res;
            if(status === 200) {
                setEstados(data);
                if (selectedPaciente && selectedPaciente.estado) {
                    const estadoEncontrado = data.find((estado: IbgeEstadosProps) => estado.nome === selectedPaciente.estado);
                    if (estadoEncontrado) {
                        setUf(estadoEncontrado.sigla);
                    }
                }
            }
        });
    }, [selectedPaciente]);

    useEffect(() => {
        if (selectedPaciente) {
            setNome(selectedPaciente.nome);
            setIdade(selectedPaciente.idade.toString());
            setEstadoSelecionado(selectedPaciente.estado);
            setCidadeSelecionada(selectedPaciente.cidade);
    
           const estadoEncontrado = estados.find((estado) => estado.nome === selectedPaciente.estado);
            if (estadoEncontrado) {
                setUf(estadoEncontrado.sigla);
            }
        }
    }, [selectedPaciente, estados]);

    useEffect(() => {
        if(uf !== "") {
            ibge.get(`/${uf}/municipios`).then((res) => {
                const {data, status} = res;
                if(status === 200) {
                    setCidades(data);
                }
            });
        }
    }, [uf]);

    const atualizarPaciente = (e: GestureResponderEvent) => {
        e.preventDefault();

        if(nome.trim() === '' || idade.trim() === '' || !cidadeSelecionada || !estadoSelecionado) {
            alert("Por favor, preencha todos os campos!");
        } else {
            const data = {
                nome,
                idade,
                cidade: cidadeSelecionada,
                estado: estadoSelecionado
            }

            console.log("aqui");
            console.log(data);
            
            
            api.put(`/atualizar-paciente/${selectedPaciente?._id}`, data).then((res) => {
                const {status} = res;
    
                if(status === 200) {
                    alert("Dados Atualizados");
                    api.get('/lista-pacientes').then((res: { data: any; status: any; }) => {
                        const { data, status } = res;
                        if(status === 200) {
                            setPacientes(data);
                            goToPage("/listarPaciente");
                        }
                    });
                }
            })
        }

    }


    return (
        <View style={styles.container}>
            <Icon style={styles.icon} onPress={() => goToPage('/listarPaciente')} name="undo"/>
            <Text style={styles.title}>Alterar Paciente</Text>

            <TextInput
                placeholder="Nome Completo"
                value={nome}
                onChangeText={setNome}
                style={styles.input}
            />

            <TextInput
                placeholder="Idade"
                value={idade}
                onChangeText={(text) => setIdade(text.replace(/[^0-9]/g, ''))}
                keyboardType="numeric"
                style={styles.input}
            />

            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={uf}
                    onValueChange={(itemValue, itemIndex) => {
                        const estado = estados.find(estado => estado.sigla === itemValue);
                        if (estado) {
                            setEstadoSelecionado(estado.nome);
                        }
                        setUf(itemValue);
                    }}
                    style={styles.picker}
                >
                    <Picker.Item key='' label='Selecione o Estado' value='' />
                    {estados.map((estado) => (
                        <Picker.Item key={estado.sigla} label={estado.nome} value={estado.sigla} />
                    ))}
                </Picker>
            </View>

            <View style={styles.pickerContainer}>
                <Picker
                    enabled={uf.length !== 0}
                    selectedValue={cidadeSelecionada}
                    onValueChange={(itemValue, itemIndex) => {
                        setCidadeSelecionada(itemValue);
                    }}
                    style={styles.picker}
                >
                    <Picker.Item key='' label='Selecione a Cidade' value='' />
                    {cidades.map((cidade) => (
                        <Picker.Item key={cidade.id} label={cidade.nome} value={cidade.nome} />
                    ))}
                </Picker>
            </View>

            <Button
                mode="contained"
                onPress={(e) => atualizarPaciente(e)}
                style={styles.btnCadastrar}
                contentStyle={styles.btnContent}
                labelStyle={styles.btnLabel}
            >
                Atualizar
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    icon: {
        fontSize: 32,
        color: colors.secondaryBackground,
        borderWidth: 2,
        borderColor: colors.secondaryBackground,
        borderRadius: 27,
        width: 46,
        padding: 7,
        marginBottom: 15
        
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.secondaryText,
        marginBottom: 20,
    },
    input: {
        marginBottom: 20,
        borderWidth: 2,
        borderColor: colors.secondaryBackground,
        borderRadius: 4,
        fontSize: 20,
        height: 40,
        padding: 10,
        backgroundColor: '#FFF',
        color: colors.secondaryText
    },
    pickerContainer: {
        marginBottom: 20,
        borderWidth: 1,
        borderColor: colors.secondaryBackground,
        borderRadius: 4,
        backgroundColor: colors.secondaryBackground,
    },
    picker: {
        color: colors.secondaryText,
        borderRadius: 4,
        fontSize: 20,
        height: 40,
        
    },
    btnCadastrar: {
        backgroundColor: colors.secondaryBackground,
        borderRadius: 55,
        marginTop: 20,
    },
    btnContent: {
        height: 55,
        justifyContent: 'center',
    },
    btnLabel: {
        color: colors.primaryText,
        fontSize: 16,
    },
});