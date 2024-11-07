/* eslint-disable no-unused-expressions */
/* eslint-disable prettier/prettier */
import React, { useContext, useEffect, useState } from 'react';
import { TextInput, View, StyleSheet, Text, GestureResponderEvent } from 'react-native';
import { Button } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import colors from '~/colors';
import { PacienteContexts } from '~/contexts/pacientes_contexts';
import api from '~/services/api';
import ibge from '~/services/ibge';
import { IbgeCidadesProps, IbgeEstadosProps } from '~/types';
import { useRouter } from 'expo-router';

export default function CadastrarNovoPaciente() {
    const { setPacientes } = useContext(PacienteContexts);
    const [uf, setUf] = useState<string>('');
    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState('');
    const [estadoSelecionado, setEstadoSelecionado] = useState('');
    const [cidadeSelecionada, setCidadeSelecionada] = useState('');
    const [estados, setEstados] = useState<IbgeEstadosProps[]>([]);
    const [cidades, setCidades] = useState<IbgeCidadesProps[]>([]);
    const router = useRouter();

    useEffect(() => {
        ibge.get('/').then((res) => {
            if (res.status === 200) {
                setEstados(res.data);
            }
        });
    }, []);

    useEffect(() => {
        if (uf) {
            ibge.get(`/${uf}/municipios`).then((res) => {
                if (res.status === 200) {
                    setCidades(res.data);
                }
            });
        } else {
            setCidades([]);
        }
    }, [uf]);

    const cadastrarPaciente = (e: GestureResponderEvent) => {
        e.preventDefault();

        if (nome.trim() === '' || idade.trim() === '' || !cidadeSelecionada || !estadoSelecionado) {
            alert("Por favor, preencha todos os campos!");
            return;
        }

        const data = { nome, idade, cidade: cidadeSelecionada, estado: estadoSelecionado };

        api.post('/novo-paciente', data).then((res) => {
            if (res.status === 201) {
                alert("Dados Cadastrados");
                api.get('/lista-pacientes').then((res) => {
                    if (res.status === 200) {
                        setPacientes(res.data);
                        setNome('');
                        setIdade('');
                        setUf('');
                        setEstadoSelecionado('');
                        setCidadeSelecionada('');
                        router.push('/listarPaciente');
                    }
                });
            }
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastrar Paciente</Text>

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
                onPress={(e) => cadastrarPaciente(e)}
                style={styles.btnCadastrar}
                contentStyle={styles.btnContent}
                labelStyle={styles.btnLabel}
            >
                Realizar Cadastro
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
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
