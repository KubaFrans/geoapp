import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default class GeoButton extends Component {
    render() {
        return (
            <TouchableOpacity style={styles.button} onPress={this.props.function}>
                <Text style={styles.text}>{this.props.textOfButton}</Text>
            </TouchableOpacity>
        )
    }
}

GeoButton.propTypes = {
    textOfButton: PropTypes.string.isRequired,
    bool: PropTypes.bool.isRequired,
    function: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#9E9E9E",
        borderRadius: 5,
        flex: 1,
        padding: 3,
        margin: 5
    },
    text: {
        fontSize: 15,
        textAlign: "center",
        color: "#212121"
    }
})
