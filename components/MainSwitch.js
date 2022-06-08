import React, { useState } from "react";
import { View, Switch, StyleSheet } from "react-native";

const MainSwitch = (props) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState)
        props.change(isEnabled)
    }

    return (
        <View style={styles.container}>
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
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});

export default MainSwitch;
