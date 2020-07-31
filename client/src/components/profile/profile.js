import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import ProfileHeader from './profileHeader'
import ProfileCreds from './profileCreds'
import ProfileAbout from './profileAbout'
import ProfileGithub from './profileGithub'
import Spinner from '../common/spinner'
import {getProfileByhandle} from '../../actions/profileActions'

class Profile extends Component {

    componentDidMount(){
        if(this.props.match.params.handle){
            this.props.getProfileByhandle(this.props.match.params.handle)
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.profile.profile === null && this.props.profile.loading){
            this.props.history.push('/not-found')
        }
    }
 
    render() {

        const {profile, loading} = this.props.profile
        let profileContent

        if(profile === null || loading){
            profileContent = <Spinner/>
        }
        else{
            profileContent = (
                <div>
                    <div>
                        <div className="col-md-6">
                            <Link to="/profiles" className="btn btn-light mb-3 float-left">
                                Back to profiles
                            </Link>
                        </div>
                        <div className="col-md-6"></div>
                    </div> 
                    <ProfileHeader profile={profile}/>   
                    <ProfileAbout profile={profile}/>
                    <ProfileCreds education = {profile.education} experience = {profile.experience}/>  
                    {profile.githubUname ? (<ProfileGithub username={profile.githubUname}/>):null}              
                </div>
            )
        }

        return (
            <div className="profile">
                <div className = "container">
                    <div className="row">
                        <div className="col-md-12">
                            {profileContent}
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

Profile.propTypes = {
    getProfileByhandle: PropTypes.func.isRequired, 
    profile: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile
    }
}

export default connect(mapStateToProps,{getProfileByhandle})(Profile)
