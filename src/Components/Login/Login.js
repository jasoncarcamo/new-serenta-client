import React from "react";

export default class Login extends React.Component{

    render(){

        return (
            <section>
                <form>
                    <fieldset>
                        <legend>
                            <h2>Log in to your account</h2>
                        </legend>

                        <label>
                            <input/>
                        </label>

                        <label>
                            <input/>
                        </label>

                        <button>Log In</button>
                    </fieldset>
                </form>
            </section>
        )
    }
}