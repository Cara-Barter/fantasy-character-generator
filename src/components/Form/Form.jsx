import { Component } from 'react';
import axios from 'axios';
import './Form.scss';
import Button from '../Button/Button';
import Characters from '../Characters/Characters';

class Form extends Component{
    state = {
        prompt: "",
        promptRequired: false,
        reply: "",
        list: []
    }

    componentDidMount() {
        document.title = "Fantasy Character Generator"
      }

    // create changehandler for input
    handleChange = (e) => {
        const eRequired = e.target.name + "Required";
        this.setState({
            [e.target.name]: e.target.value,
            [eRequired]: false,
        });
    };

    addItem = () => {
        this.setState(state => {
            const list = [...state.list, state.reply];

            return {
                list,
                reply: '',
            };
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
            .post(`${process.env.REACT_APP_API_URL}`, newPrompt, {
                headers: {
                   Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
                }
            }, 
            )
            .then((response) => {
                this.setState({
                    reply: response.data.choices[0].text
                })
            })
            .catch((error) => {
                console.log('post request error', error)
            })
        }
    }

    render(){
        return (
            <>
            <form className="form" onSubmit={this.handleSubmit}>
                <label htmlFor="input" className="form__label">
                    Enter Fantasy Race
                </label>
                <div className="form__wrapper">
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
                </div>
            </form>
            <Characters 
                input={this.state.prompt}
                reply={this.state.reply}
                list={this.state.list} />
            </>
        )
    }
}

export default Form;