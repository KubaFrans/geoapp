import React, { Component } from 'react';
import { View, Text } from 'react-native';
import GeoButton from './GeoButton';
import * as Font from "expo-font";

class StartGeo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontloaded: false,
        };
    }

    componentDidMount = async () => {
        await Font.loadAsync({
            'myfont': require('../gg.ttf'),
        });
        this.setState({ fontloaded: true })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {
                    this.state.fontloaded
                        ?
                        <View style={{ flex: 0.4, backgroundColor: "#009688", justifyContent: "center" }}>
                            <Text style={{
                                fontFamily: 'myfont',
                                fontSize: 80,
                                textAlign: "center",
                                color: "#FFFFFF"
                            }}>GeoMap App </Text>
                            <Text style={{
                                fontFamily: 'myfont',
                                fontSize: 20,
                                textAlign: "center",
                                color: "#FFFFFF"
                            }}>find and save your position </Text>
                        </View>
                        :
                        null
                }
                <View style={{ flex: 0.05, margin: 10, padding: 5, justifyContent: "center" }}>
                    <GeoButton textOfButton="ROZPOCZIJ" bool={false} function={() =>
                        this.props.navigation.navigate("positions")}></GeoButton>
                </View>
            </View>
        );
    }
}

export default StartGeo;
