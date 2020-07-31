import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom'
import TextFieldGroup from '../common/textFieldGroup'
import TextAreaFieldGroup from '../common/textAreaFieldGroup'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { addEducation } from '../../actions/profileActions'

class AddEducation extends Component {

    constructor(props){
        super(props)
        this.state = {
                university: '',
                degree: '',
                specialization: '',
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
        const eduData = {
            university: this.state.university,
            degree: this.state.degree,
            specialization: this.state.specialization,
            from : this.state.from,
            till: this.state.till,
            current: this.state.current,
            description: this.state.description
        }

        this.props.addEducation(eduData, this.props.history)
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
            <div className="add-education">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to = "/dashboard" className="btn btn-light">
                                Go back
                            </Link>
                            <h1 className="display-4 text-center">Add Education</h1>
                            <p className="lead text-center">Please add your past university/school you have attended</p>
                            <small clas="d-block pb-3">*Required field</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="*university"
                                    name="university"
                                    value={this.state.university}
                                    onChange={this.onChange}
                                    error={errors.university}
                                />
                                <TextFieldGroup
                                    placeholder="*degree"
                                    name="degree"
                                    value={this.state.degree}
                                    onChange={this.onChange}
                                    error={errors.degree}
                                />
                                <TextFieldGroup
                                    placeholder="*specialization"
                                    name="specialization"
                                    value={this.state.specialization}
                                    onChange={this.onChange}
                                    error={errors.specialization}
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
                                    info="Please tell us a bit about your university study"
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

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
        errors: state.errors
    }
}


export default connect(mapStateToProps,{addEducation})(withRouter(AddEducation))
