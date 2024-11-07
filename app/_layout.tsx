/* eslint-disable prettier/prettier */
import { Stack } from "expo-router";
import { NativeBaseProvider } from "native-base";

import { HeaderComponent } from "~/components/Header";
import { PacienteContextProvider } from "~/contexts/pacientes_contexts";

export default function RootLayout () {
    return (
        <NativeBaseProvider>
            <PacienteContextProvider>
                <Stack>
                    <Stack.Screen 
                        name="index"
                        options={{
                            header: () => <HeaderComponent />
                        }}
                    />
                    <Stack.Screen 
                        name="cadastrarPaciente"
                        options={{
                            header: () => <HeaderComponent />
                        }}
                    />
                    <Stack.Screen 
                        name="editar"
                        options={{
                            header: () => <HeaderComponent />
                        }}
                    />
                    <Stack.Screen 
                        name="listarPaciente"
                        options={{
                            header: () => <HeaderComponent />
                        }}
                    />
                </Stack>
            </PacienteContextProvider>
        </NativeBaseProvider>
    )   
}