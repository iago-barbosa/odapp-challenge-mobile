/* eslint-disable prettier/prettier */
/* eslint-disable no-sequences */
import React from "react";
import { PacienteProps, PacienteContextProps } from "types";


const initialValue = {
    paciente: [] as PacienteProps[],
    setPacientes: (newState: PacienteProps[]) => {},
    selectedPaciente: undefined as PacienteProps | undefined,
    setSelectedPaciente: (newState: PacienteProps) => {}
}

export const PacienteContexts = React.createContext(initialValue);

export const PacienteContextProvider = ({ children }: PacienteContextProps) => {
    const [paciente, setPacientes] = React.useState<PacienteProps[]>(initialValue.paciente);
    const [selectedPaciente, setSelectedPaciente] = React.useState<PacienteProps | undefined>(initialValue.selectedPaciente);


    

    return (
        <PacienteContexts.Provider value={
            {
                paciente,
                setPacientes,
                selectedPaciente,
                setSelectedPaciente
            }
        }>{children}</PacienteContexts.Provider>
    )
}