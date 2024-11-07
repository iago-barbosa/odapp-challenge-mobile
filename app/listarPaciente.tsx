/* eslint-disable prettier/prettier */
import { useContext, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import colors from "~/colors";
import { PacienteItem } from "~/components/PacienteItem";
import { PacienteContexts } from "~/contexts/pacientes_contexts";
import api from "~/services/api";

export default function ListarPaciente() {
    const { paciente, setPacientes } = useContext(PacienteContexts);

    useEffect(() => {
        if(paciente.length === 0) {
            api.get('/lista-pacientes').then((res: { data: any; status: any; }) => {
                const { data, status } = res;
                if(status === 200) {
                    setPacientes(data);
                }
            });
        }
    },[paciente]);
    
    return(
        <View style={pacienteStyle.container}>
            <Text style={pacienteStyle.textH3}>Pacientes</Text>
            <ScrollView contentContainerStyle={pacienteStyle.scrollContainer}>
            {(Array.isArray(paciente) ? paciente : []).map((p, index) => (
                    <PacienteItem key={index} paciente={p} />
                ))}
            </ScrollView>
        </View>
    );
};


const pacienteStyle = StyleSheet.create({
    container: {
        flex: 1
    },
    textH3: {
        fontSize: 28,
        color: colors.secondaryText,
        marginLeft: 15
    },
    scrollContainer: {
        paddingBottom: 25,
        padding: 15,
        gap: 20
    }
});

