import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import SelectListGroup from '../common/selectListGroup'
import InputGroup from '../common/inputGroup'
import TextFieldGroup from '../common/textFieldGroup'
import TextFieldAreaGroup from '../common/textAreaFieldGroup'
import { createProfile, getCurrentProfile } from '../../actions/profileActions'
import isEmpty from '../../validation/isEmpty'
import { Link,withRouter} from 'react-router-dom'

class EditProfile extends Component {

    constructor(props){
        super(props)
        this.state = {
            displaySocialInputs: false,
            handle: '',
            company: '',
            website: '',
            location:'',
            status:'',
            skills:'',
            githubUname:'',
            bio:'',
            twitter:'',
            facebook:'',
            linkedIn:'',
            youtube:'',
            errors:{}
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }


    componentDidMount(){
        this.props.getCurrentProfile()
    }


    componentWillReceiveProps(nextProps) {
        console.log(nextProps.profile.profile)
        if(nextProps.errors){
            this.setState({errors: nextProps.errors})
        }
        if(nextProps.profile.profile) {
            const profile = nextProps.profile.profile
            const skillsCSV = profile.skills.join(',')
            profile.company = !isEmpty(profile.company) ? profile.company : ''
            profile.website = !isEmpty(profile.website) ? profile.website : ''
            profile.location = !isEmpty(profile.location) ? profile.location : ''
            profile.githubUname = !isEmpty(profile.githubUname) ? profile.githubUname : ''
            profile.bio = !isEmpty(profile.bio) ? profile.bio : ''
            profile.social = !isEmpty(profile.social) ? profile.social : {}
            profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : ''
            profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : ''
            profile.linkedIn = !isEmpty(profile.social.linkedIn) ? profile.social.linkedIn : ''
            profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : ''
            
            this.setState({
                handle: profile.handle,
                company: profile.company,
                website: profile.website,
                location: profile.location,
                status: profile.status,
                skills: skillsCSV,
                githubUname: profile.githubUname,
                bio: profile.bio,
                twitter: profile.twitter,
                facebook: profile.facebook,
                youtube: profile.youtube,
                linkedIn: profile.linkedIn,
            })
        }
    }

    onSubmit = (e) => {
        e.preventDefault()
        const profileData = {
            handle: this.state.handle,
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            status: this.state.status,
            skills: this.state.skills,
            githubUname: this.state.githubUname,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            youtube: this.state.youtube,
            linkedIn: this.state.linkedIn,
        }

        this.props.createProfile(profileData, this.props.history)
    }

    onChange = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        const {errors , displaySocialInputs} = this.state
        let socialInputs

        if(displaySocialInputs){
            socialInputs = (
                <div>
                    <InputGroup
                        placeholder="Twitter profile URL"
                        name="twitter"
                        icon="fab fa-twitter"
                        value={this.state.twitter}
                        onChange={this.onChange}
                        error={errors.twitter}
                    />
                    <InputGroup
                        placeholder="Facebook profile URL"
                        name="facebook"
                        icon="fab fa-facebook"
                        value={this.state.facebook}
                        onChange={this.onChange}
                        error={errors.facebook}
                    />
                    <InputGroup
                        placeholder="linkedIn profile URL"
                        name="linkedIn"
                        icon="fab fa-linkedIn"
                        value={this.state.linkedIn}
                        onChange={this.onChange}
                        error={errors.linkedIn}
                    />
                    <InputGroup
                        placeholder="youtube profile URL"
                        name="youtube"
                        icon="fab fa-youtube"
                        value={this.state.youtube}
                        onChange={this.onChange}
                        error={errors.youtube}
                    />
                    
                </div>
            )
        }
        const options = [
            {label: '*select professional status', value: 0},
            {label: 'Junior Developer', value: 'Junior Developer'},
            {label: 'Developer', value: 'Developer'},
            {label: 'Senior Developer', value: 'Senior Developer'},
            {label: 'Student', value: 'Student'},
        ]
        return (
            <div className="create-Profile">
                <div className="container">
                    <div className = "row">
                        <div className="col-md-8 m-auto">
                            <Link to = "/dashboard" className="btn btn-light">
                                Go back
                            </Link>
                            <h1 className="display-4 text-center">Edit your Profile</h1>
                            <small className="d-block pb-3">fields marked with * are required</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="*Profile Handle"
                                    name="handle"
                                    value={this.state.handle}
                                    onChange={this.onChange}
                                    error={errors.handle}
                                    info="Fields required for profile creation"
                                />
                                <SelectListGroup
                                    placeholder="*Professional status"
                                    name="status" 
                                    value={this.state.status}
                                    onChange={this.onChange}
                                    options={options}
                                    error={errors.status}
                                    info="Please list your professional status"
                                /> 
                                <TextFieldGroup
                                    placeholder="Company name"
                                    name="company"
                                    value={this.state.company}
                                    onChange={this.onChange}
                                    error={errors.company}
                                    info="Please mention your company name"
                                /> 
                                <TextFieldGroup
                                    placeholder="website"
                                    name="website"
                                    value={this.state.website}
                                    onChange={this.onChange}
                                    error={errors.website}
                                    info="Please mention any website if you have created"
                                /> 
                                <TextFieldGroup
                                    placeholder="Location"
                                    name="location"
                                    value={this.state.location}
                                    onChange={this.onChange}
                                    error={errors.location}
                                    info="Mention city where you are current present"
                                />
                                <TextFieldGroup
                                    placeholder="skills"
                                    name="skills"
                                    value={this.state.skills}
                                    onChange={this.onChange}
                                    error={errors.skills}
                                    info="Please use comma seperated values"
                                />
                                <TextFieldGroup
                                    placeholder="Github Username"
                                    name="githubUname"
                                    value={this.state.githubUname}
                                    onChange={this.onChange}
                                    error={errors.githubUname}
                                    info="Please mention your github username"
                                />
                                <TextFieldAreaGroup
                                    placeholder="Short description abput yourself"
                                    name="bio"
                                    value={this.state.bio}
                                    onChange={this.onChange}
                                    error={errors.bio}
                                    info="Please tell us a little about yourself"
                                />
                                <div className="mb-3">
                                    <button type="button" onClick ={()=>{
                                        this.setState(prevState => ({
                                            displaySocialInputs: !prevState.displaySocialInputs
                                        }))
                                    }}className="btn btn-light">Add social network Links</button>
                                    <span className="text-muted">Optional</span>
                                </div>
                                {socialInputs}
                                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4"></input>

                            </form>
                        </div>
                    </div>

                </div>
                
            </div>
        )
    }
}

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
        errors: state.errors
    }
}

export default connect(mapStateToProps, {createProfile, getCurrentProfile})(withRouter(EditProfile))