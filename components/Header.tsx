/* eslint-disable prettier/prettier */
import { Link } from 'expo-router';
import { Button } from 'native-base';
import { useState } from "react";
import { Image, Text, View, StyleSheet, Dimensions, Animated, TouchableOpacity, LayoutAnimation, UIManager, Platform } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

import colors from "~/colors";

const { width, height } = Dimensions.get("window");

export const HeaderComponent = () => {
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const menuAnim = new Animated.Value(-width * 0.7);
    const animatedMenuTranslateX = menuAnim.interpolate({
        inputRange: [-width * 0.7, 0],
        outputRange: [-width * 0.7, 0]
    });

    if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    
    const toggleMenu = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsOpenMenu(!isOpenMenu);
    };

    return (
        <View style={headerStyle.header}>
            <View style={headerStyle.headerContainer}>
                <Button style={headerStyle.menuBtn} onPress={toggleMenu}>
                    <Icon style={headerStyle.menuBtnIcon} name="menu" />
                </Button>
            </View>
            <View style={[headerStyle.menu, { left: isOpenMenu ? 0 : -width * 0.7 }]}>
                <View style={headerStyle.closeButtonContainer}>
                    <Button style={headerStyle.btnClose} onPress={toggleMenu}>
                        <Icon name="close" style={headerStyle.close} />
                    </Button>
                </View>
                <View style={headerStyle.logoContainer}>
                    <Text style={headerStyle.logoText}>Clinica</Text>
                    <Image 
                    source={require("assets/Logo-Passo-a-Passo.png")} 
                    style={headerStyle.logoIcon} 
                    />
                    <Text style={headerStyle.logoText}>Passo a Passo</Text>
                </View>
                <Link href="/" style={headerStyle.item}>
                    <Icon name="house" style={headerStyle.itemIcon}/>
                    <Text style={headerStyle.itemText}>Home</Text>
                </Link>
                <Link href="/cadastrarPaciente" style={headerStyle.item}>
                    <Icon name="add" style={headerStyle.itemIcon}/>
                    <Text style={headerStyle.itemText}>Cadastrar</Text>
                </Link>
                <Link href="/listarPaciente" style={headerStyle.item}>
                    <Icon name="person" style={headerStyle.itemIcon}/>
                    <Text style={headerStyle.itemText}>Pacientes</Text>
                </Link>
            </View>
            <TouchableOpacity onPress={toggleMenu} >
                <Animated.View style={[headerStyle.menuBackground, { display: isOpenMenu ? 'flex' : 'none' }]} />
            </TouchableOpacity>
            <Image 
                style={headerStyle.borderHeader} 
                source={require("assets/border-header.svg")}
                resizeMode="cover"
            />
        </View>
    );
};

const headerStyle = StyleSheet.create({
    header: {
        display: 'flex',
    },
    closeButtonContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 10,
    },
    btnClose: {
        backgroundColor: 'transparent',
        textAlign: 'right'
    },
    close: {
        color: colors.secondaryText,
        fontSize: 40
    },
    headerContainer: {
        width: '100%',
        height: 60,
        backgroundColor: colors.primaryBackground,
        display: 'flex',
        alignItems: 'flex-start',
        paddingTop: 10,
        paddingHorizontal: 10,
    },
    menuBtn: {
        backgroundColor: 'transparent',
        
    },
    menuBtnIcon: {
        padding: 0,
        color: colors.primaryText,
        fontSize: 40
    },
    menu: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '70%',
        maxWidth: 250,
        height: height,
        backgroundColor: colors.secondaryBackground,
        zIndex: 5,
    },
    logoContainer: {
        marginBottom: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoText: {
        fontSize: 20,
        color: colors.secondaryText,
        textAlign: 'center'
    },
    logoIcon: {
        width: 120,
        height: 120,
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        color: colors.secondaryText
    },
    itemIcon: {
        color: colors.secondaryText,
        fontSize: 32
    },
    itemText: {
        margin: 0,
        fontSize: 24,
        color: colors.secondaryText,
    },
    borderHeader: {
        width: '100%',
        height: width * 0.1, 
        zIndex: 1
    },
    menuBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: width,
        height: height,
        backgroundColor: colors.backgroundMenu
    }
});