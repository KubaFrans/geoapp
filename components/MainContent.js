import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';

import GeoButton from './GeoButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from "expo-location";
import GeoListItem from './GeoListItem';
import MainSwitch from './MainSwitch';

class MainContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            boolArray: []
        };
    }

    componentDidMount() {
        this.getAllData()
        this.setPermissions()
        this.getData()

    }

    getData = async () => {
        let val = await AsyncStorage.getItem('posCounter');
        if (val == null) {
            await AsyncStorage.setItem('posCounter', "0");
        }
    }

    setPermissions = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            alert('odmawiam przydzielenia uprawnień do czytania lokalizacji')
        }
    }

    getClean = async () => {
        await AsyncStorage.clear()
        this.getAllData()
        this.getData()
    }

    getPositionAndSave = async () => {
        let pos = await Location.getCurrentPositionAsync({})
        pos = JSON.stringify(pos, null, 4)
        let key = await AsyncStorage.getItem('posCounter');
        await AsyncStorage.setItem(key, pos);
        parseInt(key)
        key++
        await AsyncStorage.setItem('posCounter', key.toString());
        this.getAllData()
    }

    getAllData = async () => {
        let keys = await AsyncStorage.getAllKeys();
        let stores = await AsyncStorage.multiGet(keys);
        let positions = []
        let boolArray = []
        let maps = stores.map((result, i, store) => {
            if (store[i][0] != "posCounter") {
                positions.push(JSON.parse(store[i][1]))
                positions[positions.length - 1].id = store[i][0]
                boolArray.push(false)
            }
        });
        this.setState({ data: positions })
        this.setState({ boolArray: boolArray })
    }

    change(param) {
        let newArr = []
        for (let i in this.state.boolArray) {
            newArr.push(!param)
        }
        this.setState({ boolArray: newArr })
    }

    changeOne(param) {
        let newArr = []
        for (let i = 0; i < this.state.boolArray.length; i++) {
            if (i == param)
                newArr.push(!this.state.boolArray[i])
            else
                newArr.push(this.state.boolArray[i])
        }

        this.setState({ boolArray: newArr })
    }

    componentDidUpdate(previousState) {
        if (this.state.boolArray != previousState.boolArray) {
            this.render()
        }
    }

    goNext() {
        let data = []
        let test = false
        for (let i in this.state.boolArray) {
            if (this.state.boolArray[i] == true)
                test = true
        }

        if (test == false) {
            alert("brak zaznaczonej pozycji")
        } else {
            for (let i = 0; i < this.state.data.length; i++) {
                if (this.state.boolArray[i] == true) {
                    data.push(this.state.data[i])
                }
            }
            this.props.navigation.navigate("map", { data })
        }

    }

    render() {
        return (
            <View style={{ flex: 1, margin: 0, padding: 0, }}>
                <View style={{ flex: 0.07, margin: 0, padding: 5, flexDirection: "row" }}>
                    <GeoButton textOfButton="Lokalizuj" bool={false} function={this.getPositionAndSave.bind(this)}></GeoButton>
                    <GeoButton textOfButton="Usuń wszystkie dane" bool={false} function={this.getClean.bind(this)}></GeoButton>
                </View>

                <View style={{ flex: 0.07, margin: 0, padding: 5, flexDirection: "row" }}>
                    <View style={{ flex: 1 }}><GeoButton textOfButton="Przejdź do mapy" bool={false} function={this.goNext.bind(this)}></GeoButton></View>
                    <View style={{ flex: 0.2 }}><MainSwitch change={this.change.bind(this)}></MainSwitch></View>
                </View>
                <View style={{ flex: 1, margin: 10, padding: 5, }}>
                    <FlatList
                        data={this.state.data}
                        renderItem={({ index, item }) => <GeoListItem fun={this.changeOne.bind(this, index)} text={item} boolean={this.state.boolArray[index]} keyExtractor={(item, index) => index.toString()}></GeoListItem>}
                    />
                </View>
            </View>
        );
    }
}

export default MainContent;
