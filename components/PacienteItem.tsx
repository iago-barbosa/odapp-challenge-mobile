/* eslint-disable prettier/prettier */
import { format } from 'date-fns';
import { useRouter } from "expo-router";
import { Button } from "native-base";
import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import colors from "~/colors";
import { PacienteContexts } from "~/contexts/pacientes_contexts";
import api from "~/services/api";
import { PacienteProps } from "~/types";

export const PacienteItem = (props: any) => {
    const { paciente } = props;
    const { setSelectedPaciente, setPacientes } = useContext(PacienteContexts);
    const [isOpen, setOpenInfo] = useState(false);
    const [heightAnim] = useState(new Animated.Value(0));
    const [rotateAnim] = useState(new Animated.Value(0))
    const router = useRouter();

    useEffect(() => {
        Animated.timing(heightAnim, {
            toValue: isOpen ? 150 : 0,
            duration: 400,
            useNativeDriver: false,
        }).start();

        Animated.timing(rotateAnim, {
            toValue: isOpen ? 1 : 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [isOpen]);

    const editar = (paciente: PacienteProps) => {
        setSelectedPaciente(paciente);
        router.push("/editar");
    };

    const deletar = (id: number) => {
        api.delete(`/deletar-paciente/${id}`).then((res: { data: any; status: any; }) => {
            const { data, status } = res;
            if (status === 200) {
                alert(data.message);
                api.get('/lista-pacientes').then((res: { data: any, status: any }) => {
                    if (status === 200) {
                        setPacientes(res.data);
                    }
                });
            }
        });
    };

    const rotateInterpolate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    return (
        <View style={pacienteStyle.pacienteItem}>
            <TouchableOpacity style={pacienteStyle.title} onPress={() => setOpenInfo(!isOpen)}>
                <Text style={pacienteStyle.textH3}>{paciente.nome}</Text>
                <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
                    <Icon style={pacienteStyle.iconPrimary} name="expand-more" />
                </Animated.View>
            </TouchableOpacity>
            <Animated.View style={[isOpen ? pacienteStyle.open : pacienteStyle.close, {height: heightAnim}]}>
                <Text style={pacienteStyle.text}>Idade: {paciente.idade}</Text>
                <Text style={pacienteStyle.text}>Cidade: {paciente.cidade}</Text>
                <Text style={pacienteStyle.text}>Estado: {paciente.estado}</Text>
                <Text style={pacienteStyle.text}>Data de Cadastro: {format(new Date(paciente.dataCadastro), 'dd/MM/yyyy')}</Text>
                <View style={pacienteStyle.divFlex}>
                    <Button style={pacienteStyle.btnEditar}
                        onPress={() => editar(paciente)}
                        leftIcon={<Icon name="edit" style={pacienteStyle.iconSecundary} />}
                    >
                        <Text style={pacienteStyle.btnText}>Editar</Text>
                    </Button>
                    <Button style={pacienteStyle.btnDeletar} onPress={() => deletar(paciente._id)}
                            leftIcon={<Icon name="delete" style={pacienteStyle.iconSecundary} />}
                        >
                        <Text style={pacienteStyle.btnText}>Deletar</Text>
                    </Button>
                </View>
            </Animated.View>
        </View>
    );
};

const pacienteStyle = StyleSheet.create({
    pacienteItem: {
        borderWidth: 1,
        borderColor: colors.secondaryBackground,
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 10,
        zIndex: 2
    },
    close: {
        display: 'none'
    },
    open: {
        display: 'flex'
    },
    title: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    iconPrimary: {
        fontSize: 36,
        color: colors.secondaryText
    },
    iconSecundary: {
        color: colors.primaryText,
        fontSize: 26,
        marginRight: 5,
    },
    text: {
        fontSize: 16,
        color: colors.secondaryText
    },
    textH3: {
        fontSize: 28,
        color: colors.secondaryText
    },
    divFlex: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10
    },
    btnEditar: {
        backgroundColor: colors.secondaryBackground,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    btnDeletar: {
        backgroundColor: colors.delete,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText: {
        fontWeight: 'bold',
        color: colors.primaryText,
        textAlignVertical: 'center',
    }
});
