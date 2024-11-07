/* eslint-disable prettier/prettier */
export type PacienteProps = {
    _id: number,
    nome: string,
    idade: number,
    dataCadastro: Date,
    cidade: string,
    estado: string
}

export type PacienteContextProps =  {
    children: React.ReactNode;
}

export type IbgeEstadosProps = {
    id: number,
    sigla: string,
    nome: string
}

export type IbgeCidadesProps = {
    id: number,
    nome: string
}

export type EstadoProps = {
    name: string;
    population: number;
    color: string;
    legendFontColor: string;
    legendFontSize: number;
}

export type IdadeProps = {
    labels: string[],
    datasets: [
        {
            data: number[]
        }
    ]
}
