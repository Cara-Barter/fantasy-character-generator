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
    };

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
            "prompt": "create a fantasy" + JSON.stringify(this.state.prompt) + "character",
            "max_tokens": 256,
            "temperature": 0.8,
            "top_p": 1,
            "n": 1,
        }

        if (this.isFormValid()) {
            axios
            .post('https://api.openai.com/v1/engines/text-curie-001/completions', newPrompt, {
                headers: {
                   Authorization: 'Bearer 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'
                }
            }, 
            )
            .then((response) => {
                console.log(response.data.choices[0].text);
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
            <form className="form" onSubmit={this.handleSubmit}>
                <label htmlFor="input" className="form__label">
                    Enter Fantasy Race
                </label>
                <input 
                    type="text" 
                    className={`form__input ${this.state.promptRequired ? "form__input--invalid" : ""}`}
                    name="prompt"
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