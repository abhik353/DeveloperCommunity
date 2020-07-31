import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom'
import TextFieldGroup from '../common/textFieldGroup'
import TextAreaFieldGroup from '../common/textAreaFieldGroup'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { addExperience } from '../../actions/profileActions'


class AddExperience extends Component {

    constructor(props){
        super(props)
        this.state = {
                company: '',
                title: '',
                location: '',
                from: '',
                till:'',
                current:false,
                description: '',
                errors: {},
                disabled: false
            }
        
            this.onChange = this.onChange.bind(this)
            this.onSubmit = this.onSubmit.bind(this)
            this.onCheck = this.onCheck.bind(this)
        
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors){
            this.setState({errors: nextProps.errors})
        }
    }


    onSubmit(e){
        e.preventDefault()
        const expData = {
            company: this.state.company,
            title: this.state.title,
            location: this.state.location,
            from : this.state.from,
            till: this.state.till,
            current: this.state.current,
            description: this.state.description
        }

        this.props.addExperience(expData, this.props.history)
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    onCheck(e){
        this.setState({
            disabled: !this.state.disabled,
            current: !this.state.disabled
        })
    }


    

    render() {

        const {errors} = this.state

        return (
            <div className="add-experience">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to = "/dashboard" className="btn btn-light">
                                Go back
                            </Link>
                            <h1 className="display-4 text-center">Add experience</h1>
                            <p className="lead text-center">Please add your past job experience</p>
                            <small clas="d-block pb-3">*Required field</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="*Company"
                                    name="company"
                                    value={this.state.company}
                                    onChange={this.onChange}
                                    error={errors.company}
                                />
                                <TextFieldGroup
                                    placeholder="*Job title"
                                    name="title"
                                    value={this.state.title}
                                    onChange={this.onChange}
                                    error={errors.title}
                                />
                                <TextFieldGroup
                                    placeholder="*location"
                                    name="location"
                                    value={this.state.location}
                                    onChange={this.onChange}
                                    error={errors.location}
                                />
                                <h6>From date</h6>
                                <TextFieldGroup
                                    placeholder="from"
                                    name="from"
                                    type="date"
                                    value={this.state.from}
                                    onChange={this.onChange}
                                    error={errors.from}
                                />
                                <h6>Till date</h6>
                                <TextFieldGroup
                                    placeholder="till"
                                    type="date"
                                    name="till"
                                    value={this.state.till}
                                    onChange={this.onChange}
                                    error={errors.till}
                                    disabled={this.state.disabled ? 'disabled' : ''}
                                />
                                <div className="form-check mb-4">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        name="current"
                                        value={this.state.current}
                                        checked={this.state.current}
                                        onChange={this.onCheck}
                                        id="current"
                                    />
                                    <label htmlFor="current" className="form-check-label">Current Job </label>
                                </div>
                                <TextAreaFieldGroup
                                    placeholder="Job description"
                                    name="description"
                                    value={this.state.description}
                                    onChange={this.onChange}
                                    error={errors.description}
                                    info="Please tell us a bit about your job"
                                />
                                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4"></input>
                            </form>
                        </div>

                    </div>
                </div>
                
            </div>
        )
    }
}

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
        errors: state.errors
    }
}


export default connect(mapStateToProps,{addExperience})(withRouter(AddExperience))
