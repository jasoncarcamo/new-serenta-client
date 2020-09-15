import React from "react";

const MapContext = React.createContext({
    lat: "",
    lng: "",
    zoom: "",
    enableGps: false,
    path: [],
    searchArea: ()=>{},
    setArea: ()=>{},
    setpath: ()=>{}
});

export default MapContext;

export class MapProvider extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            lat: 39.847075,
            lng: -96.587319,
            zoom: 2.5,
            path: [],
            enableGps: false
        }
    }

    componentDidMount(){
        if(window.innerWidth >= 1030){
            this.setState({
                zoom: 4
            })
        } else{
            this.setState({
                zoom: 2.5
            });
        }
    }

    searchArea = (lat, lng, zoom)=>{
        this.setArea(lat, lng, zoom);
    }

    setArea = (lat, lng, zoom)=>{
        this.setState({
            lat,
            lng,
            zoom
        });
    } 

    setPath = (paths)=>{
        let newPath = [];

        for(let i = 0; i < paths.length; i++){
            const path = {
                lat: "",
                lng: ""
            };

            path.lat = paths[i];
            path.lng = paths[i];

            newPath[i] = path;
        };

        this.setState({
            path: newPath
        });
    }

    render(){
        const value = {
            lat: this.state.lat,
            lng: this.state.lng,
            zoom: this.state.zoom,
            enableGps: this.state.enableGps,
            path: this.state.path,
            searchArea: this.searchArea,
            setArea: this.setArea,
            setPath: this.setPath
        };

        return (
            <MapContext.Provider value={value}>
                {this.props.children}
            </MapContext.Provider>
        )
    }
}