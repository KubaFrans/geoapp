import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        let returning = []
        for (let i = 0; i < this.props.route.params.data.length; i++) {
            returning.push(<MapView.Marker
                coordinate={{
                    latitude: this.props.route.params.data[i].coords.latitude,
                    longitude: this.props.route.params.data[i].coords.longitude,
                }}
                title={"pozycja " + i}
                description={"pozycja na mapie"}
            />)
        }

        return (
            <View style={{ flex: 1 }}>
                <MapView
                    style={{ flex: 1 }}
                    initialRegion={{
                        latitude: this.props.route.params.data[0].coords.latitude,
                        longitude: this.props.route.params.data[0].coords.longitude,
                        latitudeDelta: 0.001,
                        longitudeDelta: 0.001,
                    }}
                >
                    {returning}
                </MapView>
            </View >
        );
    }

}

