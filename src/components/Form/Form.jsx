import { Component } from 'react';
import axios from 'axios';
import './Form.scss';
import Button from '../Button/Button';

class Form extends Component{
    state = {
        prompt: "",
        promptRequired: false
    }

    // create changehandler for input
    handleChange = (e) => {
        const eRequired = e.target.name + "Required";
        this.setState({
            [e.target.name]: e.target.value,
            [eRequired]: false,
        });
    }

    // check if prompt is filled
    isFormValid = () => {
        if(!this.state.prompt) {
            return false;
        }
        return true;
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.state.prompt) {
            this.setState({
                promptRequired: true
            })
        }
        
        const newPrompt = {
            prompt: this.state.prompt
        }

        if (this.state.isFormValid()) {
            axios
            .get(`${process.env.REACT_APP_API_URL}`, newPrompt)
            .then((response) => {
                console.log(response);
                this.setState({
                    reply: response.data
                })
                .catch((error) => {
                    console.log('post request error', error)
                })
            })
        }
   
    }

    render(){
        return (
            <form className="form">
                <label htmlFor="input" className="form__label">
                    Enter Fantasy Race
                </label>
                <input 
                    type="text" 
                    className={`form__input ${this.state.promptRequired ? "form__input--invalid" : ""}`}
                    name="input"
                    onChange={this.handleChange}
                    value={this.state.prompt} 
                />
                {this.state.promptRequired && (
                    <div className='form__error-container'>
                        <p className='form__error-text'>
                            This field is required
                        </p>
                    </div>
                )}
                <Button 
                    className="form__btn"
                    type="submit"
                    text="Submit"
                />
            </form>
        )
    }
}

export default Form;