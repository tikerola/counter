import React from 'react'
import arrayMove from 'array-move'
import { connect } from 'react-redux'
import { add, subtract, reset, incrementAsync, fetchAsync } from '../../redux/counter/actions'
import { SortableList } from './sortable-list'


class SortableComponent extends React.Component {

    state = {
        buttonProps: [{
            className: "btn",
            handleClick: this.props.add,
            font: "Cinzel, serif",
            disabled: this.props.loading,
            children: 'Add One'
        }, {
            className: "btn",
            handleClick: this.props.subtract,
            font: "Cinzel, serif",
            disabled: this.props.loading,
            children: 'Subtract One'
        }, {
            className: "btn",
            handleClick: this.props.reset,
            font: "Cinzel, serif",
            disabled: this.props.loading,
            children: 'Reset to zero'
        }, {
            className: "btn",
            handleClick: () => this.props.incrementAsync(2000),
            font: "Cinzel, serif",
            disabled: this.props.loading,
            children: 'Saga increment'
        }, {
            className: "btn",
            handleClick: this.props.fetchAsync,
            font: "Cinzel, serif",
            disabled: this.props.loading,
            children: 'Thunk fetch'
        }]
    }

    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ buttonProps }) => ({
            buttonProps: arrayMove(buttonProps, oldIndex, newIndex),
        }))
    }

    render() {
        return (
            <SortableList buttonProps={this.state.buttonProps} onSortEnd={this.onSortEnd} lockAxis="y" />
        )
    }
}

const mapStateToProps = state => ({
    loading: state.counter.loading
})

const mapDispatchToProps = dispatch => ({
    add: () => dispatch(add()),
    subtract: () => dispatch(subtract()),
    reset: () => dispatch(reset()),
    incrementAsync: (ms) => dispatch(incrementAsync(ms)),
    fetchAsync: () => dispatch(fetchAsync()),

})

export default connect(mapStateToProps, mapDispatchToProps)(SortableComponent)

