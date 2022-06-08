import React, { Component, useState } from 'react';
import { View, Text, Image, StyleSheet, Switch } from 'react-native';

const GeoListItem = (props) => {
    const [isEnabled, setIsEnabled] = React.useState(props.boolean);

    React.useEffect(() => {
        setIsEnabled(props.boolean);
    }, [props.boolean])


    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
        props.fun()
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 0.2, justifyContent: "center" }}>
                <Image
                    style={styles.stretch}
                    source={require("../gfx/mapico.png")} />
            </View>
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 14, fontWeight: "bold" }}>Timestamp: {props.text.timestamp}</Text>
                <Text style={{ fontSize: 12 }}>Latitude: {props.text.coords.latitude}</Text>
                <Text style={{ fontSize: 12 }}>Longtitude: {props.text.coords.longitude}</Text>
            </View>
            <Switch
                trackColor={{ false: "#767577", true: "#B2DFDB" }}
                thumbColor={isEnabled ? "#00796B" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flex: 1,
        padding: 2,
        backgroundColor: "#ffffff"
    },
    text: {
        textAlign: "left",
        fontSize: 15,
        color: '#212121',
        padding: 4
    },
    stretch: {
        width: 40,
        height: 40,
        resizeMode: 'stretch'
    },
    wiew: {
        flex: 0.8,
        margin: 2
    },
    wiew1: {
        flex: 0.25
    }
})

export default GeoListItem
