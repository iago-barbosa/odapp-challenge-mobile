/* eslint-disable prettier/prettier */
import { useContext, useEffect, useState } from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { PacienteContexts } from "~/contexts/pacientes_contexts";
import { BarChart, PieChart } from 'react-native-chart-kit';
import api from "~/services/api";
import { EstadoProps, IdadeProps, PacienteProps } from "~/types";
import colors from "~/colors";
import { ScrollView } from "native-base";

export default function HomePage() {
    const { paciente, setPacientes} = useContext(PacienteContexts);
    let estadosObject: Record<string, number> = {};
    const [qtdPacientes, setQtdPacientes] = useState<number>(0);
    const [dadosEstado, setDadosEstado] = useState<EstadoProps[]>([]);
    const [dadosIdade, setDadosIdade] = useState<IdadeProps>({
        labels: ['0-5', '6-10', '11-15', '16-18', '19-25', '+25'],
        datasets: [
          {
            data: [0, 0, 0, 0, 0, 0]
          }
        ]
      });
    const screenWidth = Dimensions.get("window").width;

    const geradorDeCores = () => {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);

        return `rgba(${r}, ${g}, ${b}, 0.5)`;
    }

    useEffect(() => {
        setQtdPacientes(paciente ? paciente.length: 0);
    },[paciente]);

    useEffect(() => {
        api.get('/lista-pacientes').then((res: { data: any; status: any; }) => {
            const { data, status } = res;
            if(status === 200) {
                setPacientes(data);

                console.log(data);

                let idades:IdadeProps = {
                    labels: ['0-5', '6-10', '11-15', '16-18', '19-25', '+25'],
                    datasets: [
                      {
                        data: [0, 0, 0, 0, 0, 0]
                      }
                    ]
                  };

                if(Object.keys(estadosObject).length >0) {
                    estadosObject = {};
                }
                data.forEach((paciente: PacienteProps) => {
                    estadosObject[paciente.estado] = (estadosObject[paciente.estado] || 0) + 1;

                    if(paciente.idade <= 5) {
                        idades.datasets[0].data[0] += 1;
                    } else if(paciente.idade <=10) {
                        idades.datasets[0].data[1] += 1;
                    } else if(paciente.idade <=15) {
                        idades.datasets[0].data[2] += 1;
                    } else if(paciente.idade <=18) {
                        idades.datasets[0].data[3] += 1;
                    } else if(paciente.idade <=25) {
                        idades.datasets[0].data[4] += 1;
                    } else {
                        idades.datasets[0].data[5] += 1;
                    }
                });

                setDadosEstado(Object.entries(estadosObject).map(([estado, pacientes]) => ({
                    name: estado,
                    population: pacientes,
                    color: geradorDeCores(),
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 15
                })));

                setDadosIdade(idades);
            }
        })
    }, [setPacientes]);
    
    return(
        <ScrollView>
            <Text style={stylesHome.textH3}>Pacientes Cadastrados: {qtdPacientes}</Text>
            <Text style={stylesHome.textH3}>Estados Alcançados: {dadosEstado.length}</Text>
            <Text style={stylesHome.textH3}>Pacientes por Estado:</Text>
            <PieChart 
                data={dadosEstado}
                width={screenWidth}
                height={screenWidth * 0.4}
                chartConfig={{
                    backgroundColor: "#ffffff",
                    backgroundGradientFrom: "#ffffff",
                    backgroundGradientTo: "#ffffff",
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    strokeWidth: 2,
                }}
                accessor={"population"}
                backgroundColor={"transparent"}
                paddingLeft={"15"}
                absolute
            />
            <Text style={stylesHome.textH3}>Pacientes por Idade:</Text>
            <BarChart
                data={dadosIdade}
                width={screenWidth}
                height={220}
                xAxisLabel=""
                yAxisLabel=""
                yAxisSuffix=""
                chartConfig={{
                    backgroundColor: "#ffffff",
                    backgroundGradientFrom: "#ffffff",
                    backgroundGradientTo: "#ffffff",
                    color: (opacity = 1) => `rgba(100,149,237, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
                    strokeWidth: 2,
                }}
                verticalLabelRotation={30}
                style={{ marginVertical: 8, borderRadius: 16 }}  // Ajuste para estilo e espaço
            />
        </ScrollView>
    )
};

const stylesHome = StyleSheet.create({
    textH3: {
        fontSize: 28,
        color: colors.secondaryText,
        marginLeft: 15,
        marginBottom: 20
    }
})