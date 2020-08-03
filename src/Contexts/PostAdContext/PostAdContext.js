import React from "react";

const PostAdContext = React.createContext({
    ad: {},
    handleRadioInput: ()=>{},
    handleCheckboxInput: ()=>{}
});

export default PostAdContext;

export class PostAdProvider extends React.Component{
    constructor(props){
        super(props);
        this. state = {
            ad: {
                ac: "Not included",
                wifi: "Not included",
                cable: "Not included",
                pets: "No pets",
                parking: ["Not available"],
                washer: "Not included",
                dryer: "Not included"
            }
        };
    };

    handleRadioInput = (e)=>{
        const ad = this.state.ad;

        ad[e.target.name] = e.target.value;

        this.setState({
            ad
        });
    };

    handleCheckboxInput = (e)=>{
        const ad = this.state.ad;
        console.log(ad[e.target.name])
        let infoIndex = ad[e.target.name].indexOf(e.target.value);

        if(e.target.checked){
            if(infoIndex === -1){
                ad[e.target.name].push(e.target.value);
            }
        } else{
            if(infoIndex > -1){
                ad[e.target.name].splice(infoIndex, 1);
            }
        };

        this.setState({
            ad
        });

    }

    render(){
        const value = {
            ad: this.state.ad,
            handleRadioInput: this.handleRadioInput,
            handleCheckboxInput: this.handleCheckboxInput
        };
        console.log(value);
        return (
            <PostAdContext.Provider value={value}>
                {this.props.children}
            </PostAdContext.Provider>
        )
    }
} 